import axios from 'axios'
import { POSTGrupos, POSTSubgrupos, POSTSaida, POSTEntrada, PUTEntrada, PUTGrupos, PUTSubgrupos, PUTSaida } from './interfaces'


const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
})

export const getEntradas = (data?: string | undefined) => api.get(`/entradas?${data}`)
export const getSaidas = (data?: string | undefined) => api.get(`/saidas?${data}`)
export const getGrupos = (data?: string | undefined) => api.get(`/grupos?${data}`)
export const getSubgrupos = (data?: string | undefined) => api.get(`/subgrupos?${data}`)

export const getIdEntradas = (id?: string | undefined) => api.get(`/entradas/${id}`)
export const getIdSaidas = (id?: string | undefined) => api.get(`/saidas/${id}`)
export const getIdGrupos = (id?: string | undefined) => api.get(`/grupos/${id}`)
export const getIdSubgrupos = (id?: string | undefined) => api.get(`/subgrupos/${id}`)

export const postEntradas = (data: POSTEntrada) => api.post('/entradas', data)
export const postSaidas = (data: POSTSaida) => api.post(`/saidas`, data)
export const postGrupos = (data: POSTGrupos) => api.post('/grupos', data)
export const postSubgrupos = (data: POSTSubgrupos) => api.post('/subgrupos', data)

export const getSumEntradas = () => api.get(`/entradas/somar`)
export const getSumSaidas = (id: string) => api.get(`/saidas/soma/${id}`)

export const deleteEntradas = (id: string) => api.delete(`/entradas/delete/${id}`)
export const deleteSaidas = (id: string) => api.delete(`/saidas/delete/${id}`)
export const deleteGrupos = (id: string) => api.delete(`/grupos/delete/${id}`)
export const deleteSubgrupos = (id: string) => api.delete(`/subgrupos/delete/${id}`)

export const putEntradas = (id: string, data: PUTEntrada) => api.put(`/entradas/alterar/${id}`, data)
export const putSaidas = (id: string, data: PUTSaida) => api.put(`/saidas/alterar/${id}`, data)
export const putGrupos = (id: string, data: PUTGrupos) => api.put(`/grupos/alterar/${id}`, data)
export const putSubgrupos = (id: string, data: PUTSubgrupos) => api.put(`/subgrupos/alterar/${id}`, data)

export default api
