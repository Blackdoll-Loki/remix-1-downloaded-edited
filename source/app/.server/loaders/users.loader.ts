import { LoaderFunctionArgs } from "@remix-run/node";
import { prisma } from "prisma/seed";

export const usersLoader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q")?.trim() || "";

  try {
    if (q) {
      // Припустимо, у вас є функція для пошуку користувачів за запитом
      const users = await prisma.user.findMany({
        where: {
          OR: [
            { firstName: { contains: q, mode: "insensitive" } },
            { lastName: { contains: q, mode: "insensitive" } },
            { email: { contains: q, mode: "insensitive" } },
          ],
        },
      });
      return { users, q };
    }

    // Завантаження всіх користувачів, якщо пошуковий запит не вказано
    const users = await prisma.user.findMany();
    return { users, q };
  } catch (error) {
    console.error("Error fetching users:", error);
    return { users: [], q, error: "Unable to fetch users" };
  } finally {
    await prisma.$disconnect(); // Закриття з'єднання
  }
};
