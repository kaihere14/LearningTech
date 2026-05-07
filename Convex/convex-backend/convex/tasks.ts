import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tasks").order("desc").take(100);
  },
});

export const create = mutation({
  args: {
    text: v.string(),
  },
  handler: async (ctx, args) => {
    const trimmedText = args.text.trim();
    if (!trimmedText) {
      throw new Error("Task text is required");
    }

    await ctx.db.insert("tasks", {
      text: trimmedText,
      isCompleted: false,
      source: "client",
    });
    return null;
  },
});

export const toggle = mutation({
  args: {
    taskId: v.id("tasks"),
    isCompleted: v.boolean(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.taskId, {
      isCompleted: args.isCompleted,
    });
    return null;
  },
});

export const deleteTask = mutation({
  args: {
    taskId: v.id("tasks"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.taskId);
    return null;
  },
});

export const createFromExpress = mutation({
  args: {
    text: v.string(),
    origin: v.string(),
  },
  handler: async (ctx, args) => {
    const trimmedText = args.text.trim();
    if (!trimmedText) {
      throw new Error("Task text is required");
    }

    await ctx.db.insert("tasks", {
      text: trimmedText,
      isCompleted: false,
      source: args.origin,
    });
    return null;
  },
});
