import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import AxiosInstance from '../../api/AxiosInstance'

export const fetchAdminUsers=createAsyncThunk(
    'admin/fetchUsers',
    async(_,{rejectWithValue})=>{
        try {
            const res=await AxiosInstance.get('admin/users/');
            console.log(res.data)
            return res.data
        } catch (error) {
            return rejectWithValue(
                error.response?.data || 'Failed to fetch users. '
            )         
        }
    }
)

export const createAdminUser= createAsyncThunk(
    "admin/createUser",
    async(userData,{rejectWithValue})=>{
        try {
            const response=await AxiosInstance.post('admin/users/',userData);
            return response.data;
        } catch (error) {
            const backendError = error.response?.data || { detail: "User creation failed" };
            return rejectWithValue(backendError);
        }
    }
)

export const updateAdminUser=createAsyncThunk(
    'admin/updateUser',
    async ({id,userData},{rejectWithValue})=>{
        try {
            const response=await AxiosInstance.patch(`admin/users/${id}/`,userData);
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data || 'User Update failed');            
        }
    }
)
export const deleteAdminUser=createAsyncThunk(
    'admin/deleteUser',
    async({id},{rejectWithValue})=>{
        try {
            await AxiosInstance.delete(`admin/users/${id}/`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data ||'User deletion failed' );            
        }
    }
)