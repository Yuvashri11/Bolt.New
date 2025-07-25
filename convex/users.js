import { mutation,query } from "./_generated/server";
import { v } from "convex/values";


export const CreateUser =mutation({
  args:{
    name: v.string(),
    email: v.string(),
    picture: v.string(),
    uid: v.string(),
   
  },
  handler: async (ctx, args) => {
    const user=await ctx.db.query("users").filter((q) => q.eq(q.field("email"), args.email)).collect();
    console.log(user)
    if(user?.length==0){
        const newUser = await ctx.db.insert("users", {
          name: args.name,
          email: args.email,
          picture: args.picture,
          uid: args.uid,
        })
        console.log("New User Created", newUser);
        return newUser;
    }
  },
})

export const GetUser =query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.query("users").filter((q) => q.eq(q.field("email"), args.email)).collect();
    
    return user[0];
    
  }
})