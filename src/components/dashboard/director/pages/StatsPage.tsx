'use client'

import { useState } from 'react'
import {
  Users,
  TrendingUp,
  TrendingDown,
  Download,
  Award,
  UserCheck,
  Target,
  ArrowUpRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const monthlyStats = [
  { month: 'Sept', students: 320, attendance: 92, average: 13.5 },
  { month: 'Oct', students: 335, attendance: 94, average: 14.0 },
  { month: 'Nov', students: 340, attendance: 93, average: 14.2 },
  { month: 'Déc', students: 342, attendance: 91, average: 14.5 },
  { month: 'Jan', students: 342, attendance: 94, average: 14.8 },
]

const subjectPerformance = [
  { subject: 'Mathématiques', average: 14.2, students: 342, trend: 'up', change: '+0.5' },
  { subject: 'Français', average: 15.1, students: 342, trend: 'up', change: '+0.3' },
  { subject: 'Anglais', average: 14.8, students: 342, trend: 'up', change: '+0.8' },
  { subject: 'Physique', average: 13.5, students: 285, trend: 'down', change: '-0.2' },
  { subject: 'SVT', average: 14.0, students: 285, trend: 'up', change: '+0.4' },
  { subject: 'Histoire-Géo', average: 13.8, students: 342, trend: 'down', change: '-0.1' },
]

const topStudents = [
  { rank: 1, name: 'Sophie Kamga', class: '6ème A', average: 18.2 },
  { rank: 2, name: 'Sarah Biya', class: '6ème A', average: 17.8 },
  { rank: 3, name: 'Amina Nkolo', class: '6ème A', average: 17.5 },
  { rank: 4, name: 'Paul Mbarga', class: '5ème B', average: 17.2 },
  { rank: 5, name: 'Fatima Sow', class: '5ème A', average: 16.9 },
]

export function DirectorStatsPage() {
  const [period, setPeriod] = useState('trimester')

  const maxAverage = Math.max(...monthlyStats.map((s) => s.average))

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Statistiques</h1>
          <p className="mt-1 text-gray-600">Analyse des performances de l'établissement</p>
        </div>
        <div className="flex gap-3">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Ce mois</SelectItem>
              <SelectItem value="trimester">Ce trimestre</SelectItem>
              <SelectItem value="year">Cette année</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-gradient-to-br from-[#2302B3] to-[#4318FF] p-5 text-white">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div className="flex items-center gap-1 text-green-300">
              <ArrowUpRight className="h-4 w-4" />
              <span className="text-sm font-semibold">+6.8%</span>
            </div>
          </div>
          <p className="text-sm text-white/80">Total élèves</p>
          <p className="text-3xl font-bold">342</p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
              <Award className="h-6 w-6 text-green-600" />
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <ArrowUpRight className="h-4 w-4" />
              <span className="text-sm font-semibold">+0.3</span>
            </div>
          </div>
          <p className="text-sm text-gray-500">Moyenne générale</p>
          <p className="text-3xl font-bold text-gray-900">14.8/20</p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
              <UserCheck className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <ArrowUpRight className="h-4 w-4" />
              <span className="text-sm font-semibold">+2%</span>
            </div>
          </div>
          <p className="text-sm text-gray-500">Taux de présence</p>
          <p className="text-3xl font-bold text-gray-900">94%</p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50">
              <Target className="h-6 w-6 text-purple-600" />
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <ArrowUpRight className="h-4 w-4" />
              <span className="text-sm font-semibold">+5%</span>
            </div>
          </div>
          <p className="text-sm text-gray-500">Taux de réussite</p>
          <p className="text-3xl font-bold text-gray-900">87%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Evolution Chart */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h3 className="mb-6 text-lg font-semibold text-gray-900">Évolution des moyennes</h3>
          <div className="flex h-64 items-end gap-4">
            {monthlyStats.map((stat, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="flex w-full flex-col items-center gap-1"
                  style={{ height: '200px' }}
                >
                  <span className="text-sm font-bold text-gray-900">{stat.average}</span>
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-[#2302B3] to-[#4318FF] transition-all"
                    style={{ height: `${(stat.average / maxAverage) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-gray-500">{stat.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Subject Performance */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h3 className="mb-6 text-lg font-semibold text-gray-900">Performance par matière</h3>
          <div className="space-y-4">
            {subjectPerformance.map((subject, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-28 text-sm font-medium text-gray-700">{subject.subject}</div>
                <div className="flex-1">
                  <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#2302B3] to-[#4318FF]"
                      style={{ width: `${(subject.average / 20) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="w-16 text-right font-bold text-gray-900">{subject.average}</div>
                <div
                  className={`flex w-16 items-center gap-1 ${subject.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}
                >
                  {subject.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  <span className="text-sm font-semibold">{subject.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Top Students */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
          <div className="border-b border-gray-100 p-4">
            <h3 className="font-semibold text-gray-900">Meilleurs élèves</h3>
          </div>
          <div className="divide-y divide-gray-50">
            {topStudents.map((student) => (
              <div
                key={student.rank}
                className="flex items-center justify-between p-4 hover:bg-gray-50"
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                      student.rank <= 3
                        ? 'bg-gradient-to-br from-[#2302B3] to-[#4318FF] text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {student.rank}
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900">{student.name}</p>
                    <p className="text-sm text-gray-500">{student.class}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#2302B3]">{student.average}/20</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Class Ranking */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
          <div className="border-b border-gray-100 p-4">
            <h3 className="font-semibold text-gray-900">Classement des classes</h3>
          </div>
          <div className="divide-y divide-gray-50">
            {[
              { rank: 1, class: '3ème A', average: 15.5, students: 30 },
              { rank: 2, class: '6ème B', average: 15.2, students: 30 },
              { rank: 3, class: '3ème B', average: 14.8, students: 28 },
              { rank: 4, class: '6ème A', average: 14.8, students: 32 },
              { rank: 5, class: '5ème B', average: 14.5, students: 31 },
            ].map((cls) => (
              <div
                key={cls.rank}
                className="flex items-center justify-between p-4 hover:bg-gray-50"
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                      cls.rank <= 3
                        ? 'bg-gradient-to-br from-[#2302B3] to-[#4318FF] text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {cls.rank}
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900">{cls.class}</p>
                    <p className="text-sm text-gray-500">{cls.students} élèves</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#2302B3]">{cls.average}/20</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
