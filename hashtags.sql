CREATE DATABASE todo_backend DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

USE todo_backend;
DROP TABLE IF EXISTS hashtags;
CREATE TABLE `hashtags` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `wordColor` INT NOT NULL,
  `backgroundColor` INT NOT NULL,
  `createdAt` DATETIME NULL DEFAULT now(),
  PRIMARY KEY (`id`, `name`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8 COLLATE = utf8_general_ci;