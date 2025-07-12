"use client"
import { api } from '@/convex/_generated/api';
import React , { use } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { DialogDescription, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Lookup from '@/app/data/Lookup';
import { Button } from '../ui/button';
import { useGoogleLogin } from '@react-oauth/google';
import { UserDetailContext } from '@/context/UserDetailContext';
import { useContext } from 'react';
import axios from 'axios';
import { useMutation,useQuery } from 'convex/react';
export default function SignInDialog({ openDialog, closeDialog }) {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const CreateUser=useMutation(api.users.CreateUser);
  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      console.log("Google Login Success", response);
      const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${response.access_token}` }
      });
      
      const user = await CreateUser({
        name: userInfo.data?.name,
        email: userInfo.data?.email,
        picture: userInfo.data?.picture,
        uid: uuidv4()
      }); 
      console.log("User Created", user);
      if(typeof window !== 'undefined'){
        localStorage.setItem("user", JSON.stringify(userInfo.data));
      }
      setUserDetail(userInfo.data);
      closeDialog(false);

    },
    onerror: (error) => {
      console.error("Google Login Error", error);
    }
  })
  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription>
            <div className="flex flex-col items-center justify-center gap-3">
              <h2 className='font-bold text-2xl text-white'>{Lookup.SIGNIN_HEADING}</h2>
              <p className='mt-2 text-center'>{Lookup.SIGNIN_SUBHEADING}</p>
              <Button onClick={googleLogin} className="mt-4 bg-blue-500 text-white hover:bg-green-700"> Sign In with Google</Button>
              <p className='mt-4 '>{Lookup.SIGNIN_AGREEMENT_TEXT}</p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}