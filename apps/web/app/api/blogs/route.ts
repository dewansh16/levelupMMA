import { PrismaClient } from "@repo/db";
import { NextRequest } from "next/server";
import { BlogVal } from "@repo/validations";

export async function GET(req: NextRequest) {
  const client = new PrismaClient();

  try {
    const blogs = await client.blog.findMany();

    return new Response(JSON.stringify({ data: blogs }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 501,
    });
  }
}

export async function POST(req: NextRequest) {
  const client = new PrismaClient();
  const body = await req.json();

  const parsedInput = BlogVal.safeParse(body);
  if (!parsedInput.success) {
    return new Response(JSON.stringify({ message: parsedInput.error }), {
      status: 401,
    });
  }

  // console.log("parsedInput = ", parsedInput);

  const { title, date, image, desc } = body;

  try {
    const newBlog = await client.blog.create({
      data: {
        title,
        date,
        image,
        desc,
      },
    });

    return new Response(JSON.stringify({ data: newBlog }), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 501,
    });
  }
}

export async function PUT(req: NextRequest) {
  const client = new PrismaClient();

  const { searchParams } = new URL(req.url);
  const reqId = searchParams.get("id");

  const body = await req.json();

  const { title, date, image, desc } = body;

  if (reqId === null) {
    return new Response(JSON.stringify({ message: "reqId cannot be null" }), {
      status: 401,
    });
  } else {
    try {
      const updatedBlog = await client.blog.update({
        where: {
          id: reqId,
        },
        data: {
          title,
          date,
          image,
          desc,
        },
      });

      return new Response(JSON.stringify({ data: updatedBlog }), {
        status: 200,
      });
    } catch (err) {
      return new Response(
        JSON.stringify({ message: "Internal Server Error" }),
        { status: 501 }
      );
    }
  }
}

export async function DELETE(req: NextRequest) {
  const client = new PrismaClient();
  const { searchParams } = new URL(req.url);
  const reqId = searchParams.get("id");

  try {
    if (reqId === null) {
      return new Response(JSON.stringify({ message: "reqId cannot be null" }), {
        status: 401,
      });
    } else {
      const deletedBlog = await client.blog.delete({
        where: {
          id: reqId,
        },
      });
      return new Response(JSON.stringify({ deletedBlog }), {
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
