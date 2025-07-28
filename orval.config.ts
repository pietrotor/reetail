import dotenv from "dotenv";
import { defineConfig } from "orval";

dotenv.config({
  path: ".env",
  override: true,
  processEnv: process.env as any,
});

const baseURL = process.env.VITE_BACKEND_URL || "http://localhost:8000";

const fullURLInput = new URL("/api/v1/openapi.json", baseURL).toString();

export default defineConfig({
  client: {
    input: fullURLInput,
    output: {
      client: "react-query",
      mode: "tags-split",
      workspace: "src/api",
      target: "./generated/api",
      schemas: "./generated/model",
      mock: false,
      prettier: true,
      urlEncodeParameters: true,
      headers: true,
      override: {
        query: {
          signal: true,
          useQuery: true,
          useMutation: true,
          useSuspenseQuery: true,
        },
        mutator: {
          path: "./mutator/custom-fetch.ts",
          name: "customFetch",
        },
      },
    },
    // hooks: {
    //   afterAllFilesWrite: "prettier --write .",
    // },
  },
});
