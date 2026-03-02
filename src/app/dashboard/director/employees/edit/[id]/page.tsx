import EmployeeEditForm from '@/components/dashboard/director/pages/EmployeeEditForm'

export default async function EditEmployeePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const numericId = Number(id)

  return <EmployeeEditForm id={numericId} />
}
