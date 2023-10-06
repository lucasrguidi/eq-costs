-- DropForeignKey
ALTER TABLE "User_Events" DROP CONSTRAINT "User_Events_event_id_fkey";

-- DropForeignKey
ALTER TABLE "User_Events" DROP CONSTRAINT "User_Events_user_id_fkey";

-- AddForeignKey
ALTER TABLE "User_Events" ADD CONSTRAINT "User_Events_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Events" ADD CONSTRAINT "User_Events_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
