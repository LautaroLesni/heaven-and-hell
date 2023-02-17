import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Thunk } from '../../store'
import axios from '../../../utils/axiosconfig'
import { AxiosResponse, AxiosError } from 'axios'

const initialState = {
    user:{
        id:null,
        username:'',
        email:'',
        password:'',
        createdAt:''
    }, 
    token:''
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers:{
        setUser: (state, action:PayloadAction<any>) => {
            state.user = action.payload
        },
        setToken: (state, action:PayloadAction<any>) =>{
            state.token = action.payload
        }
    }
})

export default userSlice.reducer
export const { setUser, setToken } = userSlice.actions

export const loginUser = (user:object): Thunk => async (dispatch): Promise<AxiosResponse | AxiosError> => {
    try {
        const response: AxiosResponse = await axios.post('/users/login', user)
        if (response.status === 404 || response.status === 403){
            return response
        }
        dispatch(setToken(response.data.token))
        return response
    }
    catch (error) {
        return error as AxiosError
    }
}