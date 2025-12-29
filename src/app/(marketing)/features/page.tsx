import { Metadata } from 'next'
import FeaturesContent from './FeaturesContent'

export const metadata: Metadata = {
  title: 'Fonctionnalités - Help Digi School | Gestion Scolaire Complète',
  description: 'Découvrez toutes les fonctionnalités de Help Digi School : notes, bulletins PDF, paiements Mobile Money, notifications SMS et plus encore.',
}

export default function FeaturesPage() {
  return <FeaturesContent />
}
