import { revalidatePath } from "next/cache"
import { insertarTarea, obtenerTareas, eliminarTarea } from "../lib/db";

export default async function Page() {
  const tareas = await obtenerTareas()

  async function crearTarea(formData: FormData) {
    "use server"

    const titulo = formData.get("titulo")
    const descripcion = formData.get("descripcion")

    if (typeof titulo !== "string" || typeof descripcion !== "string") {
      return
    }

    if (titulo.trim() === "" || descripcion.trim() === "") {
      return
    }

    await insertarTarea(titulo.trim(), descripcion.trim())

    revalidatePath("/gestor")
  }
  async function eliminarTareaAction(formData: FormData) {
    "use server"

    const id = formData.get("id")
    if (!id) return

    await eliminarTarea(Number(id))

    revalidatePath("/gestor")
  }

return (
  <>
    <header className="bg-sky-200 text-sky-900 p-4">
      <h1 className="text-3xl font-bold text-center">
        Gestor de tareas
      </h1>
    </header>


    <main className="m-10 flex flex-row gap-6 p-10 rounded-xl justify-center">
      <form
        action={crearTarea}
        className="flex flex-col gap-6 p-10 rounded-xl border border-teal-200 bg-teal-50 shadow-md"
      >
        <label className="flex flex-col gap-2 text-teal-800 font-semibold">
          Título
          <input
            name="titulo"
            className="rounded-xl p-2 border border-teal-200 bg-white"
          />
        </label>


        <label className="flex flex-col gap-2 text-teal-800 font-semibold">
          Descripción
          <textarea
            name="descripcion"
            className="border border-teal-200 rounded-xl p-2 h-24 bg-white"
          />
        </label>


        <button
          type="submit"
          className="bg-sky-300 rounded-xl p-2 text-sky-900 font-semibold"
        >
          Guardar tarea
        </button>
      </form>


      <section className="flex flex-col items-center">
        <h2 className="text-xl font-bold text-teal-800 mb-4">
          Tareas guardadas
        </h2>


        {tareas.length === 0 ? (
          <p className="text-teal-700">Todavía no hay tareas.</p>
        ) : (
          <ul className="flex flex-col gap-5 mb-3">
            {tareas.map((tarea) => (
              <li
                key={tarea.id}
                className="border border-sky-200 rounded-xl p-5 bg-sky-50 w-64 shadow-sm"
              >
                <div className="text-center mb-2">
                  <h3 className="mb-5 font-semibold">
                    Título: {tarea.titulo}
                  </h3>
                  <p className="mb-5">
                    Descripción: {tarea.descripcion}
                  </p>
                </div>


                <form action={eliminarTareaAction} className="flex justify-center">
                  <input type="hidden" name="id" value={tarea.id} />
                  <button
                    type="submit"
                    className="bg-red-200 p-2 m-1 rounded"
                  >
                    Eliminar
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  </>
)


}