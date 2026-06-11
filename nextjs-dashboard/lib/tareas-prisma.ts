import prisma from "@/lib/prisma"

export async function obtenerTareas() {
  return prisma.tarea.findMany({
    orderBy: {
      id: "desc",
    },
  })
}

export async function obtenerTareaPorId(id: number) {
  return prisma.tarea.findUnique({
    where: {
      id,
    },
  })
}

export async function crearTarea(titulo: string, descripcion: string) {
  return prisma.tarea.create({
    data: {
      titulo,
      descripcion,
    },
  })
}

export async function modificarTarea(
  id: number,
  titulo: string,
  descripcion: string,
) {
  return prisma.tarea.update({
    where: {
      id,
    },
    data: {
      titulo,
      descripcion,
    },
  })
}

export async function borrarTarea(id: number) {
  return prisma.tarea.delete({
    where: {
      id,
    },
  })
}