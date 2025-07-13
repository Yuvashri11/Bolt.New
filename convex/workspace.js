import { mutation,query } from "./_generated/server"
import { v } from "convex/values";

export const CreateWorkspace =mutation({
  args:{    
    message: v.any(),
    user: v.id("users")
  },
  handler: async (ctx, args) => {
    const workspaceId = await ctx.db.insert("workspace", {
      message: args.message,
      user: args.user
    });
    console.log("New Workspace Created", workspaceId);
    return workspaceId
  }
})

export const GetWorkspace =query({
  args:{
    workspaceId: v.id("workspace")
  },
  handler: async (ctx, args) => {
    const workspace = await ctx.db.get(args.workspaceId);
    if (!workspace) {
      throw new Error("Workspace not found");
    }
    console.log("Fetching workspace with ID", args.workspaceId);

    return workspace;
  }
})

export const UpdateMessages = mutation({
  args: {
    workspaceId: v.id("workspace"),
    message: v.any()
  },
  handler: async (ctx, args) => {
    const workspace = await ctx.db.patch(args.workspaceId,{message: args.message});
    
    return workspace;
  }
});

export const GetAllWorkspaces = query({
  args: {
    userId: v.id("users")
  },
  handler: async (ctx, args) => {
    const workspaces = await ctx.db.query("workspace").filter(q=> q.eq(q.field("user"), args.userId)).collect();
    
    return workspaces;
  }
});