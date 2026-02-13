'use client'

import { useState, useEffect } from 'react'
import { classeService } from '@/services/classe.service'
import { studentService } from '@/services/student.service'
import { teacherService } from '@/services/teacher.service'

export interface DashboardStats {
  classesCount: number
  studentsCount: number
  teachersCount: number
  isLoading: boolean
}

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats>({
    classesCount: 0,
    studentsCount: 0,
    teachersCount: 0,
    isLoading: true,
  })

  useEffect(() => {
    let cancelled = false

    async function fetchStats() {
      try {
        const [classes, students, teachers] = await Promise.allSettled([
          classeService.getAll(),
          studentService.getAll(),
          teacherService.getAll(),
        ])

        if (cancelled) return

        setStats({
          classesCount: classes.status === 'fulfilled' ? classes.value.length : 0,
          studentsCount: students.status === 'fulfilled' ? students.value.length : 0,
          teachersCount: teachers.status === 'fulfilled' ? teachers.value.length : 0,
          isLoading: false,
        })
      } catch {
        if (!cancelled) {
          setStats((prev) => ({ ...prev, isLoading: false }))
        }
      }
    }

    fetchStats()
    return () => {
      cancelled = true
    }
  }, [])

  return stats
}
