'use client'

import { useState } from 'react'
import {
  BarChart3,
  TrendingUp,
  Users,
  Award,
  BookOpen,
  ChevronDown,
  Download,
  Plus,
  Search,
  Check,
  GraduationCap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SharedGradesPageProps {
  role: 'director' | 'teacher' | 'student' | 'parent'
  viewMode: 'manage' | 'view'
}

// ---------------------------------------------------------------------------
// Brand colour
// ---------------------------------------------------------------------------

const BRAND = '#2302B3'

// ---------------------------------------------------------------------------
// Header titles per role
// ---------------------------------------------------------------------------

const TITLES: Record<SharedGradesPageProps['role'], string> = {
  director: 'Notes & Bulletins',
  teacher: 'Saisie des notes',
  student: 'Mes Notes',
  parent: 'Notes & Résultats',
}

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const directorClasses = [
  {
    id: 1,
    name: '6ème A',
    average: 13.4,
    passRate: 82,
    students: 32,
    best: 'Mathématiques',
    worst: 'Anglais',
  },
  {
    id: 2,
    name: '6ème B',
    average: 12.1,
    passRate: 75,
    students: 30,
    best: 'Français',
    worst: 'Physique',
  },
  {
    id: 3,
    name: '5ème A',
    average: 14.2,
    passRate: 90,
    students: 28,
    best: 'SVT',
    worst: 'Mathématiques',
  },
  {
    id: 4,
    name: '5ème B',
    average: 11.8,
    passRate: 68,
    students: 31,
    best: 'Histoire-Géo',
    worst: 'Anglais',
  },
  {
    id: 5,
    name: '4ème A',
    average: 13.0,
    passRate: 79,
    students: 29,
    best: 'Français',
    worst: 'Physique',
  },
]

const teacherStudents = [
  { id: 1, name: 'Diallo Aminata', eval1: 14, eval2: 16, eval3: 13, exam: 15 },
  { id: 2, name: 'Koné Moussa', eval1: 11, eval2: 9, eval3: 12, exam: 10 },
  { id: 3, name: 'Traoré Fatou', eval1: 17, eval2: 18, eval3: 16, exam: 17 },
  { id: 4, name: 'Bamba Ibrahim', eval1: 8, eval2: 10, eval3: 9, exam: 11 },
  { id: 5, name: 'Coulibaly Awa', eval1: 15, eval2: 14, eval3: 15, exam: 16 },
  { id: 6, name: 'Touré Seydou', eval1: 12, eval2: 13, eval3: 11, exam: 12 },
]

const studentGrades = [
  { id: 1, subject: 'Mathématiques', coef: 4, eval1: 14, eval2: 15, exam: 16, average: 15.1 },
  { id: 2, subject: 'Français', coef: 4, eval1: 12, eval2: 13, exam: 11, average: 12.0 },
  { id: 3, subject: 'Anglais', coef: 2, eval1: 16, eval2: 17, exam: 15, average: 16.0 },
  { id: 4, subject: 'Physique-Chimie', coef: 3, eval1: 10, eval2: 11, exam: 13, average: 11.4 },
  { id: 5, subject: 'SVT', coef: 2, eval1: 15, eval2: 14, exam: 14, average: 14.3 },
  { id: 6, subject: 'Histoire-Géo', coef: 3, eval1: 13, eval2: 12, exam: 14, average: 13.0 },
  { id: 7, subject: 'EPS', coef: 1, eval1: 17, eval2: 16, exam: 18, average: 17.0 },
]

const parentChildren = [
  { id: 1, name: 'Diallo Aminata', class: '6ème A' },
  { id: 2, name: 'Diallo Moussa', class: '4ème B' },
]

const parentGrades: Record<number, typeof studentGrades> = {
  1: [
    { id: 1, subject: 'Mathématiques', coef: 4, eval1: 14, eval2: 16, exam: 15, average: 15.1 },
    { id: 2, subject: 'Français', coef: 4, eval1: 11, eval2: 12, exam: 13, average: 12.0 },
    { id: 3, subject: 'Anglais', coef: 2, eval1: 15, eval2: 14, exam: 16, average: 15.0 },
    { id: 4, subject: 'Physique-Chimie', coef: 3, eval1: 9, eval2: 11, exam: 10, average: 10.0 },
    { id: 5, subject: 'SVT', coef: 2, eval1: 16, eval2: 15, exam: 14, average: 15.0 },
  ],
  2: [
    { id: 1, subject: 'Mathématiques', coef: 4, eval1: 10, eval2: 11, exam: 12, average: 11.0 },
    { id: 2, subject: 'Français', coef: 4, eval1: 14, eval2: 13, exam: 15, average: 14.0 },
    { id: 3, subject: 'Anglais', coef: 2, eval1: 12, eval2: 13, exam: 11, average: 12.0 },
    { id: 4, subject: 'Physique-Chimie', coef: 3, eval1: 13, eval2: 14, exam: 12, average: 13.0 },
    { id: 5, subject: 'SVT', coef: 2, eval1: 11, eval2: 12, exam: 13, average: 12.0 },
  ],
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function avg(nums: number[]) {
  return (nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(1)
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: typeof BarChart3
  label: string
  value: string | number
  sub?: string
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${BRAND}15` }}
        >
          <Icon className="h-5 w-5" style={{ color: BRAND }} />
        </div>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-xl font-bold text-gray-900">{value}</p>
          {sub && <p className="text-xs text-gray-400">{sub}</p>}
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Sub-views
// ---------------------------------------------------------------------------

function DirectorView() {
  const globalAvg = avg(directorClasses.map((c) => c.average))
  const globalPass = Math.round(
    directorClasses.reduce((a, c) => a + c.passRate, 0) / directorClasses.length
  )
  const totalStudents = directorClasses.reduce((a, c) => a + c.students, 0)

  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={BarChart3} label="Moyenne générale" value={globalAvg} sub="/20" />
        <StatCard icon={TrendingUp} label="Taux de réussite" value={`${globalPass}%`} />
        <StatCard icon={Users} label="Total élèves" value={totalStudents} />
        <StatCard icon={Award} label="Meilleure classe" value="5ème A" sub="14.2 de moyenne" />
      </div>

      {/* Table */}
      <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Résultats par classe</h2>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: BRAND }}
          >
            <Download className="h-4 w-4" />
            Exporter
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-6 py-3">Classe</th>
                <th className="px-6 py-3">Effectif</th>
                <th className="px-6 py-3">Moyenne</th>
                <th className="px-6 py-3">Taux de réussite</th>
                <th className="px-6 py-3">Meilleure matière</th>
                <th className="px-6 py-3">Matière la plus faible</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {directorClasses.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{c.name}</td>
                  <td className="px-6 py-4 text-gray-600">{c.students}</td>
                  <td className="px-6 py-4">
                    <span
                      className="inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold"
                      style={{
                        backgroundColor: c.average >= 12 ? '#DEF7EC' : '#FDE8E8',
                        color: c.average >= 12 ? '#03543F' : '#9B1C1C',
                      }}
                    >
                      {c.average.toFixed(1)}/20
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{c.passRate}%</td>
                  <td className="px-6 py-4 text-gray-600">{c.best}</td>
                  <td className="px-6 py-4 text-gray-600">{c.worst}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

function TeacherView() {
  const [selectedClass, setSelectedClass] = useState('6ème A')
  const classAvg = avg(teacherStudents.map((s) => (s.eval1 + s.eval2 + s.eval3 + s.exam) / 4))
  const above12 = teacherStudents.filter(
    (s) => (s.eval1 + s.eval2 + s.eval3 + s.exam) / 4 >= 12
  ).length

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-4 pr-10 text-sm font-medium text-gray-700 focus:border-transparent focus:outline-none focus:ring-2"
            style={{ focusRingColor: BRAND } as React.CSSProperties}
          >
            <option>6ème A</option>
            <option>6ème B</option>
            <option>5ème A</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
        <div className="relative">
          <select className="appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-4 pr-10 text-sm font-medium text-gray-700">
            <option>Trimestre 1</option>
            <option>Trimestre 2</option>
            <option>Trimestre 3</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Élèves" value={teacherStudents.length} sub={selectedClass} />
        <StatCard icon={BarChart3} label="Moyenne de classe" value={classAvg} sub="/20" />
        <StatCard
          icon={TrendingUp}
          label="Au-dessus de 12"
          value={above12}
          sub={`/${teacherStudents.length}`}
        />
        <StatCard icon={Award} label="Meilleur élève" value="Traoré F." sub="17.0 de moyenne" />
      </div>

      {/* Grade entry table */}
      <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Saisie des notes — {selectedClass}
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Plus className="h-4 w-4" />
              Ajouter évaluation
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: BRAND }}
            >
              <Check className="h-4 w-4" />
              Enregistrer
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-6 py-3">#</th>
                <th className="px-6 py-3">Élève</th>
                <th className="px-6 py-3">Éval 1</th>
                <th className="px-6 py-3">Éval 2</th>
                <th className="px-6 py-3">Éval 3</th>
                <th className="px-6 py-3">Examen</th>
                <th className="px-6 py-3">Moyenne</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {teacherStudents.map((s, i) => {
                const mean = (s.eval1 + s.eval2 + s.eval3 + s.exam) / 4
                return (
                  <tr key={s.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3 text-gray-400">{i + 1}</td>
                    <td className="px-6 py-3 font-medium text-gray-900">{s.name}</td>
                    <td className="px-6 py-3">
                      <input
                        type="number"
                        defaultValue={s.eval1}
                        min={0}
                        max={20}
                        className="w-16 rounded border border-gray-300 px-2 py-1 text-center text-sm focus:outline-none focus:ring-2"
                        style={{ focusRingColor: BRAND } as React.CSSProperties}
                      />
                    </td>
                    <td className="px-6 py-3">
                      <input
                        type="number"
                        defaultValue={s.eval2}
                        min={0}
                        max={20}
                        className="w-16 rounded border border-gray-300 px-2 py-1 text-center text-sm focus:outline-none focus:ring-2"
                      />
                    </td>
                    <td className="px-6 py-3">
                      <input
                        type="number"
                        defaultValue={s.eval3}
                        min={0}
                        max={20}
                        className="w-16 rounded border border-gray-300 px-2 py-1 text-center text-sm focus:outline-none focus:ring-2"
                      />
                    </td>
                    <td className="px-6 py-3">
                      <input
                        type="number"
                        defaultValue={s.exam}
                        min={0}
                        max={20}
                        className="w-16 rounded border border-gray-300 px-2 py-1 text-center text-sm focus:outline-none focus:ring-2"
                      />
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className="inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold"
                        style={{
                          backgroundColor: mean >= 12 ? '#DEF7EC' : '#FDE8E8',
                          color: mean >= 12 ? '#03543F' : '#9B1C1C',
                        }}
                      >
                        {mean.toFixed(1)}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

function StudentView() {
  const generalAvg = (
    studentGrades.reduce((a, g) => a + g.average * g.coef, 0) /
    studentGrades.reduce((a, g) => a + g.coef, 0)
  ).toFixed(2)
  const bestSubject = studentGrades.reduce((best, g) => (g.average > best.average ? g : best))
  const worstSubject = studentGrades.reduce((worst, g) => (g.average < worst.average ? g : worst))

  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={BarChart3} label="Moyenne générale" value={generalAvg} sub="/20" />
        <StatCard
          icon={TrendingUp}
          label="Meilleure matière"
          value={bestSubject.subject}
          sub={`${bestSubject.average}/20`}
        />
        <StatCard
          icon={BookOpen}
          label="Matière la plus faible"
          value={worstSubject.subject}
          sub={`${worstSubject.average}/20`}
        />
        <StatCard icon={Award} label="Rang" value="5ème" sub="sur 32 élèves" />
      </div>

      {/* Grades table */}
      <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Détail des notes — Trimestre 1</h2>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: BRAND }}
          >
            <Download className="h-4 w-4" />
            Télécharger le bulletin
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-6 py-3">Matière</th>
                <th className="px-6 py-3">Coef</th>
                <th className="px-6 py-3">Éval 1</th>
                <th className="px-6 py-3">Éval 2</th>
                <th className="px-6 py-3">Examen</th>
                <th className="px-6 py-3">Moyenne</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {studentGrades.map((g) => (
                <tr key={g.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{g.subject}</td>
                  <td className="px-6 py-4 text-gray-600">{g.coef}</td>
                  <td className="px-6 py-4 text-gray-600">{g.eval1}</td>
                  <td className="px-6 py-4 text-gray-600">{g.eval2}</td>
                  <td className="px-6 py-4 text-gray-600">{g.exam}</td>
                  <td className="px-6 py-4">
                    <span
                      className="inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold"
                      style={{
                        backgroundColor: g.average >= 12 ? '#DEF7EC' : '#FDE8E8',
                        color: g.average >= 12 ? '#03543F' : '#9B1C1C',
                      }}
                    >
                      {g.average.toFixed(1)}/20
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t-2 border-gray-200 bg-gray-50">
              <tr>
                <td className="px-6 py-3 font-bold text-gray-900" colSpan={5}>
                  Moyenne générale pondérée
                </td>
                <td className="px-6 py-3">
                  <span
                    className="inline-flex rounded-full px-2.5 py-0.5 text-sm font-bold"
                    style={{ backgroundColor: `${BRAND}15`, color: BRAND }}
                  >
                    {generalAvg}/20
                  </span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  )
}

function ParentView() {
  const [selectedChild, setSelectedChild] = useState(parentChildren[0].id)
  const child = parentChildren.find((c) => c.id === selectedChild)!
  const grades = parentGrades[selectedChild] ?? []
  const generalAvg = grades.length
    ? (
        grades.reduce((a, g) => a + g.average * g.coef, 0) / grades.reduce((a, g) => a + g.coef, 0)
      ).toFixed(2)
    : '—'

  return (
    <>
      {/* Child selector */}
      <div className="flex items-center gap-3">
        {parentChildren.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setSelectedChild(c.id)}
            className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
              c.id === selectedChild
                ? 'border-transparent text-white'
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
            }`}
            style={c.id === selectedChild ? { backgroundColor: BRAND } : undefined}
          >
            <GraduationCap className="h-4 w-4" />
            {c.name} — {c.class}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={BarChart3} label="Moyenne générale" value={generalAvg} sub="/20" />
        <StatCard icon={GraduationCap} label="Classe" value={child.class} />
        <StatCard icon={BookOpen} label="Matières" value={grades.length} />
        <StatCard icon={TrendingUp} label="Trimestre" value="T1" sub="En cours" />
      </div>

      {/* Grades table */}
      <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Notes de {child.name}</h2>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: BRAND }}
          >
            <Download className="h-4 w-4" />
            Télécharger le bulletin
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-6 py-3">Matière</th>
                <th className="px-6 py-3">Coef</th>
                <th className="px-6 py-3">Éval 1</th>
                <th className="px-6 py-3">Éval 2</th>
                <th className="px-6 py-3">Examen</th>
                <th className="px-6 py-3">Moyenne</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {grades.map((g) => (
                <tr key={g.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{g.subject}</td>
                  <td className="px-6 py-4 text-gray-600">{g.coef}</td>
                  <td className="px-6 py-4 text-gray-600">{g.eval1}</td>
                  <td className="px-6 py-4 text-gray-600">{g.eval2}</td>
                  <td className="px-6 py-4 text-gray-600">{g.exam}</td>
                  <td className="px-6 py-4">
                    <span
                      className="inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold"
                      style={{
                        backgroundColor: g.average >= 12 ? '#DEF7EC' : '#FDE8E8',
                        color: g.average >= 12 ? '#03543F' : '#9B1C1C',
                      }}
                    >
                      {g.average.toFixed(1)}/20
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t-2 border-gray-200 bg-gray-50">
              <tr>
                <td className="px-6 py-3 font-bold text-gray-900" colSpan={5}>
                  Moyenne générale pondérée
                </td>
                <td className="px-6 py-3">
                  <span
                    className="inline-flex rounded-full px-2.5 py-0.5 text-sm font-bold"
                    style={{ backgroundColor: `${BRAND}15`, color: BRAND }}
                  >
                    {generalAvg}/20
                  </span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  )
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function SharedGradesPage({ role, viewMode }: SharedGradesPageProps) {
  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">{TITLES[role]}</h1>
        {viewMode === 'manage' && (
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm text-gray-700 focus:outline-none focus:ring-2"
              style={{ focusRingColor: BRAND } as React.CSSProperties}
            />
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex-1 space-y-0 overflow-y-auto p-6">
        {role === 'director' && <DirectorView />}
        {role === 'teacher' && <TeacherView />}
        {role === 'student' && <StudentView />}
        {role === 'parent' && <ParentView />}
      </div>
    </div>
  )
}
