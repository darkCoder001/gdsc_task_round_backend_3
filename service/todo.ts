import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function create(data: Prisma.TodoCreateInput) {
  try {
    const todo = await prisma.todo.create({ data });

    if (!todo) {
      return [
        false,
        new Error("There was some error creating entry in the database"),
      ];
    }

    return [true, { data: todo }];
  } catch (error) {
    return [false, new Error("Error 500 Internal Server Error")];
  }
}

export async function findOne(where: Prisma.TodoWhereInput) {
  try {
    const todo = await prisma.todo.findFirst({
      where: where,
    });

    if (!todo) {
      return [
        false,
        new Error("There was some error finding the entry from the database"),
      ];
    }

    return [true, { data: todo }];
  } catch (error) {
    return [false, new Error("Error 500 Internal Server Error")];
  }
}

export async function findMany(where?: Prisma.TodoWhereInput) {
  try {
    const todo = await prisma.todo.findMany({
      where: where,
    });

    if (!todo) {
      return [
        false,
        new Error("There was some error finding the entry from the database"),
      ];
    }

    return [true, { data: todo }];
  } catch (error) {
    return [false, new Error("Error 500 Internal Server Error")];
  }
}

export async function update(
  where: Prisma.TodoWhereUniqueInput,
  data: Prisma.TodoUpdateInput
) {
  try {
    const todo = await prisma.todo.update({
      where: where,
      data: data,
    });

    if (!todo) {
      return [
        false,
        new Error("There was some error updating the entry in the database"),
      ];
    }

    return [true, { data: todo }];
  } catch (error) {
    return [false, new Error("Error 500 Internal Server Error")];
  }
}

export async function deleteOne(where: Prisma.TodoWhereUniqueInput) {
  try {
    const todo = await prisma.todo.delete({
      where: where,
    });

    if (!todo) {
      return [
        false,
        new Error("There was some error deleting the entry from the database"),
      ];
    }

    return [true, { status: 200 }];
  } catch (error) {
    return [false, new Error("Error 500 Internal Server Error")];
  }
}
