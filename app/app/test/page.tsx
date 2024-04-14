"use client"
import { signIn, signOut, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import '../globals.css';

export default function Home() {
  const router = useRouter();
  const {data, status } = useSession();
  const [session_status,set_session_status]=useState(null)
  const [session_data,set_session_data]=useState(null)
  useEffect(() => {
    //console.log(status); 
    set_session_status(status)
    set_session_data(data)
  }, [status]);
console.log(session_status)
console.log(session_data)
  return (
    <h2 className="text-black text-3xl font-mono">hey</h2>
  );
};
