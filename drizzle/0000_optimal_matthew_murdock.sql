CREATE TABLE `Character` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`level` int NOT NULL,
	`hp` int NOT NULL,
	`attack` int NOT NULL,
	`classId` int,
	CONSTRAINT `Character_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `CharacterClass` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`descripcion` varchar(1000) NOT NULL,
	CONSTRAINT `CharacterClass_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `CharactersItems` (
	`character_id` int NOT NULL,
	`item_id` int NOT NULL
);
--> statement-breakpoint
CREATE TABLE `Item` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`descripcion` varchar(1000) NOT NULL,
	CONSTRAINT `Item_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `Character` ADD CONSTRAINT `Character_classId_CharacterClass_id_fk` FOREIGN KEY (`classId`) REFERENCES `CharacterClass`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `CharactersItems` ADD CONSTRAINT `CharactersItems_character_id_Character_id_fk` FOREIGN KEY (`character_id`) REFERENCES `Character`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `CharactersItems` ADD CONSTRAINT `CharactersItems_item_id_Item_id_fk` FOREIGN KEY (`item_id`) REFERENCES `Item`(`id`) ON DELETE cascade ON UPDATE no action;