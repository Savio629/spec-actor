import * as fs from "fs";
import * as path from "path";

function getDependencyVersion(dependencyName: string): string {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

  const version = packageJson.dependencies?.[dependencyName];

  return version ? version.replace("^", "") : "version not found";
}

export function convertCommandToYAML(stencilCommand: string): string {
  const projectNameMatch = stencilCommand.match(/stencil new (\w+)/);
  const projectName = projectNameMatch ? projectNameMatch[1] : "UnknownProject";

  const packageManagerMatch = stencilCommand.match(/--package-manager (\w+)/);
  const packageManager = packageManagerMatch ? packageManagerMatch[1] : "npm";

  const tooling: string[] = [];
  const options = ["prisma","user-service", "monitoring", "temporal", "fileUpload"];
  options.forEach(option => {
    if (stencilCommand.includes(`--${option} yes`)) {
      tooling.push(option);
    }
  });
  
  const stencilVersion = getDependencyVersion("@samagra-x/stencil-cli");

  const yamlContent = `
stencil: ${stencilVersion}

info:
  properties:
    project-name: "${projectName}"
    package-manager: "${packageManager}"
    
tooling: [${tooling.join(", ")}]

endpoints:
  `;

  return yamlContent.trim();
}

export function writeYAMLToFile(yamlContent: string, fileName: string) {
  const filePath = path.join(process.cwd(), fileName);
  fs.writeFileSync(filePath, yamlContent, "utf-8");
  console.log(`Specification file written to ${filePath}`);
}
