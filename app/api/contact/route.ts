import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Please fill in all fields." },
        { status: 400 }
      );
    }

    // Yeh line asal mein aapke inbox par email dispatch karegi
    const data = await resend.emails.send({
      from: "TokenCost AI <onboarding@resend.dev>",
      to: process.env.RECEIVER_EMAIL || "chaudhrysami004@gmail.com",
      subject: `New Inquiry from ${name} (TokenCost AI)`,
      replyTo: email,
      text: `Sender Name: ${name}\nSender Email: ${email}\n\nMessage:\n${message}`,
    });

    if (data.error) {
      console.error("Resend API Error:", data.error);
      return NextResponse.json({ error: "Failed to dispatch email." }, { status: 500 });
    }

    return NextResponse.json(
      { success: true, message: "Your message has been sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email dispatch failed:", error);
    return NextResponse.json(
      { error: "Failed to dispatch email." },
      { status: 500 }
    );
  }
}