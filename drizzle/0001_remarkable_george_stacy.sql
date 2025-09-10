RENAME TABLE `character` TO `Character`;--> statement-breakpoint
RENAME TABLE `characterClass` TO `CharacterClass`;--> statement-breakpoint
RENAME TABLE `character_items` TO `CharactersItems`;--> statement-breakpoint
RENAME TABLE `item` TO `Item`;--> statement-breakpoint
ALTER TABLE `Character` DROP FOREIGN KEY `character_class_characterClass_id_fk`;
--> statement-breakpoint
ALTER TABLE `CharactersItems` DROP FOREIGN KEY `character_items_character_id_character_id_fk`;
--> statement-breakpoint
ALTER TABLE `CharactersItems` DROP FOREIGN KEY `character_items_item_id_item_id_fk`;
--> statement-breakpoint
ALTER TABLE `Character` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `CharacterClass` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `Item` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `Character` ADD PRIMARY KEY(`id`);--> statement-breakpoint
ALTER TABLE `CharacterClass` ADD PRIMARY KEY(`id`);--> statement-breakpoint
ALTER TABLE `Item` ADD PRIMARY KEY(`id`);--> statement-breakpoint
ALTER TABLE `Character` ADD CONSTRAINT `Character_class_CharacterClass_id_fk` FOREIGN KEY (`class`) REFERENCES `CharacterClass`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `CharactersItems` ADD CONSTRAINT `CharactersItems_character_id_Character_id_fk` FOREIGN KEY (`character_id`) REFERENCES `Character`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `CharactersItems` ADD CONSTRAINT `CharactersItems_item_id_Item_id_fk` FOREIGN KEY (`item_id`) REFERENCES `Item`(`id`) ON DELETE cascade ON UPDATE no action;