import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

const router = Router();
dotenv.config();

const prisma: any = new PrismaClient();

// router.use((req: Request, res: Response, next) => {
//   console.log(`Request received: ${req.method} ${req.url}`);
//   next(); // Proceed to the next middleware or route handler
// });

router.get("/", async (req: Request, res: Response) => {
  try {
    const todoLists = await prisma.list.findMany();

    res.json(todoLists);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Error fetching book stores" });
  } finally {
    // Disconnect the Prisma client after use
    await prisma.$disconnect();
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { title, color } = req.body;

    const bookstore = await prisma.list.create({
      data: {
        title,

        color,
      },
    });

    res.json(bookstore);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Error creating book store" });
  } finally {
    // Disconnect the Prisma client after use
    await prisma.$disconnect();
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params; // Get the task id from the URL parameters
  const { title, color, completed } = req.body; // Get updated task data from the body

  try {
    // Update the task in the database
    const updatedTask = await prisma.list.update({
      where: { id: parseInt(id, 10) }, // Convert the id to integer for Prisma query
      data: {
        title,
        color,
        completed,
      },
    });

    // Return the updated task
    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating task" });
  } finally {
    // Disconnect the Prisma client after use
    await prisma.$disconnect();
  }
});

router.delete("/", async (req: Request, res: Response) => {
  const { id } = req.params; // Get the task id from the URL parameters

  try {
    // Delete the task from the database
    const deletedTask = await prisma.list.delete({
      where: { id: parseInt(id, 10) }, // Convert the id to an integer
    });

    // Respond with the deleted task or a confirmation message
    res.json({ message: "Task deleted successfully", task: deletedTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting task" });
  } finally {
    // Disconnect Prisma client after use
    await prisma.$disconnect();
  }
});

module.exports = router;
