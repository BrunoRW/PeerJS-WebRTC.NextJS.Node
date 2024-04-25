'use client';

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { v4 } from "uuid";
import { useRouter } from "next/navigation";
import { isArray } from "util";
type Params = {
    params: { 
        id: string,
    },
}


export default function JoinRoom({ params }: Params){    
    const socket = io(`http://localhost:3030`);

    const [newMsg, setNewMsg] = useState<any>('');
    const [messages, setMessages] = useState<Array<String>>([]);
    const [userID, newUserID] = useState<String>('');

    useEffect(()=>{
        newUserID(v4());
    },[])

    let ROOM_ID = params.id;

    const router = useRouter();

    fetch(`http://localhost:3030/check?id=${ROOM_ID}`)
    .then(e=>e.json())
    .then(e=>{
        if(e.status == false){
            router.push(`/`)
        } else {
            socket.emit("join", ROOM_ID, userID);
        }
    })
    .catch(e=>console.log(e))

    console.log(ROOM_ID);
    
    useEffect(()=>{

        socket.on(ROOM_ID, (newMsg: any) => {
            if(Array.isArray(newMsg)){
                for(let i of newMsg){
                    setMessages((e: Array<String>) => [...e, i]);
                }
            } else {
                setMessages((e: Array<String>) => [...e, newMsg]);
            }
            console.log(newMsg);
        });

        return () => {
            socket.off(ROOM_ID);
        }; 
        
    },[])

    const send_msg = () =>{
        socket.emit("send", newMsg, ROOM_ID, userID);
        setNewMsg("");
    }
        
    return (
        <main className="flex flex-col gap-5 bg-default-100 min-h-svh p-10 text-center">


            <h1 className="text-4xl text-default-800 bold">Conectado em {ROOM_ID}</h1>

            <input type="text" value={newMsg} className='max-w-72 w-full ml-auto mr-auto p-2 border bg-default-50 rounded text-default-600 outline-none text-sm' placeholder='Ex: Nova mensagem' onChange={(e) => setNewMsg(e.target.value)}/>
            <button onClick={send_msg} className="p-2 border max-w-72 mx-auto w-full rounded text-default-200 bg-default-700 text-sm">Enviar</button>

            <ul>
                {messages.map((message, index) => (
                <li key={index}>{message}</li>
                ))}
            </ul>
        </main>
    )
}