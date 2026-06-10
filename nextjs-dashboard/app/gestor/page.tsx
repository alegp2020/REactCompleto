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
    <main>
      <h1>Gestor de tareas</h1>

      <form action={crearTarea}>
        <label>
          Título
          <input name="titulo" />
        </label>

        <label>
          Descripción
          <textarea name="descripcion" />
        </label>

        <button type="submit">Guardar tarea</button>
      </form>

      <section>
        <h2>Tareas guardadas</h2>

        {tareas.length === 0 ? (
          <p>Todavía no hay tareas.</p>
        ) : (
          <ul>
            {tareas.map((tarea) => (
              <li key={tarea.id}>
                <strong>{tarea.titulo}</strong>
                <p>{tarea.descripcion}</p>

                <form action={eliminarTareaAction}>
                  <input type="hidden" name="id" value={tarea.id} />
                  <button type="submit">
                    Eliminar tarea
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}