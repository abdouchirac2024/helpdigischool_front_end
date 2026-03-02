import EmployeeDetailsPage from '@/components/dashboard/director/pages/EmployeeDetailsPage'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EmployeeDetailPage({ params }: Props) {
  const resolvedParams = await params
  const id = Number(resolvedParams.id)

  return <EmployeeDetailsPage id={id} />
}
