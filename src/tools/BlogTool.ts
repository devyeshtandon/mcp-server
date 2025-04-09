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

        this.server.tool(
            "get-blog-post-by-slug",
            "Get a blog post by slug",
            {
                slug: z.string().describe("The slug of the blog post to get"),
            },
            async ({ slug }) => this.getBlogPostBySlug(slug),
        );

        this.server.tool(
            "get-blog-post-by-keywords",
            "Get a blog post by keywords",
            {
                keywords: z.array(z.string()).describe("The keywords of the blog post to get"),
            },
            async ({ keywords }) => this.getBlogPostByKeywords(keywords),
        );

        this.server.tool(
            "get-blog-post-by-title",
            "Get a blog post by title",
            {
                title: z.string().describe("The title of the blog post to get"),
            },
            async ({ title }) => this.getBlogPostByTitle(title),
        );
    }

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

    async getBlogPostBySlug(slug: string) {
        const blogPost = await BlogPosts.getBlogPostBySlug(slug);
        if (!blogPost) {
            return {
                content: [
                    { type: "text" as const, text: "No blog post found" }
                ]
            };
        }

        return {
            content: [
                {
                    type: "text" as const,
                    text: JSON.stringify(blogPost),
                }
            ]
        };
    }

    async getBlogPostByKeywords(keywords: string[]) {
        const keywordPromises = keywords.map(keyword => BlogPosts.getBlogPostByKeywords(keyword));
        const blogPostsArrays = await Promise.all(keywordPromises);

        if (blogPostsArrays.length == 0) {
            return {
                content: [
                    { type: "text" as const, text: "No blog post found" }
                ]
            };
        }

        const content = blogPostsArrays.map(blogPosts => ({ type: "text" as const, text: JSON.stringify(blogPosts) }))
        return { content: content };
    }

    async getBlogPostByTitle(title: string) {
        const blogPost = await BlogPosts.getBlogPostByTitle(title);
        if (!blogPost) {
            return {
                content: [
                    { type: "text" as const, text: "No blog post found" }
                ]
            };
        }

        return {
            content: [
                { type: "text" as const, text: JSON.stringify(blogPost) }
            ]
        };
    }
}
