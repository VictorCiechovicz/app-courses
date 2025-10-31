import CoursesList from '@/components/CoursesList'
import { Course } from '@/types'

export default async function Home() {
  const courses = (await fetch('http://localhost:8080/api-courses/get').then(
    res => res.json()
  )) as Course[]

  return <CoursesList courses={courses} />
}
