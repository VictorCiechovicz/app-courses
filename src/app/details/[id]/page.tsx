import { Course } from '@/types'
import CourseDetails from '@/components/CourseDetails'

interface DetailsCoursePageProps {
  params: {
    id: string
  }
}

export default async function DetailsCoursePage({
  params
}: DetailsCoursePageProps) {
  const { id } = await params
  const course = (await fetch(
    `http://localhost:8080/api-courses/get/${id}`
  ).then(res => res.json())) as Course

  return <CourseDetails course={course} />
}
