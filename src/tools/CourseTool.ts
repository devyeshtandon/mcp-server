import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getCourseById, getCourses } from "../api/courses.js";
import { z } from "zod";

export class CoursesTool {
    constructor(private readonly server: McpServer) {
        this.server = server;
        this.registerTool();
    }

}
