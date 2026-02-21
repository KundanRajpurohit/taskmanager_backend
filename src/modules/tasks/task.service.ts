import prisma from "../../config/prisma";

export const createTask = async (userId: string, title: string) => {
  return prisma.task.create({
    data: {
      title,
      userId,
    },
  });
};

export const getTasks = async ({
  userId,
  page = 1,
  limit = 10,
  status,
  search,
}: {
  userId: string;
  page?: number;
  limit?: number;
  status?: boolean;
  search?: string;
}) => {
  return prisma.task.findMany({
    where: {
      userId,
      status,
      title: search
        ? { contains: search, mode: "insensitive" }
        : undefined,
    },
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const updateTask = async (
  taskId: string,
  userId: string,
  title: string
) => {
  return prisma.task.updateMany({
    where: { id: taskId, userId },
    data: { title },
  });
};

export const deleteTask = async (taskId: string, userId: string) => {
  return prisma.task.deleteMany({
    where: { id: taskId, userId },
  });
};

export const toggleTaskStatus = async (
  taskId: string,
  userId: string
) => {
  const task = await prisma.task.findFirst({
    where: { id: taskId, userId },
  });

  if (!task) {
    throw new Error("Task not found");
  }

  return prisma.task.update({
    where: { id: taskId },
    data: { status: !task.status },
  });
};
