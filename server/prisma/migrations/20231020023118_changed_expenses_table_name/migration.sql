/*
  Warnings:

  - You are about to drop the `Spends` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Spends" DROP CONSTRAINT "Spends_event_id_fkey";

-- DropTable
DROP TABLE "Spends";

-- CreateTable
CREATE TABLE "Expenses" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(30) NOT NULL,
    "description" VARCHAR(255),
    "amount" DECIMAL(10,2) NOT NULL,
    "event_id" INTEGER NOT NULL,

    CONSTRAINT "Expenses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
