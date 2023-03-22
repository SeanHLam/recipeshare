/*
  Warnings:

  - You are about to drop the `comments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `dislikes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `likes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_recipeId_fkey`;

-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_userId_fkey`;

-- DropForeignKey
ALTER TABLE `dislikes` DROP FOREIGN KEY `dislikes_recipeId_fkey`;

-- DropForeignKey
ALTER TABLE `dislikes` DROP FOREIGN KEY `dislikes_userId_fkey`;

-- DropForeignKey
ALTER TABLE `likes` DROP FOREIGN KEY `likes_recipeId_fkey`;

-- DropForeignKey
ALTER TABLE `likes` DROP FOREIGN KEY `likes_userId_fkey`;

-- DropTable
DROP TABLE `comments`;

-- DropTable
DROP TABLE `dislikes`;

-- DropTable
DROP TABLE `likes`;

-- CreateTable
CREATE TABLE `Comments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `recipeId` INTEGER NOT NULL,
    `comment` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Likes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `recipeId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dislikes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `recipeId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `Recipe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Likes` ADD CONSTRAINT `Likes_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Likes` ADD CONSTRAINT `Likes_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `Recipe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dislikes` ADD CONSTRAINT `Dislikes_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dislikes` ADD CONSTRAINT `Dislikes_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `Recipe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
