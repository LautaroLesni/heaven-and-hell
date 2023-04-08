import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Thunk } from '../../store'
import axios from '../../../utils/axiosconfig'
import { AxiosResponse, AxiosError } from 'axios'
import { setToken } from "../user";


type initialNews = {
noticias:Noticias[] | []
noticia:Noticias | null
loadedNews:boolean
}
const initialState:initialNews  = {
    noticias:[],
    noticia:null,
    loadedNews:false
    
}

const newsSlice = createSlice({
    name: 'news',
    initialState: initialState,
    reducers:{
        setNoticias: (state, action:PayloadAction<any>) => {
            state.noticias = action.payload
        },
        setNoticia: (state, action:PayloadAction<any>) =>{
            state.noticia = action.payload
        },
        setLoadedNews: (state, action:PayloadAction<any>) =>{
            state.loadedNews = action.payload
        }
    }
})

export default newsSlice.reducer
export const { setNoticias, setNoticia, setLoadedNews } = newsSlice.actions

export const traerNoticias = (): Thunk => async (dispatch): Promise<AxiosResponse | AxiosError> => {
    try {
        const response: AxiosResponse = await axios.get('/news')
        dispatch(setNoticias(response.data))
        return response
    }
    catch (error) {
        return error as AxiosError
    }
}
export const traerNoticia = (id:string): Thunk => async (dispatch): Promise<AxiosResponse | AxiosError> => {
    try {
        const response: AxiosResponse = await axios.get(`/news/${id}`)
        dispatch(setNoticia(response.data))
        return response
    }
    catch (error) {
        return error as AxiosError
    }
}
export const createNoticia = (noticia:any, token:string): Thunk => async (dispatch): Promise<AxiosResponse | AxiosError> => {
    try {
        const response: AxiosResponse = await axios.post(`/news`,noticia,{headers:{Authorization:'Bearer ' + token}})
        dispatch(setNoticias(response.data)) 
        console.log(response.data)
        return response
    }
    catch (error:any) {
        if (error.response.status === 401){
            dispatch(setToken(''))
        }
        return error as AxiosError
    }
}
export const updateNoticia = (noticia: any, token:string, id:string): Thunk => async (dispatch): Promise<AxiosResponse | AxiosError> => {
    try {
        const response: AxiosResponse = await axios.put(`/news/${id}`,noticia,{headers:{Authorization:'Bearer ' + token}})
        dispatch(setNoticias(response.data)) 
        console.log(response.data)
        return response
    }
    catch (error:any) {
        if (error.response.status === 401){
            dispatch(setToken(''))
        }
        return error as AxiosError
    }
}
export const deleteNoticia = (token:string, id:string): Thunk => async (dispatch): Promise<AxiosResponse | AxiosError> => {
    try {
        const response: AxiosResponse = await axios.delete(`/news/${id}`,{headers:{Authorization:'Bearer ' + token}})
        dispatch(setNoticias(response.data)) 
        return response
    }
    catch (error:any) {
        if (error.response.status === 401){
            dispatch(setToken(''))
        }
        return error as AxiosError
    }
}