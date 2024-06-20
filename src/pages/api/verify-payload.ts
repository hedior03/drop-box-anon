import type { APIRoute } from "astro";
import { jwtVerify } from "jose";
import environmentVars from "../../environmentVars";

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return new Response(JSON.stringify({ error: "Token is missing" }), {
      status: 400,
    });
  }

  const encodedSecret = new TextEncoder().encode(
    environmentVars.JWT_SECRET_KEY
  );

  try {
    const { payload } = await jwtVerify(token, encodedSecret);
    console.log(payload);

    return new Response(JSON.stringify({ payload }), { status: 200 });
  } catch (error: any) {
    console.error(error.message);
    return new Response(JSON.stringify({ error: "Invalid token" }), {
      status: 401,
    });
  }
};
