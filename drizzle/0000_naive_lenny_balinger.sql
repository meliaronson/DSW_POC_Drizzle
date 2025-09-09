CREATE TABLE `character` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`level` int NOT NULL,
	`hp` int NOT NULL,
	`attack` int NOT NULL,
	`class` int,
	CONSTRAINT `character_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `characterClass` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`descripcion` varchar(1000) NOT NULL,
	CONSTRAINT `characterClass_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `character_items` (
	`character_id` int NOT NULL,
	`item_id` int NOT NULL
);
--> statement-breakpoint
CREATE TABLE `item` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`descripcion` varchar(1000) NOT NULL,
	CONSTRAINT `item_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users_table` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`age` int NOT NULL,
	`email` varchar(255) NOT NULL,
	CONSTRAINT `users_table_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_table_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `character` ADD CONSTRAINT `character_class_characterClass_id_fk` FOREIGN KEY (`class`) REFERENCES `characterClass`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `character_items` ADD CONSTRAINT `character_items_character_id_character_id_fk` FOREIGN KEY (`character_id`) REFERENCES `character`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `character_items` ADD CONSTRAINT `character_items_item_id_item_id_fk` FOREIGN KEY (`item_id`) REFERENCES `item`(`id`) ON DELETE cascade ON UPDATE no action;