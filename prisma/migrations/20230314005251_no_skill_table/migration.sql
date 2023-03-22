/*
  Warnings:

  - You are about to drop the column `skill_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Skill` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_skill_id_fkey`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `skill_id`;

-- DropTable
DROP TABLE `Skill`;
