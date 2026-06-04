"use client"
import { useState } from 'react';
export default function Page() {
    const [titulo, settitulo] = useState("");
    const [descripcion, setdescripcion] = useState("");
    // guaradra la tearea

    const [tareaG, setTareaG] = useState<Tarea[]>([]);

    // para ponerlo caundo cree una nueva tarea
    type Tarea = {
        Titulo: string;
        Descripcion: string;
    }

    function guardar() {
        if (titulo.trim() && descripcion.trim()) {
            //crea la nueva tarea con todo eso utioliando lo quepuse al principo del type
            const nuevaTarea: Tarea = {
                Titulo: titulo,
                Descripcion: descripcion,
            };

            //actualiza la atera gauradndfo todo lo qu ehemos anteiromente 
            setTareaG([...tareaG, nuevaTarea]);
            // lo ponemos de nuevo vacio para depsue añadir mas tareas
            settitulo("");
            setdescripcion("");
        } else {
            console.log("No se ha guardado nada");
        }
    }




    return (
        <>
            <header className="bg-sky-200 text-sky-900 p-4 ">
                <h1 className="text-3xl font-bold text-center">
                    Gestor de Tareas
                </h1>
            </header>

            <main className="m-10 flex flex-row gap-6 p-10 rounded-xl justify-center  ">
                <div className="flex flex-col gap-6 p-10 rounded-xl border border-teal-200 bg-teal-50 shadow-md">
                    <input type="text"
                        placeholder="Título"
                        value={titulo}
                        onChange={(evento) => settitulo(evento.target.value)}
                        className="rounded-xl p-2 border border-teal-200 bg-white"
                    />
                    <textarea
                        placeholder="Descripción"
                        value={descripcion}
                        onChange={(evento) => setdescripcion(evento.target.value)}
                        className="border border-teal-200 rounded-xl p-2 h-24 bg-white"
                    >


                    </textarea>
                    <button
                        className="bg-sky-300 rounded-xl p-2 text-sky-900 font-semibold"
                        onClick={guardar}>Añadir
                    </button>
                </div>
                <div className="flex flex-col items-center">
                    <h2 className="text-xl font-bold text-teal-800 mb-4">
                        Lista de tareas
                    </h2>

                    <ul className="flex flex-col gap-2">
                        {tareaG.map((tarea, i) => (
                            <li
                                key={i}
                                className="border border-sky-200 rounded-xl p-5 bg-sky-50 w-64 shadow-sm"
                            >
                                {tarea.Titulo} - {tarea.Descripcion}
                            </li>
                        ))}
                    </ul>
                </div>


            </main >
        </>
    );
} 