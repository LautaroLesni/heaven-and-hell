import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Thunk } from '../../store'
import axios from '../../../utils/axiosconfig'

const initialState = {
    user:{
        id:null,
        username:'',
        email:'',
        password:'',
        createdAt:''
    }, 
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers:{
        getUser: (state, action:PayloadAction<any>) => {
            state.user = action.payload
        }
    }
})

export default userSlice.reducer