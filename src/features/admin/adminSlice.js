import { createSlice } from "@reduxjs/toolkit";
import { fetchAdminUsers,createAdminUser,updateAdminUser,deleteAdminUser } from "./adminThunks";

const initialState={
    users:[],
    loading:false,
    error:null,
    count:0,
    next:null,
    previous:null,
};
const adminSlice=createSlice({
    name:'admin',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAdminUsers.pending,state=>{state.loading=true,state.error=null;})
        .addCase(fetchAdminUsers.fulfilled,(state,action)=>{state.loading=false;
            state.users=action.payload.results;
            state.count=action.payload.count;
            state.next=action.payload.next;
            state.previous=action.payload.previous;
        })
        .addCase(fetchAdminUsers.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })

        .addCase(createAdminUser.pending,state=>{state.loading=true,state.error=null})
        .addCase(createAdminUser.fulfilled,(state,action)=>{state.loading=false;state.users.unshift(action.payload)})
        .addCase(createAdminUser.rejected,(state,action)=>{state.loading=false;state.error=action.payload})

        .addCase(updateAdminUser.pending,state=>{state.loading=true;state.error=null})
        .addCase(updateAdminUser.fulfilled,(state,action)=>{state.loading=false
            const idx=state.users.findIndex((u)=>u.id===action.payload.id);
            if (idx!==-1) state.users[idx]=action.payload
        })
        .addCase(updateAdminUser.rejected,(state,action)=>{state.loading=false;state.error=action.payload})

        .addCase(deleteAdminUser.pending,state=>{state.loading=true,state.error=null})
        .addCase(deleteAdminUser.fulfilled,(state,action)=>{state.loading=false;
            state.users=state.users.filter((u)=>u.id!==action.payload);
            state.count-=1;
        })
        .addCase(deleteAdminUser.rejected,(state,action)=>{state.loading=false,state.error=action.payload})
    }
})

export default adminSlice.reducer