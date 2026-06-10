import mysql from "mysql2/promise";

export type Tarea = {
  id: number;
  titulo: string;
  descripcion: string;
};

async function conectar() {
  return await mysql.createConnection({
    host: "127.0.0.1",
    port: 3307,
    user: "root",
    password: "",
    database: "gestor_tareas",
  });
}

export async function obtenerTareas() {
  const conexion = await conectar();

  const [filas] = await conexion.execute(
    "SELECT id, titulo, descripcion FROM tareas ORDER BY id DESC",
  );

  await conexion.end();

  return filas as Tarea[];
}

export async function insertarTarea(titulo: string, descripcion: string) {
  const conexion = await conectar();

  await conexion.execute(
    "INSERT INTO tareas (titulo, descripcion) VALUES (?, ?)",
    [titulo, descripcion],
  );
  
  await conexion.end();
}

export async function eliminarTarea(id: number) {
  const conexion = await conectar();

  await conexion.execute(
    "DELETE FROM tareas WHERE id = ?",
    [id],
  );

  await conexion.end();
}
