"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

export default defineConfig({
  // Studio
  name: "bappa-ayurveda",
  title: "Bappa Ayurveda CMS",
  basePath: "/studio",

  // Project
  projectId,
  dataset,

  // Schema
  schema,

  // Plugins
  plugins: [
    structureTool({ structure }),

    ...(process.env.NODE_ENV === "development"
      ? [visionTool({ defaultApiVersion: apiVersion })]
      : []),
  ],
});
