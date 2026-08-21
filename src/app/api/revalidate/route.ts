import { parseBody } from "next-sanity/webhook";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

type WebhookPayload = {
  _type?: string;
};

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (!secret) {
    return NextResponse.json(
      {
        message: "SANITY_REVALIDATE_SECRET is not configured",
      },
      { status: 500 },
    );
  }

  const { isValidSignature, body } = await parseBody<WebhookPayload>(
    req,
    secret,
    true,
  );

  console.log("Sanity webhook received:", body);

  if (!isValidSignature) {
    return NextResponse.json(
      {
        message: "Invalid signature",
      },
      { status: 401 },
    );
  }

  switch (body?._type) {
    case "post":
      console.log("Revalidating posts");

      revalidateTag("posts", "max");
      break;

    case "author":
      console.log("Revalidating authors");

      revalidateTag("authors", "max");
      break;

    case "category":
      console.log("Revalidating categories");

      revalidateTag("categories", "max");
      break;

    case "tag":
      revalidateTag("tags", "max");
      break;
  }

  return NextResponse.json({
    revalidated: true,
    type: body?._type,
  });
}
