"use client"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const {status, data} = useSession();
  return (
    <div>
      {status === 'authenticated' && data !== null ? (
        <div className="">
          <h2>Welcome {data.user?.email}</h2>

          <button onClick={()=>signOut()}>Logout</button>
          {/* {JSON.stringify(data.user?.image)} */}
        </div>
      ) : (<Link href={'/sign-in'}>Please login to continue</Link>)}
    </div>
  )
}
