import { Resource } from "../types/api/resource.js";

const RESOURCE_API = "https://api.interviewready.io/api/utilities/resources/all"

export async function getResources(): Promise<Resource[]> {
    const response = await fetch(RESOURCE_API);
    if (!response.ok) {
        throw new Error("Failed to fetch resources");
    }

    const data = await response.json();
    return data;
}

