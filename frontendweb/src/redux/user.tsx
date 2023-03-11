import { createSlice, PayloadAction} from "@reduxjs/toolkit"

export interface User {
    admin: boolean
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
        phone: "",
        admin: false
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
        },
        // Add Admin
        addAdmin(state: UserReduxState = userState, action: PayloadAction<any>){
            state.value = {...state.value, admin: action.payload}
        }
    }
})

export const {addPassword, addPhone, addUser, addAdmin} = userSlice.actions 
export default userSlice.reducer