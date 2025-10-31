import CourseForm from '@/components/CourseForm'
import { Course } from '@/types'

interface EditCoursePageProps {
  params: {
    id: string
  }
}

export default async function EditCoursePage({ params }: EditCoursePageProps) {
  const { id } = await params
  const course = (await fetch(
    `http://localhost:8080/api-courses/get/${id}`
  ).then(res => res.json())) as Course

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <CourseForm course={course} isEdit />
    </div>
  )
}
