import { db } from "@/configs/db";
import { screenshotTable, usersTable } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { description, imageUrl, model, uid, email } = await req.json();

  const creditResult = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (creditResult[0]?.credit && creditResult[0]?.credit > 0) {
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

      const data = await db.update(usersTable).set({
        credit: creditResult[0]?.credit - 1
      }).where(eq(usersTable.email, email));

    return NextResponse.json({ result: result });
  } else {
    return NextResponse.json({ error: "Not enough credits" });
  }
}

export async function GET(req: NextRequest) {
  const reqUrl = req.url;

  const { searchParams } = new URL(reqUrl);
  const uid = searchParams?.get("uid");
  const email = searchParams?.get("email");
  if (uid) {
    const screenshot = await db
      .select()
      .from(screenshotTable)
      .where(eq(screenshotTable.uid, uid));
    return NextResponse.json(screenshot[0]);
  } else if (email) {
    const screenshot = await db
      .select()
      .from(screenshotTable)
      .where(eq(screenshotTable.createdBy, email));
    return NextResponse.json(screenshot);
  }

  return NextResponse.json({ result: "No Record Found" });
}

export async function PUT(req: NextRequest) {
  const { uid, codeResp } = await req.json();

  const result = await db
    .update(screenshotTable)
    .set({
      code: codeResp,
    })
    .where(eq(screenshotTable.uid, uid))
    .returning({ uid: screenshotTable.uid });

  return NextResponse.json(result);
}

