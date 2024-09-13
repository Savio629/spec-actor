# Spec generator
This is a custom CLI tool that generates and executes stencil commands based on user prompt, creates YAML configuration files, and runs the generated stencil spec.

Table of Contents
- Installation
- Linking the @samagra-x/stencil-cli Package
- Running the CLI
- Examples

### Installation
1. Clone this repository to your local machine.

    `git clone <repository-url> cd <repository-folder>`

2. Install the required dependencies using your package manager (e.g., npm or pnpm).

    `npm install`

Usage
The CLI generates project initialization commands for the `stencil` framework based on user prompts, then writes the configuration into a `spec.yaml` file, and finally runs the `stencil spec` command.

The tool supports the following options:

- Prisma (--prisma)
- User Service (--user-service)
- Monitoring (--monitoring)
- Monitoring Service (--monitoringService)
- Temporal (--temporal)
- Logging (--logging)
- File Upload (--fileUpload)
- Package Manager (--package-manager: npm, pnpm, yarn or bun)

### Linking the @samagra-x/stencil-cli Package

Before using the CLI, you need to link the `@samagra-x/stencil-cli` package to your global node_modules to ensure the tool can call the stencil command.

1. Navigate to the @samagra-x/stencil-cli package folder. https://github.com/SamagraX-Stencil/stencil-cli/pull/31

        cd path/to/@samagra-x/stencil-cli

2. Run the following command to link the package globally.

        npm link

This will allow the `stencil` command to be used globally in your terminal.

3. Navigate back to the root of this project.

        cd path/to/this-project

### Running the CLI

To run the CLI, first build the project:

    npm run build

Then, execute the CLI with a user prompt:

    node dist/index.js "<your-prompt-here>"

### For example:

    node dist/index.js "Set up a project named AllInOneService with Prisma, user service, monitoring, monitoring services, temporal, logging, and file upload setup with pnpm as the package installer"

This will:

Generate a corresponding stencil command.

Write a spec.yaml file with the relevant project configuration.

Run the stencil spec command using the generated spec.yaml.
