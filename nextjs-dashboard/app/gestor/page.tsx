"use client"
import { useState } from 'react';
export default function Page() {
    const [titulo, settitulo] = useState("");
    const [descripcion, setdescripcion] = useState("");
    const [contador, setContador] = useState(0);

    // guaradra la tearea

    const [tareaG, setTareaG] = useState<Tarea[]>([]);

    // lista de tareas completadas
    const [tareaComplet, setTareaComplet] = useState<Tarea[]>([]);
    const [mostrarTareasCompletadas, setMostrarTareasCompletadas] = useState(false);

    // para ponerlo caundo cree una nueva tarea
    type Tarea = {
        Id: number;
        Titulo: string;
        Descripcion: string;
    }

    function guardar() {
        if (titulo.trim() && descripcion.trim()) {
            //crea la nueva tarea con todo eso utioliando lo quepuse al principo del type
            const nuevaTarea: Tarea = {
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

    // Para eliminar filtramos toda la lista de tarea exceptuando la que queremos eliminar
    function eliminar(id: number) {
        // Me quedo con todas las tareas menos esa
        setTareaG(tareaG.filter(tarea => tarea.Id != id));
    }

    // Al marcar una tarea como completada se recupera de la lista de tareas y se introduce en la lista de completadas
    // Luego la eliminamos
    // Incrementamos el contador
    function completada(id: number) {
        let tarea = tareaG.filter(tarea => tarea.Id == id);
        setTareaComplet([...tareaComplet, tarea[0]])
        eliminar(id);
        setContador(contador + 1);
    }

    function verTareas() {
        if (mostrarTareasCompletadas) {
            setMostrarTareasCompletadas(false);

        } else {
            setMostrarTareasCompletadas(true);
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
                    <h2 className="text-xl font-bold text-teal-800 mb-4 ">
                        Lista de tareas
                    </h2>



                    <h4 className= "mb-5">Tareas completadas: {contador}</h4>

                    <ul className="flex flex-col gap-5 mb-3">
                        {tareaG.map((tarea, i) => (

                            <li
                                key={i}
                                className="border border-sky-200 rounded-xl p-5 bg-sky-50 w-64 shadow-sm"
                            >
                                <div className="justify-center text-center mb-2">
                                    <h3 className="justify-center text-center gap-5 mb-5">Titulo: {tarea.Titulo}</h3>
                                    <p className="justify-center text-center gap-5 mb-5">Descripción: {tarea.Descripcion}</p>
                                </div>


                                <div className="flex flex-row gap-3 justify-center items-center">
                                    <button onClick={() => eliminar(tarea.Id)} className="bg-red-200 p-2 m-1 rounded">Eliminar</button>
                                    <button onClick={() => completada(tarea.Id)} className="bg-blue-200 p-2 m-1 rounded">Completada</button>
                                </div>





                            </li>
                        ))}
                    </ul>
                </div>




            </main >


            <div className="flex flex-col items-center p-10">
                <button className="bg-red-200 p-2  mb-4 rounded" onClick={verTareas}>Ver tareas completadas</button>


                {mostrarTareasCompletadas && (<ul className="flex flex-col gap-2 items-center">
                    {tareaComplet.map((tarea, i) => (

                        <li
                            key={i}
                            className="border border-sky-200 rounded-xl p-5 bg-sky-50 w-64 shadow-sm justify-center"
                        >
                            {tarea.Titulo} - {tarea.Descripcion}

                        </li>
                    ))}
                </ul>)}

            </div>
        </>
    );
} 