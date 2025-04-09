import { BlogResponse, ReducedItemData } from "../types/api/blogs.js";

export class BlogPosts {
    private static readonly baseUrl: string = "https://interviewready.io/_nuxt/content/db-96806b65.json";
    private static cachedResponse: ReducedItemData[] | null = null;

}

