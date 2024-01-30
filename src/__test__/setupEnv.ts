import { loadEnvConfig } from "@next/env";

export default async function setupEnv() {
  loadEnvConfig(process.env.PWD || process.cwd());
}
