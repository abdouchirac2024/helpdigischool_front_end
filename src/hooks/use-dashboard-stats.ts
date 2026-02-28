'use client'

import { useState, useEffect, useCallback } from 'react'
import { apiClient } from '@/lib/api/client'
import { API_ENDPOINTS } from '@/lib/api/config'
import type { UserStats } from '@/types/models/user'

interface SchoolStatsResponse {
  total: number
  enAttente: number
  validees: number
  rejetees: number
  suspendues: number
}

export interface DashboardStats {
  classesCount: number
  studentsCount: number
  teachersCount: number
  schoolsCount: number
  usersCount: number
  schoolStats: SchoolStatsResponse | null
  userStats: UserStats | null
  classes: Array<{ nomClasse: string; effectifActuel?: number; [key: string]: unknown }>
  isLoading: boolean
  refresh: () => Promise<void>
}

type DashboardRole = 'admin' | 'director' | 'teacher' | 'parent' | 'student' | 'secretary'

export function useDashboardStats(role?: DashboardRole) {
  const [stats, setStats] = useState<Omit<DashboardStats, 'refresh'>>({
    classesCount: 0,
    studentsCount: 0,
    teachersCount: 0,
    schoolsCount: 0,
    usersCount: 0,
    schoolStats: null,
    userStats: null,
    classes: [],
    isLoading: true,
  })

  const fetchStats = useCallback(async () => {
    // Roles that don't need any stats
    if (role === 'teacher' || role === 'parent' || role === 'student' || role === 'secretary') {
      setStats((prev) => ({ ...prev, isLoading: false }))
      return
    }

    try {
      if (role === 'admin') {
        // Admin only needs school stats and user stats
        const [schoolStats, userStats] = await Promise.allSettled([
          apiClient.get<SchoolStatsResponse>(API_ENDPOINTS.schools.stats),
          apiClient.get<UserStats>(API_ENDPOINTS.users.stats),
        ])

        setStats({
          classesCount: 0,
          studentsCount: 0,
          teachersCount: 0,
          schoolsCount: schoolStats.status === 'fulfilled' ? schoolStats.value.total : 0,
          usersCount: userStats.status === 'fulfilled' ? userStats.value.total : 0,
          schoolStats: schoolStats.status === 'fulfilled' ? schoolStats.value : null,
          userStats: userStats.status === 'fulfilled' ? userStats.value : null,
          classes: [],
          isLoading: false,
        })
      } else if (role === 'director') {
        // Director needs classes, students count, teachers count
        const [classesRes, studentsCount, teachersCount] = await Promise.allSettled([
          apiClient.get<Array<{ nomClasse: string; effectifActuel?: number }>>(
            API_ENDPOINTS.classes.base
          ),
          apiClient.get<number>(API_ENDPOINTS.students.count),
          apiClient.get<number>(API_ENDPOINTS.teachers.count),
        ])

        const classes = classesRes.status === 'fulfilled' ? classesRes.value : []
        const sCount = studentsCount.status === 'fulfilled' ? studentsCount.value : 0
        const tCount = teachersCount.status === 'fulfilled' ? teachersCount.value : 0

        setStats({
          classesCount: classes.length,
          studentsCount: sCount,
          teachersCount: tCount,
          schoolsCount: 0,
          usersCount: 0,
          schoolStats: null,
          userStats: null,
          classes,
          isLoading: false,
        })
      } else {
        // No role specified - legacy fallback: fetch everything
        const [schoolStats, userStats] = await Promise.allSettled([
          apiClient.get<SchoolStatsResponse>(API_ENDPOINTS.schools.stats),
          apiClient.get<UserStats>(API_ENDPOINTS.users.stats),
        ])

        setStats({
          classesCount: 0,
          studentsCount: 0,
          teachersCount: 0,
          schoolsCount: schoolStats.status === 'fulfilled' ? schoolStats.value.total : 0,
          usersCount: userStats.status === 'fulfilled' ? userStats.value.total : 0,
          schoolStats: schoolStats.status === 'fulfilled' ? schoolStats.value : null,
          userStats: userStats.status === 'fulfilled' ? userStats.value : null,
          classes: [],
          isLoading: false,
        })
      }
    } catch {
      setStats((prev) => ({ ...prev, isLoading: false }))
    }
  }, [role])

  useEffect(() => {
    let cancelled = false

    async function doFetch() {
      await fetchStats()
      if (cancelled) return
    }

    doFetch()
    return () => {
      cancelled = true
    }
  }, [fetchStats])

  return { ...stats, refresh: fetchStats }
}
