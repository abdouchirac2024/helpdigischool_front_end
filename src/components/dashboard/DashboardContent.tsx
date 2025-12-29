'use client'

import { 
  Users, 
  GraduationCap, 
  CreditCard, 
  TrendingUp,
  Award,
  BookOpen,
  DollarSign
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const stats = [
  {
    title: 'Élèves inscrits',
    value: '342',
    subtitle: 'Tous les niveaux confondus',
    icon: Users,
    color: 'bg-blue-500',
    trend: '+12 ce mois'
  },
  {
    title: 'Paiements',
    value: '€80.9',
    subtitle: 'Revenus ce mois',
    icon: CreditCard,
    color: 'bg-green-500',
    trend: '+8.2%'
  },
  {
    title: 'Enseignants',
    value: '18',
    subtitle: 'Personnel enseignant',
    icon: GraduationCap,
    color: 'bg-orange-500',
    trend: 'Actifs'
  },
  {
    title: 'Taux de réussite',
    value: '94%',
    subtitle: 'Moyenne générale',
    icon: Award,
    color: 'bg-purple-500',
    trend: '+2.5%'
  },
]

const recentActivities = [
  {
    title: 'Bulletins',
    subtitle: 'Classe CM2',
    icon: BookOpen,
    color: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    badge: '12 générés'
  },
  {
    title: 'Paiements',
    subtitle: 'Frais de scolarité',
    icon: DollarSign,
    color: 'bg-green-100',
    iconColor: 'text-green-600',
    badge: '€25.0'
  },
  {
    title: 'Présence',
    subtitle: "Aujourd'hui",
    icon: Users,
    color: 'bg-blue-100',
    iconColor: 'text-blue-600',
    badge: '98%'
  },
]

export function DashboardContent() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Vue d'ensemble de votre école</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <TrendingUp className="w-4 h-4" />
            Statistiques
          </Button>
          <Button className="bg-[#2302B3] hover:bg-[#1a0285] gap-2">
            Ajouter Élève
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                {stat.trend}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-sm font-medium text-gray-900 mb-1">{stat.title}</p>
            <p className="text-xs text-gray-500">{stat.subtitle}</p>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {recentActivities.map((activity, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-xl ${activity.color} flex items-center justify-center`}>
                <activity.icon className={`w-7 h-7 ${activity.iconColor}`} />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{activity.title}</h4>
                <p className="text-sm text-gray-500">{activity.subtitle}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <span className="text-lg font-bold text-[#2302B3]">{activity.badge}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" className="h-auto py-4 flex-col gap-2">
            <Users className="w-6 h-6" />
            <span className="text-sm">Gérer Élèves</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex-col gap-2">
            <BookOpen className="w-6 h-6" />
            <span className="text-sm">Saisir Notes</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex-col gap-2">
            <Award className="w-6 h-6" />
            <span className="text-sm">Bulletins</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex-col gap-2">
            <CreditCard className="w-6 h-6" />
            <span className="text-sm">Paiements</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
