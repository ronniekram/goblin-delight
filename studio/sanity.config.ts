import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { media } from "sanity-plugin-media";
import { codeInput } from "@sanity/code-input";

import schemas from "./schemas";
import { singletons, singletonActions, deskConfig, defaultDocumentNode } from "./lib/desk";

export default defineConfig({
  title: `Goblin Delight`,
  projectId: `atx0gy8j`,
  dataset: `production`,
  plugins: [
    structureTool({
      structure: (S, context) => deskConfig(S, context),
      defaultDocumentNode,
    }),
    visionTool(),
    media(),
    codeInput(),
  ],
  schema: {
    types: schemas,
    /** Defines which document types are available in the toolbar New Document menu  */
    templates: (templates) => templates.filter(({ schemaType }) => !singletons.has(schemaType)),
  },
  document: {
    actions: (input, context) => singletons.has(context.schemaType) ? input.filter(({ action }) => action && singletonActions.has(action)) : input,
  },
});
