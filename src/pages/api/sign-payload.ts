import type { APIRoute } from "astro";
import environmentVars from "../../environmentVars";
import { SignJWT } from "jose";

export const POST: APIRoute = async ({ request }) => {
  const { payload, lifespan } = (await request.json()) as any;

  const encodedSecret = new TextEncoder().encode(
    environmentVars.JWT_SECRET_KEY
  );

  const token = await new SignJWT(payload)
    .setIssuedAt()
    .setExpirationTime(lifespan ?? "1h")
    .setProtectedHeader({ alg: "HS256" })
    .sign(encodedSecret);

  return new Response(JSON.stringify({ token }));
};
