import { NextRequest } from "next/server";
import { PrismaClient } from "@repo/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const client = new PrismaClient();
  const reqId = params.id;

  try {
    const reqBlog = await client.blog.findUnique({
      where: {
        id: reqId,
      },
    });

    return new Response(JSON.stringify({ data: reqBlog }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 501,
    });
  }
}
