"use client";
import {ConvexProvider} from "convex/react";
import { ConvexReactClient } from "convex/react";
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL || "https://your-convex-url-here");
export default function ConvexClientProvider({ children }) {
  return (
    <ConvexProvider client={convex}>{children}</ConvexProvider>
  );
}   