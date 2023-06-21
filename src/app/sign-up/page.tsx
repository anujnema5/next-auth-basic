"use client"

import { FC } from 'react';
import axios from 'axios';

interface Props {
    // Add your prop types here
}

async function signupActions(formData: FormData) {
    const email = formData.get('email');
    const password = formData.get('password');

    const req = await axios.post('/api/register/', {email : email, password : password})
    
    console.log(req)
}

const ComponentName: FC<Props> = () => {
    return (
        <form action={signupActions} className='flex flex-col w-48'>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" className='text-slate-800'/>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" className='text-slate-800' />
            <button type='submit'>Sign up</button>
        </form>
    );
};

export default ComponentName;
