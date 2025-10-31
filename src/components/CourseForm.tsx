'use client'

import { Course } from '@/types'
import { useRouter } from 'next/navigation'
import { useState, FormEvent, ChangeEvent } from 'react'
import { toast } from 'react-toastify'

interface CourseFormData {
  name: string
  category: string
  teacher: string
  active: boolean
}

interface CourseFormProps {
  course?: Course
  isEdit?: boolean
}

export default function CourseForm({ course, isEdit }: CourseFormProps) {
  const [formData, setFormData] = useState<CourseFormData>({
    name: course?.name || '',
    category: course?.category || '',
    teacher: course?.teacher || '',
    active: course?.active || false
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/courses', {
        method: isEdit ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...formData, id: course?.id })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(
          errorData.error || `Erro ao cadastrar curso: ${response.status}`
        )
      }

      toast.success(
        `Curso "${formData.name}" ${
          isEdit ? 'editado' : 'cadastrado'
        } com sucesso!`,
        {
          position: 'top-right'
        }
      )

      resetForm()

      router.push('/')
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : `Erro ao ${
              isEdit ? 'editar' : 'cadastrar'
            } curso. Tente novamente.`,
        { position: 'top-right' }
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      teacher: '',
      active: false
    })
  }

  return (
    <div className="w-full max-w-md">
      <h1 className="text-5xl font-bold text-center mb-12 text-purple-600">
        Cursos
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nome"
            required
            disabled={isSubmitting}
            className="w-full px-6 py-4 bg-[#1a1a1a] border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Categoria"
            required
            disabled={isSubmitting}
            className="w-full px-6 py-4 bg-[#1a1a1a] border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div>
          <input
            type="text"
            name="teacher"
            value={formData.teacher}
            onChange={handleChange}
            placeholder="Professor(a)"
            required
            disabled={isSubmitting}
            className="w-full px-6 py-4 bg-[#1a1a1a] border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div>
          <label className="flex items-center px-6 py-4 bg-[#1a1a1a] border border-gray-800 rounded-lg cursor-pointer hover:border-purple-600 transition-colors">
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-5 h-5 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-600 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <span className="ml-3 text-gray-400">Ativo</span>
          </label>
        </div>

        <div className="flex justify-center pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-12 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting
              ? isEdit
                ? 'Editando...'
                : 'Cadastrando...'
              : isEdit
              ? 'Editar'
              : 'Cadastrar'}
          </button>
        </div>
      </form>
    </div>
  )
}
