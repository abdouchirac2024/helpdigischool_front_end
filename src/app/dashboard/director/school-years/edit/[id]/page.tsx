'use client'

import EditSchoolYearForm from '@/components/dashboard/director/pages/SchoolYearForm'
import { useParams } from 'next/navigation'

export default function EditSchoolYearPage() {
  const params = useParams()

  // ✅ Sécurisation ID
  const schoolYearId = params?.id && !isNaN(Number(params.id)) ? Number(params.id) : 1

  // ✅ Tenant par défaut
  const tenantId = 1

  return <EditSchoolYearForm schoolYearId={schoolYearId} tenantId={tenantId} />
}
