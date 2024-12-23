-- CreateTable
CREATE TABLE "Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "color" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false
);
