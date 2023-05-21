import { notFound } from 'next/navigation'
import { categories } from './categories'

export function getCategoryFromParams(params: { categoryId: string }) {
  const category = categories.find(category => category.id === params.categoryId)

  if (!category) notFound()

  return category
}
