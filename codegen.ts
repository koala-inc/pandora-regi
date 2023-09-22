import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "./types/schema.graphql",
  documents: "./**/*.{js,ts,jsx,tsx}",
  generates: {
    "./types/autogen/gplType.ts": {
      preset: "client",
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-query",
      ],
      config: {
        fetcher: fetch,
      },
    },
  },
};

export default config;
