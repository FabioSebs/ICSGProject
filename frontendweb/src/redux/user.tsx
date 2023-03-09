import { createSlice, PayloadAction} from "@reduxjs/toolkit"

export interface User {
    username: string
    password: string
    phone: string
}

export interface UserReduxState {
    value : User
} 

const userState : UserReduxState = {
    value: {
        username: "",
        password: "",
        phone: ""
    }
}

export const userSlice = createSlice({
    name: "user",
    initialState: userState,
    reducers: {
        // Add Name
        addUser(state : UserReduxState = userState, action : PayloadAction<any>){
            state.value = {...state.value, username: action.payload}
        },
        // Add Password
        addPassword(state : UserReduxState = userState, action : PayloadAction<any>){
            state.value = {...state.value, password: action.payload}
        },
        // Add Phone
        addPhone(state : UserReduxState = userState, action : PayloadAction<any>){
            state.value = {...state.value, phone: action.payload}
        }
    }
})

export const {addPassword, addPhone, addUser} = userSlice.actions 
export default userSlice.reducer