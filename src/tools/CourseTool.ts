import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getCourseById, getCourses } from "../api/courses.js";
import { z } from "zod";

export class CoursesTool {
    constructor(private readonly server: McpServer) {
        this.server = server;
        this.registerTool();
    }

    private registerTool() {
        this.server.tool(
            "get-courses",
            "Get all courses on interviewready platform",
            {},
            async () => this.getCourses(),
        );

    }

    async getCourses() {
        const courses = await getCourses();
        const relevantData = courses.map((course) => ({
            id: course.id,
            name: course.name,
            description: course.description,
            thumbnail_url: course.thumbnail_url,
        }));

        return {
            content: [
                {
                    type: "text" as const,
                    text: JSON.stringify(relevantData),
                },
            ],
        };
    }

}
