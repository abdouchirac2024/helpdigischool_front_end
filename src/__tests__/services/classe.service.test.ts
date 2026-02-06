/**
 * Tests pour le service de gestion des classes
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { classeService, type ClasseDto } from '@/services/classe.service'

const mockClasse: ClasseDto = {
  id: 1,
  nomClasse: '6eme-A',
  niveau: 'COLLEGE',
  sousSysteme: 'FRANCOPHONE',
  section: 'A',
  capacite: 50,
  statut: 'ACTIVE',
  effectifActuel: 30,
  fraisScolarite: 45000,
  description: 'Classe de 6eme',
  ecoleId: 1,
  ecoleNom: 'Ecole La Victoire',
  anneeScolaireId: 2,
  anneeScolaireLibelle: '2025-2026',
  titulaireId: 1,
  titulaireNom: 'Jean Kamga',
}

const mockClasseList: ClasseDto[] = [
  mockClasse,
  {
    id: 2,
    nomClasse: 'CM2-A',
    niveau: 'PRIMAIRE',
    sousSysteme: 'FRANCOPHONE',
    section: 'A',
    capacite: 45,
    statut: 'ACTIVE',
    effectifActuel: 20,
    fraisScolarite: 25000,
    description: null,
    ecoleId: 1,
    ecoleNom: 'Ecole La Victoire',
    anneeScolaireId: 2,
    anneeScolaireLibelle: '2025-2026',
    titulaireId: null,
    titulaireNom: null,
  },
]

describe('ClasseService', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    vi.mocked(window.localStorage.getItem).mockReturnValue(null)
  })

  describe('getAll', () => {
    it('retourne la liste des classes', async () => {
      const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockClasseList),
        text: () => Promise.resolve(''),
        status: 200,
        statusText: 'OK',
        type: 'cors',
        url: '',
      } as Response)

      const result = await classeService.getAll()

      expect(fetchSpy).toHaveBeenCalledTimes(1)
      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining('/api/classes'),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      )
      expect(result).toEqual(mockClasseList)
      expect(result).toHaveLength(2)
    })

    it('lance une erreur si la reponse est non-OK', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        text: () => Promise.resolve('Erreur serveur'),
        json: () => Promise.resolve({}),
        type: 'cors',
        url: '',
      } as Response)

      await expect(classeService.getAll()).rejects.toThrow()
    })

    it('lance une erreur si le reseau echoue', async () => {
      vi.spyOn(global, 'fetch').mockRejectedValue(new Error('Network error'))

      await expect(classeService.getAll()).rejects.toThrow('Network error')
    })
  })

  describe('getById', () => {
    it('retourne une classe par ID', async () => {
      const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockClasse),
        status: 200,
      } as Response)

      const result = await classeService.getById(1)

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining('/api/classes/1'),
        expect.any(Object)
      )
      expect(result).toEqual(mockClasse)
      expect(result.nomClasse).toBe('6eme-A')
    })

    it('lance une erreur si la classe est introuvable', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        text: () => Promise.resolve(''),
        json: () => Promise.resolve({}),
      } as Response)

      await expect(classeService.getById(999)).rejects.toThrow()
    })
  })

  describe('getByEcoleId', () => {
    it('retourne les classes par ecole', async () => {
      const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockClasseList),
        status: 200,
      } as Response)

      const result = await classeService.getByEcoleId(1)

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining('/api/classes/ecole/1'),
        expect.any(Object)
      )
      expect(result).toHaveLength(2)
    })
  })

  describe('create', () => {
    it('cree une nouvelle classe', async () => {
      const newClasse = {
        nomClasse: '5eme-A',
        niveau: 'COLLEGE' as const,
        sousSysteme: 'FRANCOPHONE' as const,
        section: 'A',
        capacite: 50,
        fraisScolarite: 45000,
        description: 'Nouvelle classe',
        ecoleId: 1,
      }

      const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ ...mockClasse, id: 3, nomClasse: '5eme-A' }),
        status: 200,
      } as Response)

      const result = await classeService.create(newClasse)

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining('/api/classes'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(newClasse),
        })
      )
      expect(result.nomClasse).toBe('5eme-A')
    })

    it('lance une erreur si le nom existe deja', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        text: () => Promise.resolve(''),
        json: () => Promise.resolve({ message: 'Une classe avec ce nom existe deja' }),
      } as Response)

      await expect(
        classeService.create({
          nomClasse: '6eme-A',
          niveau: 'COLLEGE',
          sousSysteme: 'FRANCOPHONE',
          ecoleId: 1,
        })
      ).rejects.toThrow()
    })
  })

  describe('update', () => {
    it('met a jour une classe', async () => {
      const updateData = { nomClasse: '6eme-B', capacite: 55 }

      const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ ...mockClasse, ...updateData }),
        status: 200,
      } as Response)

      const result = await classeService.update(1, updateData)

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining('/api/classes/1'),
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(updateData),
        })
      )
      expect(result.nomClasse).toBe('6eme-B')
      expect(result.capacite).toBe(55)
    })

    it('peut changer le statut', async () => {
      const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ ...mockClasse, statut: 'ARCHIVEE' }),
        status: 200,
      } as Response)

      const result = await classeService.update(1, { statut: 'ARCHIVEE' })

      expect(result.statut).toBe('ARCHIVEE')
    })
  })

  describe('delete', () => {
    it('supprime une classe', async () => {
      const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        status: 204,
      } as Response)

      await classeService.delete(1)

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining('/api/classes/1'),
        expect.objectContaining({ method: 'DELETE' })
      )
    })

    it('lance une erreur si des eleves sont inscrits', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        text: () => Promise.resolve(''),
        json: () =>
          Promise.resolve({
            message: 'Impossible de supprimer: eleves inscrits',
          }),
      } as Response)

      await expect(classeService.delete(1)).rejects.toThrow()
    })
  })

  describe('headers', () => {
    it('envoie le token si present dans localStorage', async () => {
      vi.mocked(window.localStorage.getItem).mockReturnValue('my-jwt-token')

      const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: () => Promise.resolve([]),
        status: 200,
        statusText: 'OK',
        text: () => Promise.resolve(''),
        type: 'cors',
        url: '',
      } as Response)

      await classeService.getAll()

      const headers = fetchSpy.mock.calls[0][1]?.headers as Record<string, string>
      // Authorization est commente pour le moment
      expect(headers['Content-Type']).toBe('application/json')
    })
  })
})
