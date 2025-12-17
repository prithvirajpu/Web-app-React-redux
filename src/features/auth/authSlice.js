import { createSlice  } from "@reduxjs/toolkit";

const initialState={
    user:null,
    accessToken:null,
    loading:false,
    error:null,
    isLoggedIn:false,
};
const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        logout:(state)=>{
            state.user=null,
            state.accessToken=null,
            localStorage.removeItem('accessToken');
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(loginUser.pending,(state)=>{state.loading=true;state.error=null;})
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=action.payload.user;
            state.accessToken=action.payload.accessToken;
            localStorage.setItem('accessToken',action.payload.accessToken);
        })
        .addCase(loginUser.rejected,(state,action)=>{state.loading=false;state.error=action.payload;})

        .addCase(signupUser.pending,(state)=>{state.loading=true;state.error=null;})
        .addCase(signupUser.fulfilled,(state)=>{state.loading=false;})
        .addCase(signupUser.rejected,(state,action)=>{state.loading=false,state.error=action.payload})

        .addCase(fetchProfile.fulfilled,(state,action)=>{state.user=action.payload})
        .addCase(fetchProfile.rejected,(state,action)=>{state.user=action.payload})

    }
})
export const {logout}=authSlice.actions
export default authSlice.reducer
