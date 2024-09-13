// index.js
import * as yaml from 'js-yaml';
import { getLLMResponse } from './index.js';
import { testCases } from './tc.js';

async function runTests() {
  let correct = 0;

  for (const testCase of testCases) {
    const { prompt, expectedYaml } = testCase;

    // Generate YAML using your CLI tool
    const result = await getLLMResponse({ inputs: prompt });
    // Replace quotes around the YAML string and parse
    const generatedYaml = yaml.load(result.response.replace(/^"|"$/g, ''));

    if (JSON.stringify(generatedYaml) === JSON.stringify(expectedYaml)) {
      correct++;
    } else {
      console.error(`Failed for prompt: "${prompt}"`);
      console.error(`Expected: ${yaml.dump(expectedYaml)}`);
      console.error(`Received: ${yaml.dump(generatedYaml)}`);
    }
  }

  const accuracy = (correct / testCases.length) * 100;
  console.log(`Accuracy: ${accuracy}%`);
}

runTests();
