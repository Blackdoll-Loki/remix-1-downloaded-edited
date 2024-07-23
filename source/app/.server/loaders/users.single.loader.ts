import { LoaderFunctionArgs } from "@remix-run/node";
import { prisma } from "prisma/seed";

export const usersSingleLoader = async ({ params }: LoaderFunctionArgs) => {
  const userId = Number(params.userId);

  if (isNaN(userId)) {
    throw new Response("Invalid User ID", { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { address: true },
    });

    if (!user) {
      throw new Response("User Not Found", { status: 404 });
    }

    return { user };
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Response("Error fetching user", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
