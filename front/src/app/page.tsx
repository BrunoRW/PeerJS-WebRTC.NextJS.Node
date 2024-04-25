'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  
  const [room_id, setRoomId] = useState<String>();
  const [msg, setMsg] = useState<String>();

  const join_room = () => {
    fetch(`http://localhost:3030/check?id=${room_id}`)
    .then(e=>e.json())
    .then(e=>{
      if(e.status == true){
        router.push(`/join/${room_id}`)
        
      }
      setMsg(e.msg);
    })
    .catch(e=>console.log(e))
  }

  return (
    <main className="flex flex-col gap-5 bg-default-100 min-h-svh p-10 text-center">


      <h1 className="text-4xl text-default-800 bold">Entrar em uma chamada</h1>

      <input type="text" className='max-w-72 w-full ml-auto mr-auto p-2 border bg-default-50 rounded text-default-600 outline-none text-sm' placeholder='Ex: abc-123' onChange={(e) => setRoomId(e.target.value)}/>
      <button onClick={join_room} className="p-2 border max-w-72 mx-auto w-full rounded text-default-200 bg-default-700 text-sm">Entrar</button>

      <p>{msg}</p>
    </main>
  );
}
