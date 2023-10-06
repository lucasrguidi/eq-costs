/*
  Warnings:

  - Added the required column `admin_id` to the `Events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Events" ADD COLUMN     "admin_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
