import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

const resend = new Resend(import.meta.env.RESEND_API_KEY);

const TO_EMAIL = "iam.ramli00@gmail.com";
const FROM_EMAIL = "Sivarya Website <onboarding@resend.dev>"; // ganti pas domain udah verified

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, email, company, service, brief } = body;

    if (!name || !email || !company || !service || !brief) {
      return new Response(
        JSON.stringify({ error: "Semua field wajib diisi." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `Brief Proyek Baru dari ${name} (${company})`,
      html: `
        <h2>Brief Proyek Baru</h2>
        <p><strong>Nama:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Perusahaan:</strong> ${company}</p>
        <p><strong>Minat Layanan:</strong> ${service}</p>
        <p><strong>Brief:</strong></p>
        <p>${brief.replace(/\n/g, "<br/>")}</p>
      `,
    });

    if (error) {
      console.error(error);
      return new Response(
        JSON.stringify({ error: "Gagal mengirim email." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({ error: "Terjadi kesalahan server." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};