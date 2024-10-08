import OpenAI from "openai";
import { convertCommandToYAML, writeYAMLToFile } from "./yamlgen.js";
import * as dotenv from "dotenv";
import { exec } from "child_process";
import ora from 'ora';
import { constructBasePrompt } from "./basePrompt.js";
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

const spinner = ora({
  spinner: {
    interval: 120,
    frames: ['▹▹▹▹▹', '▸▹▹▹▹', '▹▸▹▹▹', '▹▹▸▹▹', '▹▹▹▸▹', '▹▹▹▹▸'],
  },
  text: "Installation in progress...",
});

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

export function runStencilSpec(): Promise<void> {
  return new Promise((resolve, reject) => {
    spinner.start();
    const specPath = "spec.yaml";
    exec(`stencil spec ${specPath}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing stencil spec command: ${error.message}`);
        spinner.fail('Stencil spec execution failed');
        reject(error);
        return;
      }
      spinner.succeed('Stencil Project Generation Completed\n');
      resolve();
    });
  });
}
