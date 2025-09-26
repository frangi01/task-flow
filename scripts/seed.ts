// scripts/seed.ts
import "dotenv/config";
import { generateAdminCredentials } from "./generateAdmin";

async function main() {
  await generateAdminCredentials();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
