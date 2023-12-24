import { TodoCreateProps, TodoUpdateProps } from "@/lib/validators";
import service from "@/service/index";
import { TodoContext } from "./types";
import { error } from "console";

export async function GET(_req: Request, context: TodoContext) {
  try {
    const parsedTodoCtx = TodoContext.safeParse(context);

    if (!parsedTodoCtx.success)
      return new Response(JSON.stringify({ error: "Invalid ID" }), {
        status: 400,
      });

    const { id } = parsedTodoCtx.data.params;

    const [success, response] = await service.todo.findOne({ id });

    if (!success) {
      return new Response(JSON.stringify({ error: response }), { status: 500 });
    }

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.log("GetOne->Error: ", error);
    return new Response(
      JSON.stringify({
        error: "Something Went Wrong! Please try again later.",
      }),
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, context: TodoContext) {
  try {
    const parsedTodoCtx = TodoContext.safeParse(context);

    if (!parsedTodoCtx.success)
      return new Response(JSON.stringify({ error: "Invalid ID" }), {
        status: 400,
      });

    const { id } = parsedTodoCtx.data.params;

    const parsedBody = TodoUpdateProps.safeParse(await req.json());

    if (!parsedBody.success) {
      return new Response(JSON.stringify({ error: "Invalid Request Body" }), {
        status: 400,
      });
    }

    const [status, response] = await service.todo.update(
      { id },
      parsedBody.data
    );

    if (!status) {
      return new Response(JSON.stringify({ error: response }), { status: 500 });
    }

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.log("Update->Error: ", error);
    return new Response(
      JSON.stringify({
        error: (error as any).message,
      }),
      {
        status: 500,
        statusText: "Something Went Wrong! Please try again later.",
      }
    );
  }
}

export async function DELETE(_req: Request, context: TodoContext) {
  try {
    const parsedTodoCtx = TodoContext.safeParse(context);

    if (!parsedTodoCtx.success)
      return new Response(JSON.stringify({ error: "Invalid ID" }), {
        status: 400,
      });

    const { id } = parsedTodoCtx.data.params;

    const [status, response] = await service.todo.deleteOne({ id });

    if (!status)
      return new Response(JSON.stringify({ error: response }), {
        status: 500,
      });

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.error("Delete->Error: ", error);
    return new Response(
      JSON.stringify({
        error: "Something Went Wrong! Please try again later.",
      }),
      { status: 500 }
    );
  }
}
