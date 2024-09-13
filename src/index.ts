import OpenAI from "openai";
import { convertCommandToYAML, writeYAMLToFile } from "./yamlgen.js";
import * as dotenv from "dotenv";
import { exec } from "child_process";
import { Command } from "commander";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface PromptInput {
  inputs: string;
}

interface PromptResponse {
  response: string;
}

function constructBasePrompt(promptInput: PromptInput): string {
  return `
  You are a software assistant that generates project initialization configurations in YAML format based on the user's input.

  Given the input statement:
  "${promptInput.inputs}"

  Respond with a YAML configuration for initializing a project using the "stencil" CLI. The YAML configuration should follow this format:

  stencil: 0.0.5

  info:
    properties:
      project-name: "<ProjectName>"
      package-manager: "<package-manager>"
      
  tooling: [<tooling>]

  endpoints:

  - Replace <ProjectName> with the name of the project extracted directly from the input.
  - Replace <package-manager> with the specified package manager (npm, pnpm, yarn, bun).
  - The tooling list should be in the following format: [prisma, temporal, file-upload, user-service, monitoring].
  - The tooling list should be in lowercase.
  - Use "no" for any feature or service that is not requested and "yes" for those that are.
  - Generate a list for tooling based on requested services like prisma, user-service, file-upload, etc.

  Examples:
  - For "Set up a project named SocialApp with prisma, temporal, file upload, user service, monitoring  using installer pnpm", respond with:
    stencil: 0.0.5
    info:
      properties:
        project-name: "SocialApp"
        package-manager: "pnpm"
    tooling: [prisma, temporal, fileUpload, user-service, monitoring]
    endpoints:

  - For "Make a project named MediaApp with bun and monitoring and user service", respond with:
    stencil: 0.0.5
    info:
      properties:
        project-name: "MediaApp"
        package-manager: "bun"
    tooling: [monitoring, user-service]
    endpoints:

    - For "Generate a project named TempApp with pnpm as installer", respond with:
    stencil: 0.0.5
    info:
      properties:
        project-name: "TempApp"
        package-manager: "pnpm"
    tooling: []
    endpoints:
    
    - For "Initialize a project named StorageApp with yarn and File upload, with no additional tooling", respond with:
    stencil: 0.0.5
    info:
      properties:
        project-name: "StorageApp"
        package-manager: "yarn"
    tooling: [file-upload]
    endpoints:

    - For "Generate a project called AppGen with yarn as package manager and services like file upload and prisma", respond with:
    stencil: 0.0.5
    info:
      properties:
        project-name: "AppGen"
        package-manager: "yarn"
    tooling: [file-upload, prisma]
    endpoints:


  `;
}





export async function getLLMResponse(promptInput: PromptInput): Promise<PromptResponse> {
  const basePrompt = constructBasePrompt(promptInput);

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: basePrompt,
        },
      ],
      max_tokens: 300,
      temperature: 0,
    });

    let yamlContent = response.choices[0]?.message?.content?.trim() || "No response generated";
    yamlContent = yamlContent.replace(/^```yaml\s*/i, '').replace(/\s*```$/i, '');

    return {
      response: yamlContent,
    };
  } catch (error) {
    console.error("Error fetching response from Model:", error);
    return {
      response: "Error fetching response",
    };
  }
}

function runStencilSpec() {
  const specPath = ("spec.yaml");
  exec(`stencil spec ${specPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing stencil spec command: ${error.message}`);
      return;
    }
    console.log(`Stencil spec output:\n${stdout}`);
  });
}

const program = new Command();
program
  .version('0.1.0')
  .description('CLI to generate stencil YAML configuration and run stencil spec from a prompt')
  .argument('<prompt>', 'User prompt for project generation')
  .action(async (prompt: any) => {
    const promptInput: PromptInput = { inputs: prompt };
    
    const result = await getLLMResponse(promptInput);
    
    console.log(`Generated YAML Configuration:\n${result.response}`);
    
    writeYAMLToFile(result.response, "spec.yaml");
    
    // runStencilSpec();
  });

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  
  if (process.argv[1] === __filename) {
    program.parse(process.argv);
  }
  
