import { BlogResponse, ReducedItemData } from "../types/api/blogs.js";

export class BlogPosts {
    private static readonly baseUrl: string = "https://interviewready.io/_nuxt/content/db-96806b65.json";
    private static cachedResponse: ReducedItemData[] | null = null;


    static async getAllBlogPosts() {
        if (this.cachedResponse) {
            return this.cachedResponse;
        }

        const response = await fetch(this.baseUrl);
        const data: BlogResponse = await response.json();
        const blogData = data._collections[0]._data;
        const reducedBlogData: ReducedItemData[] = blogData.map((post) => ({
            slug: post.slug,
            title: post.title,
            keywords: post.keywords || post.Keywords,
            bodyPlainText: post.bodyPlainText,
        }));

        this.cachedResponse = reducedBlogData;
        return reducedBlogData;
    }

    static async getBlogPostBySlug(slug: string) {
        const blogPosts = await this.getAllBlogPosts();
        return blogPosts.find((post) => post.slug === slug);
    }

    static async getBlogPostByKeywords(keyword: string) {
        const blogPosts = await this.getAllBlogPosts();
        return blogPosts.filter((post) => post.keywords?.includes(keyword));
    }

    static async getBlogPostByTitle(title: string) {
        const blogPosts = await this.getAllBlogPosts();
        return blogPosts.find((post) => post.title === title);
    }
}

