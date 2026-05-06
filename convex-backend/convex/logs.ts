import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const addLog = mutation({
  args: {
    message: v.string(),
    source: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("logs", {
      message: args.message,
      source: args.source,
      createdAt: Date.now(),
    });
    return null;
  },
});

export const latest = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("logs").order("desc").take(20);
  },
});
