import * as yaml from 'js-yaml';

export const testCases = [
  {
    prompt: "Set up a project named BlogApp with npm and Prisma support",
    expectedYaml: {
      stencil: "0.0.5",
      info: {
        properties: {
          'project-name': "BlogApp",
          'package-manager': "npm"
        }
      },
      tooling: ['prisma'],
      endpoints: null as any
    }
  },
  {
    prompt: "Set up a project named ShopApp with pnpm and Temporal support",
    expectedYaml: {
      stencil: "0.0.5",
      info: {
        properties: {
          'project-name': "ShopApp",
          'package-manager': "pnpm"
        }
      },
      tooling: ['temporal'],
      endpoints: null
    }
  },
  {
    prompt: "Set up a project named BlogApp with yarn and user-service enabled",
    expectedYaml: {
      stencil: "0.0.5",
      info: {
        properties: {
          'project-name': "BlogApp",
          'package-manager': "yarn"
        }
      },
      tooling: ['user-service'],
      endpoints: null
    }
  },
  {
    prompt: "Set up a project named TaskManager with bun and file upload support",
    expectedYaml: {
      stencil: "0.0.5",
      info: {
        properties: {
          'project-name': "TaskManager",
          'package-manager': "bun"
        }
      },
      tooling: ['file-upload'],
      endpoints: null
    }
  },
  {
    prompt: "Set up a project named SocialApp with prisma, Temporal, file upload, user service, and using installer pnpm",
    expectedYaml: {
      stencil: "0.0.5",
      info: {
        properties: {
          'project-name': "SocialApp",
          'package-manager': "pnpm"
        }
      },
      tooling: ['prisma', 'temporal', 'file-upload', 'user-service'],
      endpoints: null
    }
  },
  {
    prompt: "Set up a project named FinanceApp with npm and monitoring services",
    expectedYaml: {
      stencil: "0.0.5",
      info: {
        properties: {
          'project-name': "FinanceApp",
          'package-manager': "npm"
        }
      },
      tooling: ['monitoring'],
      endpoints: null
    }
  },
  {
    prompt: "Set up a project named WeatherApp with yarn",
    expectedYaml: {
      stencil: "0.0.5",
      info: {
        properties: {
          'project-name': "WeatherApp",
          'package-manager': "yarn"
        }
      },
      tooling: [],
      endpoints: null
    }
  },
  {
    prompt: "Set up a project named MediaApp with bun and user service",
    expectedYaml: {
      stencil: "0.0.5",
      info: {
        properties: {
          'project-name': "MediaApp",
          'package-manager': "bun"
        }
      },
      tooling: ['user-service'],
      endpoints: null
    }
  },

  {
    prompt: "Create a project called EcoApp using npm with support for file upload and monitoring",
    expectedYaml: {
      stencil: "0.0.5",
      info: {
        properties: {
          'project-name': "EcoApp",
          'package-manager': "npm"
        }
      },
      tooling: ['file-upload', 'monitoring'],
      endpoints: null
    }
  },
  {
    prompt: "Initialize a project named DataAnalyzer with pnpm and Prisma, with no additional tooling",
    expectedYaml: {
      stencil: "0.0.5",
      info: {
        properties: {
          'project-name': "DataAnalyzer",
          'package-manager': "pnpm"
        }
      },
      tooling: ['prisma'],
      endpoints: null
    }
  },
  {
    prompt: "Start a new project called ChatApp with yarn, and include Temporal and user-service",
    expectedYaml: {
      stencil: "0.0.5",
      info: {
        properties: {
          'project-name': "ChatApp",
          'package-manager': "yarn"
        }
      },
      tooling: ['temporal', 'user-service'],
      endpoints: null
    }
  },
  {
    prompt: "Setup a project named TaskManagerPro using bun with Prisma and file upload",
    expectedYaml: {
      stencil: "0.0.5",
      info: {
        properties: {
          'project-name': "TaskManagerPro",
          'package-manager': "bun"
        }
      },
      tooling: ['prisma', 'file-upload'],
      endpoints: null
    }
  },
  {
    prompt: "Configure a project named ServiceHub with pnpm and include file upload and monitoring services",
    expectedYaml: {
      stencil: "0.0.5",
      info: {
        properties: {
          'project-name': "ServiceHub",
          'package-manager': "pnpm"
        }
      },
      tooling: ['file-upload', 'monitoring'],
      endpoints: null
    }
  },
  {
    prompt: "Create a project named ReportGenerator with npm and enable Prisma and monitoring",
    expectedYaml: {
      stencil: "0.0.5",
      info: {
        properties: {
          'project-name': "ReportGenerator",
          'package-manager': "npm"
        }
      },
      tooling: ['prisma', 'monitoring'],
      endpoints: null
    }
  },
  {
    prompt: "Initialize a new project called EventLogger using yarn with Temporal support",
    expectedYaml: {
      stencil: "0.0.5",
      info: {
        properties: {
          'project-name': "EventLogger",
          'package-manager': "yarn"
        }
      },
      tooling: ['temporal'],
      endpoints: null
    }
  },
  {
    prompt: "Set up a project named AuthService with bun and user-service enabled",
    expectedYaml: {
      stencil: "0.0.5",
      info: {
        properties: {
          'project-name': "AuthService",
          'package-manager': "bun"
        }
      },
      tooling: ['user-service'],
      endpoints: null
    }
  },
  {
    prompt: "Create a project named NotificationSystem with npm, using Prisma and file upload",
    expectedYaml: {
      stencil: "0.0.5",
      info: {
        properties: {
          'project-name': "NotificationSystem",
          'package-manager': "npm"
        }
      },
      tooling: ['prisma', 'file-upload'],
      endpoints: null
    }
  },
  {
    prompt: "Setup a new project named ContentManager with pnpm and support for user-service and monitoring",
    expectedYaml: {
      stencil: "0.0.5",
      info: {
        properties: {
          'project-name': "ContentManager",
          'package-manager': "pnpm"
        }
      },
      tooling: ['user-service', 'monitoring'],
      endpoints: null
    }
  },
  {
    prompt: "Start a project named PaymentGateway with yarn, including Temporal and Prisma",
    expectedYaml: {
      stencil: "0.0.5",
      info: {
        properties: {
          'project-name': "PaymentGateway",
          'package-manager': "yarn"
        }
      },
      tooling: ['temporal', 'prisma'],
      endpoints: null
    }
  },
  {
    prompt: "Set up a project called CustomerSupport with bun and Prisma support",
    expectedYaml: {
      stencil: "0.0.5",
      info: {
        properties: {
          'project-name': "CustomerSupport",
          'package-manager': "bun"
        }
      },
      tooling: ['prisma'],
      endpoints: null
    }
  },
  {
    prompt: "Create a project named SalesDashboard with npm, using file upload and monitoring",
    expectedYaml: {
      stencil: "0.0.5",
      info: {
        properties: {
          'project-name': "SalesDashboard",
          'package-manager': "npm"
        }
      },
      tooling: ['file-upload', 'monitoring'],
      endpoints: null
    }
  },
  {
    prompt: "Initialize a project called AnalyticsTool with pnpm, including Prisma and Temporal",
    expectedYaml: {
      stencil: "0.0.5",
      info: {
        properties: {
          'project-name': "AnalyticsTool",
          'package-manager': "pnpm"
        }
      },
      tooling: ['prisma', 'temporal'],
      endpoints: null
    }
  },
  {
    prompt: "Set up a project named UserManager with yarn and enable user-service",
    expectedYaml: {
      stencil: "0.0.5",
      info: {
        properties: {
          'project-name': "UserManager",
          'package-manager': "yarn"
        }
      },
      tooling: ['user-service'],
      endpoints: null
    }
  },
  {
    prompt: "Create a project named InventoryApp with bun and support for file upload and Prisma",
    expectedYaml: {
      stencil: "0.0.5",
      info: {
        properties: {
          'project-name': "InventoryApp",
          'package-manager': "bun"
        }
      },
      tooling: ['file-upload', 'prisma'],
      endpoints: null
    }
  },
  {
    prompt: "Setup a project called FleetManagement with npm and include Temporal and monitoring",
    expectedYaml: {
      stencil: "0.0.5",
      info: {
        properties: {
          'project-name': "FleetManagement",
          'package-manager': "npm"
        }
      },
      tooling: ['temporal', 'monitoring'],
      endpoints: null
    }
  },
  {
    prompt: "Create a project named FeedbackSystem with pnpm, including Prisma and user-service",
    expectedYaml: {
      stencil: "0.0.5",
      info: {
        properties: {
          'project-name': "FeedbackSystem",
          'package-manager': "pnpm"
        }
      },
      tooling: ['prisma', 'user-service'],
      endpoints: null
    }
  },
  {
    prompt: "Initialize a project called TaskAutomation with yarn and enable file upload support",
    expectedYaml: {
      stencil: "0.0.5",
      info: {
        properties: {
          'project-name': "TaskAutomation",
          'package-manager': "yarn"
        }
      },
      tooling: ['file-upload'],
      endpoints: null
    }
  },
  {
    prompt: "Set up a new project named RealTimeChat with bun, including Temporal and file upload",
    expectedYaml: {
      stencil: "0.0.5",
      info: {
        properties: {
          'project-name': "RealTimeChat",
          'package-manager': "bun"
        }
      },
      tooling: ['temporal', 'file-upload'],
      endpoints: null
    }
  },
  {
    prompt: "Create a project named MarketingDashboard with npm and Prisma support",
    expectedYaml: {
      stencil: "0.0.5",
      info: {
        properties: {
          'project-name': "MarketingDashboard",
          'package-manager': "npm"
        }
      },
      tooling: ['prisma'],
      endpoints: null
    }
  },
  {
    prompt: "Set up a project called ServicePortal with pnpm, including user-service and monitoring",
    expectedYaml: {
      stencil: "0.0.5",
      info: {
        properties: {
          'project-name': "ServicePortal",
          'package-manager': "pnpm"
        }
      },
      tooling: ['user-service', 'monitoring'],
      endpoints: null
    }
  },
  {
    prompt: "Initialize a project named LogisticsApp with yarn, including Temporal and Prisma",
    expectedYaml: {
      stencil: "0.0.5",
      info: {
        properties: {
          'project-name': "LogisticsApp",
          'package-manager': "yarn"
        }
      },
      tooling: ['temporal', 'prisma'],
      endpoints: null
    }
  }
];
