import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Thunk } from '../../store'
import axios from '../../../utils/axiosconfig'
import { AxiosResponse, AxiosError } from 'axios'
import { setToken } from "../user";

type initialCategories = {
    categories: Products[] | null
    loadedCategories: boolean
}

const initialState:initialCategories = {
    categories: [],
    loadedCategories:false
}

const categoriesSlice = createSlice({
    name:'products',
    initialState,
    reducers:{
        setCategories: (state, action:PayloadAction<any>) => {
            state.categories = action.payload
        },
        setLoadedCategories: (state, action:PayloadAction<any>) => {
            state.loadedCategories = action.payload
        }
    }
})

export default categoriesSlice.reducer
export const { setCategories, setLoadedCategories } = categoriesSlice.actions

export const traerCategorias = (): Thunk => async (dispatch): Promise<AxiosResponse | AxiosError> => {
    try{
        const response: AxiosResponse = await axios.get('/categories')
        dispatch(setCategories(response.data))
        return response
    }
    catch(error){
        return error as AxiosError
    }
}

export const createCategory = (category: any, token:string): Thunk => async (dispatch): Promise<AxiosResponse | AxiosError> => {
    try {
        const response: AxiosResponse = await axios.post(`/categories`,category,{headers:{Authorization:'Bearer ' + token}})
        dispatch(setCategories(response.data)) 
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
export const updateCategory = (category: any, token:string, id:string): Thunk => async (dispatch): Promise<AxiosResponse | AxiosError> => {
    try {
        const response: AxiosResponse = await axios.put(`/categories/${id}`,category,{headers:{Authorization:'Bearer ' + token}})
        dispatch(setCategories(response.data)) 
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

export const deleteCategory = (token:string, id:string): Thunk => async (dispatch): Promise<AxiosResponse | AxiosError> => {
    try {
        const response: AxiosResponse = await axios.delete(`/categories/${id}`,{headers:{Authorization:'Bearer ' + token}})
        dispatch(setCategories(response.data)) 
        return response
    }
    catch (error:any) {
        if (error.response.status === 401){
            dispatch(setToken(''))
        }
        return error as AxiosError
    }
}