"use client"
import { useState } from 'react';

export default function Page() {
    const [titulo, settitulo] = useState("");
    const [descripcion, setdescripcion] = useState("");
    

    // guaradra la tearea
    const [tareaG, setTareaG] = useState([]);

    function guardar() {
        if (titulo.trim() && descripcion.trim()) {
            //crea la nueva tarea con todo eso
            const nuevaTarea = {
                Id: Date.now(),
                Titulo: titulo,
                Descripcion: descripcion
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
        <main className="m-20 flex flex-row gap-20">
            <div className="flex flex-col gap-6">
                <input type="text"
                    placeholder="Título"
                    value={titulo}
                    onChange={(evento) => settitulo(evento.target.value)}
                />
                <textarea
                    placeholder="Descripción"
                    value={descripcion}
                    onChange={(evento) => setdescripcion(evento.target.value)}>
                </textarea>
                <button className="bg-orange-400 " onClick={guardar}>Guardar Tarea</button>
            </div>


            <div>
                <h2>Tareas Guardadas</h2>
                <ul>
                 
                    {tareaG.map((tarea)=>(
                       <li key={tarea.Id}>{tarea.Titulo}-{tarea.Descripcion}</li>
                    ))}
                    <button>Completada</button>
                    <button>Eliminar</button>
                </ul>
            </div>


        </main >
    );
}
