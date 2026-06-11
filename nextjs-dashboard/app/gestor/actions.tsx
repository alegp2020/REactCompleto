"use server";

import { revalidatePath } from "next/cache";
import { crearTarea, borrarTarea, modificarTarea } from "@/lib/tareas-prisma";

export async function guardarTarea(formData: FormData) {
  const titulo = formData.get("titulo");
  const descripcion = formData.get("descripcion");

  if (typeof titulo !== "string" || typeof descripcion !== "string") {
    return;
  }

  await crearTarea(titulo.trim(), descripcion.trim());

  revalidatePath("/gestor");
}

export async function actualizarTarea(formData: FormData) {
  const id = Number(formData.get("id"));
  const titulo = formData.get("titulo");
  const descripcion = formData.get("descripcion");

  if (
    !Number.isInteger(id) ||
    typeof titulo !== "string" ||
    typeof descripcion !== "string"
  ) {
    return;
  }

  await modificarTarea(id, titulo.trim(), descripcion.trim());

  revalidatePath("/gestor");
}

export async function eliminarTarea(formData: FormData) {
  const id = Number(formData.get("id"));

  if (!Number.isInteger(id)) {
    return;
  }

  await borrarTarea(id);

  revalidatePath("/gestor");
}