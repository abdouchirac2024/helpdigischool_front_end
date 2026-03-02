import DetailSchoolYearForm from '@/components/dashboard/director/pages/DetailSchoolYearForm'

export default async function SchoolYearDetailPage({ params }: any) {
  const { id } = await params
  return <DetailSchoolYearForm id={id} />
}
