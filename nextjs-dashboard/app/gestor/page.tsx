import { obtenerTareas } from "@/lib/tareas-prisma";
import { guardarTarea, eliminarTarea } from "./actions";

export default async function Page() {
  const tareas = await obtenerTareas();

  return (
    <>
      <header className="bg-sky-200 text-sky-900 p-4">
        <h1 className="text-3xl font-bold text-center">
          Gestor de Tareas
        </h1>
      </header>

      <main className="m-10 flex flex-row gap-6 p-10 rounded-xl justify-center">
        <form
          action={guardarTarea}
          className="flex flex-col gap-6 p-10 rounded-xl border border-teal-200 bg-teal-50 shadow-md"
        >
          <input
            type="text"
            name="titulo"
            placeholder="Título"
            className="rounded-xl p-2 border border-teal-200 bg-white"
          />

          <textarea
            name="descripcion"
            placeholder="Descripción"
            className="border border-teal-200 rounded-xl p-2 h-24 bg-white"
          />

          <button className="bg-sky-300 rounded-xl p-2 text-sky-900 font-semibold">
            Añadir
          </button>
        </form>

        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold text-teal-800 mb-4">
            Lista de tareas
          </h2>

          <ul className="flex flex-col gap-5 mb-3">
            {tareas.map((tarea) => (
              <li
                key={tarea.id}
                className="border border-sky-200 rounded-xl p-5 bg-sky-50 w-64 shadow-sm"
              >
                <div className="text-center mb-2">
                  <h3 className="mb-5">Título: {tarea.titulo}</h3>
                  <p className="mb-5">
                    Descripción: {tarea.descripcion}
                  </p>
                </div>

                <form action={eliminarTarea} className="flex justify-center">
                  <input type="hidden" name="id" value={tarea.id} />
                  <button className="bg-red-200 p-2 m-1 rounded">
                    Eliminar
                  </button>
                </form>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}