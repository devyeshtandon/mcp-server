import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BlogPosts } from "../api/blogs.js";

export class BlogTool {
    constructor(private readonly server: McpServer) {
        this.server = server;
        this.registerTool();
    }

    private registerTool() {
        this.server.tool(
            "get-blog-posts",
            "Get all blog posts on interviewready platform",
            {},
            async () => this.getBlogPosts(),
        );

    async getBlogPosts() {
        const blogPosts = await BlogPosts.getAllBlogPosts();
        const content = blogPosts.map((blogPost) => (
            {
                type: "text" as const,
                text: JSON.stringify({
                    slug: blogPost.slug,
                    title: blogPost.title,
                    keywords: blogPost.keywords,
                    bodyPlainText: blogPost.bodyPlainText,
                })
            }
        ))

        return { content: content };
    }

    }
}
