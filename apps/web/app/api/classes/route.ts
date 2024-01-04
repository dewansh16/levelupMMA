import { NextRequest } from "next/server";
import { PrismaClient } from "@repo/db";
import { classVal } from "@repo/validations";

export async function GET(req: NextRequest) {
  const client = new PrismaClient();

  try {
    const allClasses = await client.lecture.findMany();
    return new Response(JSON.stringify({ data: allClasses }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 501,
    });
  }
}

export async function POST(req: NextRequest) {
  const client = new PrismaClient();
  const body = await req.json();

  const parsedInput = classVal.safeParse(body);
  if (!parsedInput.success) {
    return new Response(JSON.stringify({ message: parsedInput.error }), {
      status: 401,
    });
  }

  console.log("parsedInput = ", parsedInput);

  const { name, location, timing, desc } = body;

  try {
    const newClass = await client.lecture.create({
      data: {
        name,
        location,
        timing,
        desc,
      },
    });

    return new Response(JSON.stringify({ data: newClass }), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 501,
    });
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const client = new PrismaClient();
  const reqId = searchParams.get("id");

  try {
    if (reqId === null) {
      return new Response(JSON.stringify({ message: "id cannot be null" }), {
        status: 401,
      });
    } else {
      const deletedClasses = await client.lecture.delete({
        where: {
          id: reqId,
        },
      });
      return new Response(JSON.stringify({ deletedClasses }), {
        status: 200,
      });
    }
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 501,
    });
  }
}
