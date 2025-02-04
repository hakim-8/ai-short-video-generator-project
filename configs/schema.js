import { boolean, pgTable, serial, varchar, json, integer } from "drizzle-orm/pg-core";

export const Users = pgTable('users', {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    email: varchar("email").unique().notNull(),
    imageUrl: varchar("imageUrl"),
    subscription: boolean("subscription").default(false),
    credits: integer("credits").default(10)  // 10 credits = 1 video
});

export const videoData = pgTable('videoData', {
    id: serial('id').primaryKey(),
    script: json('script').notNull(),  // JSON field for the video script
    audioFileUrl: varchar('audioFileUrl').notNull(),  // String for the audio file URL
    captions: json('captions').notNull(),  // JSON field for captions
    imageList: varchar('imageList').array(),  // Array of strings for image URLs
    createdBy: varchar('createdBy').notNull(),
});
