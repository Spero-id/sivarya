import type { APIRoute } from "astro";
import { getRecentActivities } from "../../db/queries";

const JSON_HEADERS = { "Content-Type": "application/json" };

export const GET: APIRoute = async () => {
  try {
    const activities = await getRecentActivities(8);
    return new Response(JSON.stringify({ activities }), {
      status: 200,
      headers: JSON_HEADERS,
    });
  } catch (e: any) {
    console.error(e);
    return new Response(
      JSON.stringify({ error: e?.message ?? "Terjadi kesalahan." }),
      { status: 500, headers: JSON_HEADERS }
    );
  }
};
