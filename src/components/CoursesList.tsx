'use client'

import { Course } from '@/types'
import { useRouter } from 'next/navigation'

interface CourseProps {
  courses: Course[]
}

export default function CoursesList({ courses }: CourseProps) {
  const router = useRouter()
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-8">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-purple-500 mb-8 text-center">
          Cursos
        </h1>

        <div className="mb-6 overflow-hidden rounded-lg">
          <table className="w-full">
            <thead>
              <tr className="bg-purple-500">
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                  Curso
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                  Categoria
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                  Professor(a)
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                  Ativo
                </th>
              </tr>
            </thead>
            <tbody>
              {courses.length > 0 ? (
                courses.map(course => (
                  <tr
                    key={course.id}
                    className="bg-zinc-800 border-b border-zinc-700 last:border-b-0 cursor-pointer hover:bg-zinc-700 transition-colors"
                    onClick={() => router.push(`/details/${course.id}`)}
                  >
                    <td className="px-6 py-4 text-sm text-white">
                      {course.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-white">
                      {course.category}
                    </td>
                    <td className="px-6 py-4 text-sm text-white">
                      {course.teacher}
                    </td>
                    <td className="px-6 py-4 text-sm text-white">
                      {course.active ? 'Sim' : 'Não'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-sm text-white">
                    Nenhum curso encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center">
          <button
            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-8 py-3 rounded-md transition-colors cursor-pointer"
            onClick={() => router.push('/create')}
          >
            Novo curso
          </button>
        </div>
      </div>
    </div>
  )
}
