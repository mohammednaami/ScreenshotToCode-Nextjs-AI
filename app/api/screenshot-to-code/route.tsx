import { db } from "@/configs/db";
import { screenshotTable } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { description, imageUrl, model, uid, email } = await req.json();

  const result = await db
    .insert(screenshotTable)
    .values({
      model: model,
      description: description,
      imageUrl: imageUrl,
      uid: uid,
      createdBy: email,
    })
    .returning({ id: screenshotTable.id });

  return NextResponse.json({ result: result });
}

export async function GET(req: NextRequest) {
  const reqUrl = req.url;

  const { searchParams } = new URL(reqUrl);
  const uid = searchParams?.get("uid");
  if (uid) {
    const screenshot = await db
      .select()
      .from(screenshotTable)
      .where(eq(screenshotTable.uid, uid));
    return NextResponse.json(screenshot[0]);
  }

  return NextResponse.json({ result: "No Record Found" });
}
