import { NextRequest } from "next/server";
import { PrismaClient } from "@repo/db";
import { trainerVal } from "@repo/validations";

export async function GET(req: NextRequest) {
  const client = new PrismaClient();

  try {
    const allClasses = await client.trainer.findMany();
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

  const parsedInput = trainerVal.safeParse(body);
  if (!parsedInput.success) {
    return new Response(JSON.stringify({ message: parsedInput.error }), {
      status: 401,
    });
  }

  console.log("parsedInput = ", parsedInput);

  const { name, position, image, desc } = body;

  try {
    const newTrainer = await client.trainer.create({
      data: {
        name,
        position,
        image,
        desc,
      },
    });
    return new Response(JSON.stringify({ data: newTrainer }), {
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
      const deletedTrainer = await client.trainer.delete({
        where: {
          id: reqId,
        },
      });
      return new Response(JSON.stringify({ deletedTrainer }), {
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
