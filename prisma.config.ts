import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // migrate সবসময় direct connection ব্যবহার করে,
    // তাই এখানে DIRECT_URL দিচ্ছি (pooled URL নয়)
    url: env("DIRECT_URL"),
  },
});