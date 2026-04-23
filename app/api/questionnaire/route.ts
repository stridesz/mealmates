import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const QUESTIONNAIRE_SHEET_TITLE = "Questionnaire";
const QUESTIONNAIRE_HEADERS = [
  "Email",
  "Questionnaire Timestamp",
  "Year",
  "Table Types",
  "People To Meet",
  "People Other",
  "Awkward Reasons",
  "Awkward Other",
  "Anything Else",
];

type QuestionnaireBody = {
  email?: string;
  year?: string;
  tableTypes?: string[];
  peopleToMeet?: string[];
  peopleOther?: string;
  awkwardReasons?: string[];
  awkwardOther?: string;
  anythingElse?: string;
};

function cleanText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function cleanList(value: unknown): string {
  if (!Array.isArray(value)) return "";
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean)
    .join("; ");
}

async function getSheetsClient() {
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const sheetId = process.env.GOOGLE_SHEET_ID;

  console.log("[Tablr] Questionnaire env check:", {
    hasEmail: !!serviceAccountEmail,
    hasKey: !!privateKey,
    hasSheetId: !!sheetId,
  });

  if (!serviceAccountEmail || !privateKey || !sheetId) {
    return { sheets: null, sheetId: null };
  }

  const auth = new google.auth.JWT({
    email: serviceAccountEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return { sheets: google.sheets({ version: "v4", auth }), sheetId };
}

async function ensureQuestionnaireSheet(
  sheets: ReturnType<typeof google.sheets>,
  sheetId: string
): Promise<void> {
  const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId: sheetId });
  const existingSheet = spreadsheet.data.sheets?.find(
    (sheet) => sheet.properties?.title === QUESTIONNAIRE_SHEET_TITLE
  );

  if (!existingSheet) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: sheetId,
      requestBody: {
        requests: [
          {
            addSheet: {
              properties: {
                title: QUESTIONNAIRE_SHEET_TITLE,
              },
            },
          },
        ],
      },
    });
  }

  const headerResponse = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${QUESTIONNAIRE_SHEET_TITLE}!A1:I1`,
  });

  const headers = headerResponse.data.values?.[0] ?? [];
  const headersMissing = QUESTIONNAIRE_HEADERS.some((header, index) => headers[index] !== header);

  if (headersMissing) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: `${QUESTIONNAIRE_SHEET_TITLE}!A1:I1`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [QUESTIONNAIRE_HEADERS],
      },
    });
  }
}

async function appendQuestionnaire(body: QuestionnaireBody): Promise<void> {
  const { sheets, sheetId } = await getSheetsClient();
  const email = cleanText(body.email).toLowerCase();

  if (!sheets || !sheetId) {
    console.log("[Tablr] Questionnaire submission (no sheet configured):", body);
    return;
  }

  await ensureQuestionnaireSheet(sheets, sheetId);

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: `${QUESTIONNAIRE_SHEET_TITLE}!A:I`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [
        [
          email,
          new Date().toISOString(),
          cleanText(body.year),
          cleanList(body.tableTypes),
          cleanList(body.peopleToMeet),
          cleanText(body.peopleOther),
          cleanList(body.awkwardReasons),
          cleanText(body.awkwardOther),
          cleanText(body.anythingElse),
        ],
      ],
    },
  });

  console.log("[Tablr] Appended questionnaire response:", email);
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as QuestionnaireBody;
    const email = cleanText(body.email).toLowerCase();

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    await appendQuestionnaire({ ...body, email });

    return NextResponse.json({ success: true, message: "Questionnaire submitted." });
  } catch (err) {
    console.error("[Tablr] Questionnaire error:", err);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
