import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function appendToSheet(email: string): Promise<void> {
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const sheetId = process.env.GOOGLE_SHEET_ID;

  console.log("[Tablr] Env check:", {
    hasEmail: !!serviceAccountEmail,
    hasKey: !!privateKey,
    hasSheetId: !!sheetId,
  });

  if (!serviceAccountEmail || !privateKey || !sheetId) {
    // Env vars not configured — log and skip sheet write
    console.log("[Tablr] Waitlist signup (no sheet configured):", email);
    return;
  }

  const auth = new google.auth.JWT({
    email: serviceAccountEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: "Sheet1!A:B",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[email, new Date().toISOString()]],
    },
  });

  console.log("[Tablr] Appended to sheet:", email);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body as { email?: string };

    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const normalized = email.trim().toLowerCase();

    await appendToSheet(normalized);

    return NextResponse.json({ success: true, message: "You're on the waitlist!" });
  } catch (err) {
    console.error("[Tablr] Subscribe error:", err);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
