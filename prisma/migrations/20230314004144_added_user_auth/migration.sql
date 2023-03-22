/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `recipe_id` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `recipe_id` on the `dislikes` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `dislikes` table. All the data in the column will be lost.
  - You are about to drop the column `recipe_id` on the `likes` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `likes` table. All the data in the column will be lost.
  - You are about to drop the `recipes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `recipeId` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipeId` to the `dislikes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `dislikes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipeId` to the `likes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `likes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_recipe_id_fkey`;

-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `dislikes` DROP FOREIGN KEY `dislikes_recipe_id_fkey`;

-- DropForeignKey
ALTER TABLE `dislikes` DROP FOREIGN KEY `dislikes_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `likes` DROP FOREIGN KEY `likes_recipe_id_fkey`;

-- DropForeignKey
ALTER TABLE `likes` DROP FOREIGN KEY `likes_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `recipes` DROP FOREIGN KEY `recipes_user_id_fkey`;

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    DROP COLUMN `createdAt`,
    DROP COLUMN `password`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `emailVerified` DATETIME(3) NULL,
    ADD COLUMN `image` VARCHAR(191) NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(191) NULL,
    MODIFY `name` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `comments` DROP COLUMN `recipe_id`,
    DROP COLUMN `user_id`,
    ADD COLUMN `recipeId` INTEGER NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `dislikes` DROP COLUMN `recipe_id`,
    DROP COLUMN `user_id`,
    ADD COLUMN `recipeId` INTEGER NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `likes` DROP COLUMN `recipe_id`,
    DROP COLUMN `user_id`,
    ADD COLUMN `recipeId` INTEGER NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `recipes`;

-- CreateTable
CREATE TABLE `Account` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(191) NULL,

    UNIQUE INDEX `Account_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_sessionToken_key`(`sessionToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VerificationToken` (
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `VerificationToken_token_key`(`token`),
    UNIQUE INDEX `VerificationToken_identifier_token_key`(`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Recipe` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `ingredients` VARCHAR(191) NOT NULL,
    `steps` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Recipe` ADD CONSTRAINT `Recipe_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `Recipe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `likes` ADD CONSTRAINT `likes_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `likes` ADD CONSTRAINT `likes_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `Recipe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dislikes` ADD CONSTRAINT `dislikes_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dislikes` ADD CONSTRAINT `dislikes_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `Recipe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
