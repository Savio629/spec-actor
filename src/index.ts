import OpenAI from "openai";
import { convertCommandToYAML, writeYAMLToFile } from "./yamlgen.js";
import dotenv from "dotenv";
import { exec } from "child_process";
import { Command } from "commander";
import path from "path";

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
  You are a software assistant that generates project initialization commands based on the user's input.

  Given the input statement:
  "${promptInput.inputs}"

  Respond with a command that initializes a project using the "stencil" CLI. The command should follow this format:

  "stencil new <ProjectName> --prisma <yes/no> --user-service <yes/no> --monitoring <yes/no> --monitoringService <yes/no> --temporal <yes/no> --logging <yes/no> --fileUpload <yes/no> --package-manager <npm/pnpm/yarn>"

  Analyze the input carefully and use the appropriate options based on the user request. Respond only with the command in the format provided without any additional explanation.
  `;
}

async function getLLMResponse(promptInput: PromptInput): Promise<PromptResponse> {
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
      max_tokens: 150,
      temperature: 0,
    });

    const command = response.choices[0]?.message?.content?.trim();

    return {
      response: command || "No response generated",
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
    if (stderr) {
      console.error(`Stencil spec stderr: ${stderr}`);
      return;
    }
    console.log(`Stencil spec output:\n${stdout}`);
  });
}

const program = new Command();
program
  .version('0.1.0')
  .description('CLI to generate stencil commands and run stencil spec from a prompt')
  .argument('<prompt>', 'User prompt for project generation')
  .action(async (prompt: any) => {
    const promptInput: PromptInput = { inputs: prompt };
    
    const result = await getLLMResponse(promptInput);
    
    console.log(`Generated Stencil Command: ${result.response}`);
    
    const yamlContent = convertCommandToYAML(result.response);
    writeYAMLToFile(yamlContent, "spec.yaml");
    
    runStencilSpec();
  });

program.parse(process.argv);
