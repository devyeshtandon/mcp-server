import { CourseResponse, CoursesWithStatsResponse } from "../types/api/courses.js"

export async function getCourses(): Promise<CourseResponse[]> {
    const API = "https://api.interviewready.io/api/v1/courses"

    const response = await fetch(API)
    if (!response.ok) {
        throw new Error("Failed to fetch courses")
    }

    const data: CoursesWithStatsResponse = await response.json()
    const courses = data.courses
    return courses
}
