
"use client"
import { useSearchParams } from "next/navigation";
import axios from 'axios';
import { useEffect, useState } from 'react';


export default function Show() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (search) {
          const response = await axios.post(`/api/show`, { search });
          console.log(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [search]);

  return (
    <main>
      <div>
        <h1>{search}</h1>
      </div>
    </main>
  );
}
