import { LoaderFunctionArgs } from "@remix-run/node";
import { prisma } from "prisma/seed";

export const usersPostsLoader = async ({ params }: LoaderFunctionArgs) => {
  const userId = Number(params.userId);

  if (isNaN(userId)) {
    throw new Response("Invalid User ID", { status: 400 });
  }

  try {
    const posts = await prisma.post.findMany({
      where: { userId },
      include: { reactions: true },
    });

    if (!posts || posts.length === 0) {
      throw new Response("Posts Not Found", { status: 404 });
    }

    return { posts };
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Response("Error fetching posts", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
