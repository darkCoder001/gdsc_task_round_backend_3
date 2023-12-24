import { TodoCreateProps } from "@/lib/validators";
import service from "@/service/index";

export async function POST(req: Request) {
  try {
    const parsedBody = TodoCreateProps.safeParse(await req.json());

    if (!parsedBody.success) {
      return new Response(
        JSON.stringify({
          error: parsedBody.error,
        }),
        { status: 400 }
      );
    }

    const [success, response] = await service.todo.create(parsedBody.data);

    if (!success) {
      return new Response(
        JSON.stringify({
          error: response,
        }),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify(response), { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        error: "Invalid Request, couldn't parse request body.",
      }),
      { status: 500 }
    );
  }
}

export async function GET(_req: Request) {
  try {
    const [success, response] = await service.todo.findMany();

    if (!success) {
      return new Response(JSON.stringify({ error: response }), { status: 500 });
    }

    if (!response) {
      return new Response(JSON.stringify({ error: "No entries found!" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.log("GetAll->Error: ", error);
    return new Response(
      JSON.stringify({
        error: "Something Went Wrong! Please try again later.",
      }),
      { status: 500 }
    );
  }
}
