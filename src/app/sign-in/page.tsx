"use client"
import React, { FC } from 'react';
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Props {
  // Add your prop types here
}

async function signin(formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  signIn('credentials', {
    email : email,
    password: password,
    callbackUrl : '/'
  })
}

const ComponentName: FC<Props> = () => {
  
  return (
    <div>
      <form action={signin} className='flex flex-col w-48'>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" className='text-slate-800' />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" className='text-slate-800' />
        <button type='submit'>Sign up</button>
      </form>
    </div>
  );
};

export default ComponentName;
