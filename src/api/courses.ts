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

export async function getCourseById(courseId: number): Promise<CourseResponse> {
    const response = await fetch(`https://api.interviewready.io/api/v1/courses/${courseId}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch course with id: ${courseId}`);
    }
    const data = await response.json();
    return data;
}