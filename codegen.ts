import type { CodegenConfig } from "@graphql-codegen/cli";
import "dotenv/config";

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_SERVER_URL,
  documents: ["./graphql/**/*.graphql"],
  generates: {
    "./graphql/generated/output.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
    },
    "./graphql/schema.graphql": {
      plugins: ["schema-ast"],
    },
  },
  ignoreNoDocuments: true,
};

export default config;
