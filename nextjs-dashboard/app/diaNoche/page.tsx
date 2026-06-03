"use client"
import { useState } from "react";

export default function Home() {
    const [dia , setDia] = useState(true);

    function cambiar(){
        
        if(dia){
            setDia(false);
        }else{
            setDia(true);
        }
    }
    return (
        <div className={`flex flex-col items justify-center mx-44 my-11 ${dia ? "bg-white text-black" : "bg-black text-white"}`}>
            <button className= "bg-amber-300 rounded-2xl font-medium" onClick ={ cambiar }>Cambiar color</button>
            <p className="flex flex-col items-center justify-center rounded-full p-5 m-4  ">Color cambiado</p>
        </div>
    
    );
}