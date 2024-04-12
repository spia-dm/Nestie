"use client"
import { useSearchParams } from "next/navigation";
import axios from 'axios';
import {useEffect} from 'react'

export default function test() {
  const searchParams = useSearchParams();
  const myParam = searchParams.get("query");

  const run = async () => {
    try {
      const response = await axios.get(`/api/test/${myParam}`);
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    run();
  }, []); 

  return (
    <main>
      <div>
        <h1>Dashboard</h1>
        <p>Search Params are {myParam}</p>
      </div>
    </main>
  );
}
