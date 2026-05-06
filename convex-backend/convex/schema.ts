import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    text: v.string(),
    isCompleted: v.boolean(),
    source: v.optional(v.string()),
  }),
  logs: defineTable({
    message: v.string(),
    source: v.string(),
    createdAt: v.number(),
  }).index("by_createdAt", ["createdAt"]),
});
