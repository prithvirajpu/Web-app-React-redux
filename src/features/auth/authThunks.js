import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from '../api/AxiosInstance'

export const signupUser=createAsyncThunk(
    'auth/signup',
    async(formdata, {rejectWithValue})=>{
        try{
            const res=await AxiosInstance.post ('/api/register/',formdata);
            return res.data
        }
        catch (err){
            return rejectWithValue(err.response?.data || 'Signup failed')
        }
    }
)
export const loginUser=createAsyncThunk(
    'auth/login',
    async(formdata, {rejectWithValue})=>{
        try{
            const res=await AxiosInstance.post ('/api/login/',formdata);
            return res.data;
        }
        catch (err){
            return rejectWithValue(err.response?.data || 'Login failed')
        }
    }
)