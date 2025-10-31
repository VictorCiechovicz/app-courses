'use client'

import { Course } from '@/types'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'

interface CourseDetailsProps {
  course: Course
}

export default function CourseDetails({ course }: CourseDetailsProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleEdit = () => {
    router.push(`/edit/${course.id}`)
  }

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja excluir este curso?')) {
      return
    }

    try {
      setIsDeleting(true)
      const response = await fetch(`/api/courses/${course.id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast.success('Curso excluído com sucesso', {
          position: 'top-right'
        })
        router.push('/')
      }
    } catch (error) {
      console.error('Erro ao excluir curso:', error)
      toast.error('Erro ao excluir curso', {
        position: 'top-right'
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-8">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-purple-500 mb-8 text-center">
          Cursos
        </h1>

        <div className="bg-zinc-800 rounded-lg overflow-hidden shadow-lg">
          <div className="bg-purple-500 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">{course.name}</h2>
          </div>

          <div className="px-6 py-6 space-y-4">
            <div className="text-white">
              <span className="text-gray-400">Curso: </span>
              <span>{course.name}</span>
            </div>

            <div className="text-white">
              <span className="text-gray-400">Categoria: </span>
              <span>{course.category}</span>
            </div>

            <div className="text-white">
              <span className="text-gray-400">Professor: </span>
              <span>{course.teacher}</span>
            </div>

            <div className="text-white">
              <span className="text-gray-400">Início: </span>
              <span>Desde 19/01/02</span>
            </div>
          </div>

          <div className="px-6 py-6 flex gap-4">
            <button
              onClick={handleEdit}
              className="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-3 rounded-md transition-colors"
            >
              Editar curso
            </button>

            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex-1 bg-red-700 hover:bg-red-800 text-white font-semibold px-6 py-3 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeleting ? 'Excluindo...' : 'Excluir curso'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
