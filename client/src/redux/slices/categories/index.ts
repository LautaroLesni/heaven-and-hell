import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Thunk } from '../../store'
import axios from '../../../utils/axiosconfig'
import { AxiosResponse, AxiosError } from 'axios'

type initialCategories = {
    categories: Products[] | null
}

const initialState:initialCategories = {
    categories: []
}

const categoriesSlice = createSlice({
    name:'products',
    initialState,
    reducers:{
        setCategories: (state, action:PayloadAction<any>) => {
            state.categories = action.payload
        }
    }
})

export default categoriesSlice.reducer
export const { setCategories } = categoriesSlice.actions

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