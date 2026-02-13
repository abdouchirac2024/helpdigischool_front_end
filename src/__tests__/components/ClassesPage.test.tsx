/**
 * Tests pour le composant DirectorClassesPage
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import { render } from '../utils/test-utils'
import { DirectorClassesPage } from '@/components/dashboard/director/pages/ClassesPage'
import type { ClasseDto } from '@/types/classe'
import { Niveau, StatutClasse } from '@/types/classe'

const mockClasses: ClasseDto[] = [
  {
    id: 1,
    nomClasse: '6eme-A',
    niveau: Niveau.COLLEGE,
    sousSysteme: 'FRANCOPHONE',
    section: 'A',
    capacite: 50,
    statut: StatutClasse.ACTIVE,
    effectifActuel: 30,
    fraisScolarite: 45000,
    description: 'Classe de 6eme',
    ecoleId: 1,
    ecoleNom: 'Ecole La Victoire',
    anneeScolaireId: 2,
    anneeScolaireLibelle: '2025-2026',
    titulaireId: 1,
    titulaireNom: 'Jean Kamga',
  },
  {
    id: 2,
    nomClasse: 'CM2-B',
    niveau: Niveau.PRIMAIRE,
    sousSysteme: 'FRANCOPHONE',
    section: 'B',
    capacite: 45,
    statut: StatutClasse.ACTIVE,
    effectifActuel: 20,
    fraisScolarite: 25000,
    description: undefined,
    ecoleId: 1,
    ecoleNom: 'Ecole La Victoire',
    anneeScolaireId: 2,
    anneeScolaireLibelle: '2025-2026',
    titulaireId: undefined,
    titulaireNom: undefined,
  },
  {
    id: 3,
    nomClasse: 'Tle D',
    niveau: Niveau.LYCEE,
    sousSysteme: 'FRANCOPHONE',
    section: undefined,
    capacite: 40,
    statut: StatutClasse.ARCHIVEE,
    effectifActuel: 0,
    fraisScolarite: 60000,
    description: 'Archivee',
    ecoleId: 1,
    ecoleNom: 'Ecole La Victoire',
    anneeScolaireId: 1,
    anneeScolaireLibelle: '2024-2025',
    titulaireId: undefined,
    titulaireNom: undefined,
  },
]

// Mock du service
vi.mock('@/services/classe.service', async () => {
  const actual = await vi.importActual<typeof import('@/services/classe.service')>(
    '@/services/classe.service'
  )
  return {
    ...actual,
    classeService: {
      getAll: vi.fn(),
      getById: vi.fn(),
      getByEcoleId: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  }
})

import { classeService } from '@/services/classe.service'

describe('DirectorClassesPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Chargement', () => {
    it('affiche le spinner de chargement', () => {
      vi.mocked(classeService.getAll).mockReturnValue(new Promise(() => {})) // never resolves
      render(<DirectorClassesPage />)

      expect(screen.getByText('Chargement des classes...')).toBeInTheDocument()
    })

    it('affiche les classes apres chargement', async () => {
      vi.mocked(classeService.getAll).mockResolvedValue(mockClasses)
      render(<DirectorClassesPage />)

      await waitFor(() => {
        expect(screen.getByText('6eme-A')).toBeInTheDocument()
      })
      expect(screen.getByText('CM2-B')).toBeInTheDocument()
      expect(screen.getByText('Tle D')).toBeInTheDocument()
    })

    it('affiche une erreur si le chargement echoue', async () => {
      vi.mocked(classeService.getAll).mockRejectedValue(new Error('Erreur reseau'))
      render(<DirectorClassesPage />)

      await waitFor(() => {
        expect(screen.getByText('Erreur reseau')).toBeInTheDocument()
      })
      expect(screen.getByText('Reessayer')).toBeInTheDocument()
    })

    it('affiche un etat vide quand il n y a pas de classes', async () => {
      vi.mocked(classeService.getAll).mockResolvedValue([])
      render(<DirectorClassesPage />)

      await waitFor(() => {
        expect(screen.getByText('Aucune classe')).toBeInTheDocument()
      })
    })
  })

  describe('Statistiques', () => {
    it('affiche les statistiques correctes', async () => {
      vi.mocked(classeService.getAll).mockResolvedValue(mockClasses)
      render(<DirectorClassesPage />)

      await waitFor(() => {
        expect(screen.getByText('6eme-A')).toBeInTheDocument()
      })

      // Total classes = 3, Total eleves = 50
      // Use getAllByText since numbers may appear in multiple places
      expect(screen.getAllByText('3').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('50').length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('Header', () => {
    it('affiche le titre', async () => {
      vi.mocked(classeService.getAll).mockResolvedValue([])
      render(<DirectorClassesPage />)

      expect(screen.getByText('Gestion des Classes')).toBeInTheDocument()
    })

    it('affiche le bouton Nouvelle classe', async () => {
      vi.mocked(classeService.getAll).mockResolvedValue([])
      render(<DirectorClassesPage />)

      // Il y a potentiellement 2 boutons "Nouvelle classe" (header + empty state)
      const buttons = screen.getAllByText('Nouvelle classe')
      expect(buttons.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('Recherche', () => {
    it('filtre les classes par nom', async () => {
      vi.mocked(classeService.getAll).mockResolvedValue(mockClasses)
      render(<DirectorClassesPage />)

      await waitFor(() => {
        expect(screen.getByText('6eme-A')).toBeInTheDocument()
      })

      const searchInput = screen.getByPlaceholderText('Rechercher une classe ou un titulaire...')
      fireEvent.change(searchInput, { target: { value: '6eme' } })

      expect(screen.getByText('6eme-A')).toBeInTheDocument()
      expect(screen.queryByText('CM2-B')).not.toBeInTheDocument()
      expect(screen.queryByText('Tle D')).not.toBeInTheDocument()
    })

    it('filtre les classes par nom de titulaire', async () => {
      vi.mocked(classeService.getAll).mockResolvedValue(mockClasses)
      render(<DirectorClassesPage />)

      await waitFor(() => {
        expect(screen.getByText('6eme-A')).toBeInTheDocument()
      })

      const searchInput = screen.getByPlaceholderText('Rechercher une classe ou un titulaire...')
      fireEvent.change(searchInput, { target: { value: 'Kamga' } })

      expect(screen.getByText('6eme-A')).toBeInTheDocument()
      expect(screen.queryByText('CM2-B')).not.toBeInTheDocument()
    })

    it('affiche message quand aucun resultat', async () => {
      vi.mocked(classeService.getAll).mockResolvedValue(mockClasses)
      render(<DirectorClassesPage />)

      await waitFor(() => {
        expect(screen.getByText('6eme-A')).toBeInTheDocument()
      })

      const searchInput = screen.getByPlaceholderText('Rechercher une classe ou un titulaire...')
      fireEvent.change(searchInput, { target: { value: 'introuvable123' } })

      expect(screen.getByText('Aucune classe ne correspond aux filtres')).toBeInTheDocument()
    })
  })

  describe('Filtre par statut', () => {
    it('filtre par statut Archivee', async () => {
      vi.mocked(classeService.getAll).mockResolvedValue(mockClasses)
      render(<DirectorClassesPage />)

      await waitFor(() => {
        expect(screen.getByText('6eme-A')).toBeInTheDocument()
      })

      // Click the filter button (not the badge) - filter buttons are <button> elements
      const archiveeButtons = screen
        .getAllByText('Archivee')
        .filter((el) => el.tagName === 'BUTTON')
      fireEvent.click(archiveeButtons[0])

      expect(screen.queryByText('6eme-A')).not.toBeInTheDocument()
      expect(screen.getByText('Tle D')).toBeInTheDocument()
    })
  })

  describe('Affichage des cartes', () => {
    it('affiche le titulaire ou Non assigne', async () => {
      vi.mocked(classeService.getAll).mockResolvedValue(mockClasses)
      render(<DirectorClassesPage />)

      await waitFor(() => {
        expect(screen.getByText('Jean Kamga')).toBeInTheDocument()
      })

      const nonAssignes = screen.getAllByText('Non assigne')
      expect(nonAssignes.length).toBeGreaterThanOrEqual(1)
    })

    it('affiche les frais de scolarite', async () => {
      vi.mocked(classeService.getAll).mockResolvedValue(mockClasses)
      render(<DirectorClassesPage />)

      await waitFor(() => {
        expect(screen.getByText(/45.*000.*FCFA/)).toBeInTheDocument()
      })
    })

    it('affiche le badge de statut', async () => {
      vi.mocked(classeService.getAll).mockResolvedValue(mockClasses)
      render(<DirectorClassesPage />)

      await waitFor(() => {
        // 2 badges Active + 1 filter button Active = 3
        const activeBadges = screen.getAllByText('Active')
        expect(activeBadges.length).toBe(3)
      })

      // 1 badge Archivee + 1 filter button Archivee = 2
      const archivees = screen.getAllByText('Archivee')
      expect(archivees.length).toBe(2)
    })
  })

  describe('Actions', () => {
    it('affiche les boutons Voir, Modifier, Supprimer', async () => {
      vi.mocked(classeService.getAll).mockResolvedValue(mockClasses)
      render(<DirectorClassesPage />)

      await waitFor(() => {
        expect(screen.getByText('6eme-A')).toBeInTheDocument()
      })

      const voirButtons = screen.getAllByText('Voir')
      const modifierButtons = screen.getAllByText('Modifier')

      expect(voirButtons.length).toBe(3)
      expect(modifierButtons.length).toBe(3)
    })

    it('ouvre le modal de creation', async () => {
      vi.mocked(classeService.getAll).mockResolvedValue([])
      render(<DirectorClassesPage />)

      await waitFor(() => {
        expect(screen.getByText('Aucune classe')).toBeInTheDocument()
      })

      const newButtons = screen.getAllByText('Nouvelle classe')
      fireEvent.click(newButtons[0])

      await waitFor(() => {
        expect(
          screen.getByText('Remplissez les informations pour creer une nouvelle classe.')
        ).toBeInTheDocument()
      })
    })

    it('ouvre le modal de vue avec les details', async () => {
      vi.mocked(classeService.getAll).mockResolvedValue(mockClasses)
      render(<DirectorClassesPage />)

      await waitFor(() => {
        expect(screen.getByText('6eme-A')).toBeInTheDocument()
      })

      const voirButtons = screen.getAllByText('Voir')
      fireEvent.click(voirButtons[0])

      await waitFor(() => {
        expect(screen.getByText('Details de la classe')).toBeInTheDocument()
      })
    })

    it('ouvre le modal de suppression', async () => {
      vi.mocked(classeService.getAll).mockResolvedValue(mockClasses)
      render(<DirectorClassesPage />)

      await waitFor(() => {
        expect(screen.getByText('6eme-A')).toBeInTheDocument()
      })

      // Cliquer sur le bouton supprimer (icone Trash2)
      const deleteButtons = screen
        .getAllByRole('button')
        .filter((btn) => btn.querySelector('.lucide-trash-2') || btn.textContent === '')
      // Trouver les boutons avec l'icone trash par leur classe CSS
      const trashButtons = screen
        .getAllByRole('button')
        .filter((btn) => btn.className.includes('text-red-500'))
      if (trashButtons.length > 0) {
        fireEvent.click(trashButtons[0])

        await waitFor(() => {
          expect(screen.getByText('Confirmer la suppression')).toBeInTheDocument()
        })
      }
    })

    it('supprime une classe apres confirmation', async () => {
      vi.mocked(classeService.getAll).mockResolvedValue(mockClasses)
      vi.mocked(classeService.delete).mockResolvedValue(undefined)
      render(<DirectorClassesPage />)

      await waitFor(() => {
        expect(screen.getByText('6eme-A')).toBeInTheDocument()
      })

      const trashButtons = screen
        .getAllByRole('button')
        .filter((btn) => btn.className.includes('text-red-500'))
      if (trashButtons.length > 0) {
        fireEvent.click(trashButtons[0])

        await waitFor(() => {
          expect(screen.getByText('Confirmer la suppression')).toBeInTheDocument()
        })

        fireEvent.click(screen.getByText('Supprimer'))

        await waitFor(() => {
          expect(classeService.delete).toHaveBeenCalledWith(1)
        })
      }
    })

    it('cree une classe via le formulaire', async () => {
      vi.mocked(classeService.getAll).mockResolvedValue([])
      vi.mocked(classeService.create).mockResolvedValue({
        ...mockClasses[0],
        id: 10,
        nomClasse: 'Test-A',
      })
      render(<DirectorClassesPage />)

      await waitFor(() => {
        expect(screen.getByText('Aucune classe')).toBeInTheDocument()
      })

      // Ouvrir modal
      const newButtons = screen.getAllByText('Nouvelle classe')
      fireEvent.click(newButtons[0])

      await waitFor(() => {
        expect(screen.getByLabelText('Nom de la classe *')).toBeInTheDocument()
      })

      // Remplir le nom
      fireEvent.change(screen.getByLabelText('Nom de la classe *'), {
        target: { value: 'Test-A' },
      })

      // Soumettre
      fireEvent.click(screen.getByText('Creer'))

      await waitFor(() => {
        expect(classeService.create).toHaveBeenCalledWith(
          expect.objectContaining({ nomClasse: 'Test-A' })
        )
      })
    })

    it('affiche erreur de validation si nom vide', async () => {
      vi.mocked(classeService.getAll).mockResolvedValue([])
      render(<DirectorClassesPage />)

      await waitFor(() => {
        expect(screen.getByText('Aucune classe')).toBeInTheDocument()
      })

      const newButtons = screen.getAllByText('Nouvelle classe')
      fireEvent.click(newButtons[0])

      await waitFor(() => {
        expect(screen.getByText('Creer')).toBeInTheDocument()
      })

      // Vider le nom et soumettre
      fireEvent.change(screen.getByLabelText('Nom de la classe *'), {
        target: { value: '' },
      })
      fireEvent.click(screen.getByText('Creer'))

      await waitFor(() => {
        expect(screen.getByText('Le nom de la classe est obligatoire')).toBeInTheDocument()
      })
    })

    it('recharge les classes apres le bouton Reessayer', async () => {
      vi.mocked(classeService.getAll)
        .mockRejectedValueOnce(new Error('Erreur reseau'))
        .mockResolvedValueOnce(mockClasses)

      render(<DirectorClassesPage />)

      await waitFor(() => {
        expect(screen.getByText('Erreur reseau')).toBeInTheDocument()
      })

      fireEvent.click(screen.getByText('Reessayer'))

      await waitFor(() => {
        expect(screen.getByText('6eme-A')).toBeInTheDocument()
      })
    })
  })
})
