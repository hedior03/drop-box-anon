import { z } from "zod";

const envVarSchema = z.object({
  JWT_SECRET_KEY: z.string().trim().min(1),
});

const env = import.meta.env ?? {};

const parsedEnv = envVarSchema.safeParse(env);

if (!parsedEnv.success) {
  console.error("❌ Invalid environment variables:", parsedEnv.error.format());
  throw new Error("Invalid environment variables");
}

export default parsedEnv.data;
