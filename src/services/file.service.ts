import { apiClient } from '@/lib/api/client'

export interface FileInfoDto {
  fileId: string
  filename: string
  contentType: string
  size: number
  typeDocument: string
  inscriptionId?: number
  eleveId?: number
  tenant?: string
  downloadUrl: string
  uploadedAt?: string
}

export const fileService = {
  /**
   * Upload un fichier (image JPG/PNG ou PDF) vers MongoDB GridFS
   * @param file          Fichier à uploader
   * @param typeDocument  PHOTO_ELEVE | ACTE_NAISSANCE | CERTIFICAT_MEDICAL | BULLETIN_ANCIEN | PIECE_IDENTITE_PARENT | AUTRE
   * @param inscriptionId ID inscription MySQL (optionnel)
   * @param eleveId       ID élève MySQL (optionnel)
   */
  async upload(
    file: File,
    typeDocument: string,
    inscriptionId?: number,
    eleveId?: number
  ): Promise<FileInfoDto> {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('typeDocument', typeDocument)
    if (inscriptionId != null) formData.append('inscriptionId', inscriptionId.toString())
    if (eleveId != null) formData.append('eleveId', eleveId.toString())

    const response = await apiClient.instance.post<FileInfoDto>('/files/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data
  },
}
