import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getResources } from "../api/resource.js";

export class ResourceTool {
    constructor(private readonly server: McpServer) {
        this.server = server;
        this.registerTool();
    }

    private registerTool() {
        this.server.tool(
            "get-resources",
            "Get all resources on interviewready platform",
            {},
            async () => this.getResources(),
        );
    }

    private async getResources() {
        const resources = await getResources();
        const content = resources.map(resource => ({ type: "text" as const, text: JSON.stringify(resource) }));
        return { content: content };
    }
}