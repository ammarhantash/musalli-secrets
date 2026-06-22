import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

// POST /api/contact — stores a waitlist signup in MongoDB Atlas.
// This is the minimal "live" piece that proves the DB connection works.
export async function POST(req: NextRequest) {
  try {
    const { name, email, city } = await req.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: "name and email are required." },
        { status: 400 }
      );
    }

    const db = await getDb();
    await db.collection("waitlist").insertOne({
      name,
      email,
      city: city ?? null,
      createdAt: new Date(),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("waitlist api error:", err);
    return NextResponse.json(
      { error: "Could not add you to the waitlist. Please try again." },
      { status: 500 }
    );
  }
}
