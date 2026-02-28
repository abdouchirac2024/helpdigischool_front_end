'use client'

import {
  Users,
  GraduationCap,
  CreditCard,
  TrendingUp,
  Award,
  BookOpen,
  DollarSign,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const stats = [
  {
    title: 'Élèves inscrits',
    value: '342',
    subtitle: 'Tous les niveaux confondus',
    icon: Users,
    color: 'bg-blue-500',
    trend: '+12 ce mois',
  },
  {
    title: 'Paiements',
    value: '€80.9',
    subtitle: 'Revenus ce mois',
    icon: CreditCard,
    color: 'bg-green-500',
    trend: '+8.2%',
  },
  {
    title: 'Enseignants',
    value: '18',
    subtitle: 'Personnel enseignant',
    icon: GraduationCap,
    color: 'bg-orange-500',
    trend: 'Actifs',
  },
  {
    title: 'Taux de réussite',
    value: '94%',
    subtitle: 'Moyenne générale',
    icon: Award,
    color: 'bg-purple-500',
    trend: '+2.5%',
  },
]

const recentActivities = [
  {
    title: 'Bulletins',
    subtitle: 'Classe CM2',
    icon: BookOpen,
    color: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    badge: '12 générés',
  },
  {
    title: 'Paiements',
    subtitle: 'Frais de scolarité',
    icon: DollarSign,
    color: 'bg-green-100',
    iconColor: 'text-green-600',
    badge: '€25.0',
  },
  {
    title: 'Présence',
    subtitle: "Aujourd'hui",
    icon: Users,
    color: 'bg-blue-100',
    iconColor: 'text-blue-600',
    badge: '98%',
  },
]

export function DashboardContent() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-gray-600">Vue d'ensemble de votre école</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            Statistiques
          </Button>
          <Button className="gap-2 bg-primary hover:bg-primary-dark">Ajouter Élève</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="rounded-2xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg"
          >
            <div className="mb-4 flex items-start justify-between">
              <div
                className={`h-12 w-12 rounded-xl ${stat.color} flex items-center justify-center`}
              >
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <span className="rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-600">
                {stat.trend}
              </span>
            </div>
            <h3 className="mb-1 text-2xl font-bold text-gray-900">{stat.value}</h3>
            <p className="mb-1 text-sm font-medium text-gray-900">{stat.title}</p>
            <p className="text-xs text-gray-500">{stat.subtitle}</p>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {recentActivities.map((activity, index) => (
          <div
            key={index}
            className="rounded-2xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div
                className={`h-14 w-14 rounded-xl ${activity.color} flex items-center justify-center`}
              >
                <activity.icon className={`h-7 w-7 ${activity.iconColor}`} />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{activity.title}</h4>
                <p className="text-sm text-gray-500">{activity.subtitle}</p>
              </div>
            </div>
            <div className="mt-4 border-t border-gray-100 pt-4">
              <span className="text-lg font-bold text-primary">{activity.badge}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Actions rapides</h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Button variant="outline" className="h-auto flex-col gap-2 py-4">
            <Users className="h-6 w-6" />
            <span className="text-sm">Gérer Élèves</span>
          </Button>
          <Button variant="outline" className="h-auto flex-col gap-2 py-4">
            <BookOpen className="h-6 w-6" />
            <span className="text-sm">Saisir Notes</span>
          </Button>
          <Button variant="outline" className="h-auto flex-col gap-2 py-4">
            <Award className="h-6 w-6" />
            <span className="text-sm">Bulletins</span>
          </Button>
          <Button variant="outline" className="h-auto flex-col gap-2 py-4">
            <CreditCard className="h-6 w-6" />
            <span className="text-sm">Paiements</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
