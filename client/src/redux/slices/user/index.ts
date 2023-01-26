import { createSlice } from "@reduxjs/toolkit";

const initialState:User = {
    id:null,
    username:null, 
    email:null,
    password:null,
    createdAt:null 
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers:{}
})

export default userSlice.reducer