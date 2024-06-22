import type { APIRoute } from "astro";
import { getPutUrl } from "../../storage/get-put-url";

export const GET: APIRoute = async ({ request }) => {
  try {
    const key = await getPutUrl("something.png");
    console.log(key);
    return new Response(JSON.stringify({ presignedUrl: key }));
  } catch (e) {
    console.log(e);
  }
  return new Response("Hello World");
};
