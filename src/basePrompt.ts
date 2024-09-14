interface PromptInput {
    inputs: string;
  }
  
export function constructBasePrompt(promptInput: PromptInput): string {
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
    docker: [<docker>]
    endpoints:
  
    - Replace <ProjectName> with the name of the project extracted directly from the input.
    - Replace <package-manager> with the specified package manager (npm, pnpm, yarn, bun).
    - The tooling list should be in the following format: [prisma, temporal, file-upload, user-service, monitoring].
    - The tooling list and docker list should be in lowercase.
    - The docker list should be in the following format: [logging, monitoring, postgres, hasura, minio, fusionauth].
    - Don't get confuse between monitoring of tooling and docker. They are different.
    - Use "no" for any feature or service that is not requested and "yes" for those that are.
    - If no tooling is mentioned skip the tooling section same for docker.

    Example:
    - For "Set up a project named SocialApp with tooling such as prisma, temporal, file upload, user service, monitoring and docker service such as logging, monitoring, postgres, hasura, minio, fusionauth using installer pnpm", respond with:
      stencil: 0.0.5
      info:
        properties:
          project-name: "SocialApp"
          package-manager: "pnpm"
      tooling: [prisma, temporal, file-upload, user-service, monitoring]
      docker: [logging, monitoring, postgres, hasura, minio, fusionauth]
      endpoints:
    `;
  }
  