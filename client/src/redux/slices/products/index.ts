import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Thunk } from '../../store'
import axios from '../../../utils/axiosconfig'
import { AxiosResponse, AxiosError } from 'axios'

type initialProducts = {
    products: Products[] | []
    productsReference: Products[] | []
    productsByCategories: Products[] | []
    productsByName: Products[] | []
    product: Products
}

const initialState: initialProducts = {
    products: [],
    productsReference: [],
    productsByCategories: [],
    productsByName: [],
    product: {
        id: null,
        name: null,
        description: null,
        img: null,
        createdAt: null,
        categories: null
    },
}

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<any>) => {
            state.products = action.payload
            state.productsReference = action.payload
            state.productsByCategories = action.payload
            state.productsByName = action.payload
        },
        setByCategory: (state, action: PayloadAction<any>) => {
            const filteredByName = state.productsByName
            let filteredByCategory: any = []
            let filteredCategoryforState: any = []
            const allProducts = state.productsReference

            for (let i = 0; i < allProducts.length; i++) {
                allProducts[i].categories?.map(category => category.id.toString() === action.payload && filteredCategoryforState.push(allProducts[i]))
            }

            if (filteredByName.length === 0){
                if (action.payload !== '') {
                    filteredByCategory = filteredCategoryforState
                }
                else {
                    filteredByCategory = allProducts
                }
            }
            else{
                if (action.payload !== '') {
                    for (let i = 0; i < filteredByName.length; i++) {
                        filteredByName[i].categories?.map(category => category.id.toString() === action.payload && filteredByCategory.push(filteredByName[i]))
                    }
                }
                else{
                    filteredByCategory = filteredByName
                }
            }

            state.products = filteredByCategory
            state.productsByCategories = filteredCategoryforState
        },
        setByName: (state, action: PayloadAction<any>) => {

            const filteredByCategory = state.productsByCategories
            console.log(filteredByCategory.length)
            const referencia = state.productsReference
            let productosfiltrados: any = []

           const filteredNameforState = action.payload.name === '' ? referencia : referencia.filter(producto => producto.name?.toLowerCase().includes(action.payload.name.toLowerCase()))
            if (filteredByCategory.length === 0) {
                productosfiltrados = filteredNameforState
            }
            else{
                productosfiltrados = action.payload.name === '' ? filteredByCategory : filteredByCategory.filter(producto => producto.name?.toLowerCase().includes(action.payload.name.toLowerCase()))
            }

            state.products = productosfiltrados
            state.productsByName = filteredNameforState
        }
    }
})

export default productSlice.reducer
export const { setProducts, setByCategory, setByName } = productSlice.actions

export const traerProductos = (): Thunk => async (dispatch): Promise<AxiosResponse | AxiosError> => {
    try {
        const response: AxiosResponse = await axios.get('/products')
        dispatch(setProducts(response.data))
        return response
    }
    catch (error) {
        return error as AxiosError
    }
}
export const traerProductosByName = (info: any): Thunk => async (dispatch): Promise<AxiosResponse | AxiosError> => {
    try {
        const response: AxiosResponse = await axios.get(`/products?name=${info}`)
        dispatch(setProducts(response.data))
        return response
    }
    catch (error) {
        return error as AxiosError
    }
}

export const filteredByCategory = (categoryid: any): Thunk => async (dispatch) => {
    try {
        dispatch(setByCategory(categoryid))
        return categoryid
    }
    catch (error) {
        return error as AxiosError
    }
}
export const filteredByName = (input: any): Thunk => async (dispatch) => {
    try {
        dispatch(setByName(input))
        return input
    }
    catch (error) {
        return error as AxiosError
    }
}