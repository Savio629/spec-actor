#! /usr/bin/env node

import { Command } from "commander";
import { getLLMResponse, runStencilSpec } from "../src/index.js";
import { writeYAMLToFile } from "../src/yamlgen.js";
import * as ora from 'ora';

const program = new Command();

program
  .version('0.1.0')
  .description('CLI to generate stencil YAML configuration and run stencil spec from a prompt')
  .argument('<prompt>', 'User prompt for project generation')
  .action(async (prompt: string) => {
    const promptInput = { inputs: prompt };
    
    const result = await getLLMResponse(promptInput);
    
    console.info(`Generated Spec Configuration:\n${result.response}`);
    
    writeYAMLToFile(result.response, "spec.yaml");
    runStencilSpec();

  });

program.parse(process.argv);
