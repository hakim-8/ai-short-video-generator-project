import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials: {
    url: "postgresql://accounts:vBepGtZ1qU5z@ep-solitary-pond-a5hhorh0-pooler.us-east-2.aws.neon.tech/ai-short-video-generator?sslmode=require",
  },
  out: "./drizzle",
});
