import { z } from "zod";

const envVarSchema = z.object({
  R2_BUCKET_URL: z.string().trim().min(1),
  BUCKET_NAME: z.string().trim().min(1),
  AWS_ACCESS_KEY_ID: z.string().trim().min(1),
  AWS_SECRET_ACCESS_KEY: z.string().trim().min(1),
  AWS_SESSION_TOKEN: z.string().trim().min(1),
  ACCOUNT_ID: z.string().trim().min(1),
  JWT_SECRET_KEY: z.string().trim().min(1),
});

const env = import.meta.env ?? {};

const parsedEnv = envVarSchema.safeParse(env);

if (!parsedEnv.success) {
  console.error("❌ Invalid environment variables:", parsedEnv.error.format());
  throw new Error("Invalid environment variables");
}

export default parsedEnv.data;
