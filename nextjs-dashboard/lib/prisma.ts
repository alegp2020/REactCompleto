import { PrismaClient } from "@/generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "MyNewPass1",
  database: "gestor_tareas_prisma",
});

const prisma = new PrismaClient({
  adapter,
});

export default prisma;
