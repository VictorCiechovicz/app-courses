import { NextResponse } from 'next/server'

const API_BASE_URL = 'http://localhost:8080'

interface RouteContext {
  params: Promise<{ id: string }>
}

export async function DELETE(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params

    const response = await fetch(`${API_BASE_URL}/api-courses/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      const error = await response.text()
      return NextResponse.json(
        { error: 'Erro ao excluir curso', details: error },
        { status: response.status }
      )
    }

    return NextResponse.json(
      { message: 'Curso excluído com sucesso' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erro na API:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
