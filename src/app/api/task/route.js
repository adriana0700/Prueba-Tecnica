
import pool from '../../lib/db';

//Obtener todas las tareas
export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM Task ORDER BY id DESC');
    return Response.json(result.rows);
  } catch (error) {
    console.error(error);
    return new Response('Error al obtener tareas', { status: 500 });
  }
}

//Crear una nueva tarea
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, estado } = body;


    const result = await pool.query(
      'INSERT INTO Task  (name, estado) VALUES ($1, $2) RETURNING *',
      [name, estado]
    );

    return Response.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return new Response('Error al crear tareas', { status: 500 });
  }
}

// Actualizar Marcar tarea como completada
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, name, estado } = body;

    const result = await pool.query(
      'UPDATE Task SET name=$1, estado=$2 WHERE id=$3 RETURNING *',
      [name, estado, id]
    );

    return Response.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return new Response('Error al actualizar ', { status: 500 });
  }
}

// Eliminar una tarea
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    await pool.query('DELETE FROM Task WHERE id=$1', [id]);
    return new Response('Tarea eliminada correctamente');
  } catch (error) {
    console.error(error);
    return new Response('Error al eliminar Tarea', { status: 500 });
  }
}
