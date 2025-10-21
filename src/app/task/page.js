
'use client'; 
import { useEffect, useState } from 'react';

export default function PageTask() {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState('');
  const [estado, setEstado] = useState(true);
  const [editId, setEditId] = useState(null);

  // Obtener tareas
  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    const res = await fetch('/api/task');
    const data = await res.json();
    setTasks(data);
  }

  // Agregar tarea
  async function addTask(e) {
    e.preventDefault();
    const res = await fetch('/api/task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, estado })
    });
    const newTask = await res.json();
    setTasks([newTask, ...tasks]);
    setName('');
    setEstado(true);
  }

  // Preparar edición
  function startEdit(task) {
    setEditId(task.id);
    setName(task.name);
    setEstado(task.estado);
  }

  // Actualizar tarea
  async function updateTask(e) {
    e.preventDefault();
    const res = await fetch('/api/task', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editId, name, estado })
    });
    const updated = await res.json();
    setTasks(tasks.map(t => (t.id === updated.id ? updated : t)));
    setEditId(null);
    setName('');
    setEstado(true);
  }

  // Eliminar tarea
  async function deleteTask(id) {
    const res = await fetch(`/api/task?id=${id}`, { method: 'DELETE' });
    const result = await res.json();
    setTasks(tasks.filter(t => t.id !== id));
    console.log(result.message);
  }

  return (
    <div>
      <h1>Lista de Tareas</h1>

      <form onSubmit={editId ? updateTask : addTask}>
        <input
          type="text"
          placeholder="Nombre tarea"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <select value={estado} onChange={(e) => setEstado(e.target.value === 'true')}>
          <option value="true">Pendiente</option>
          <option value="false">Completada</option>
        </select>
        <button type="submit">{editId ? 'Actualizar' : 'Agregar'}</button>
        {editId && <button type="button" onClick={() => { setEditId(null); setName(''); setEstado(true); }}>Cancelar</button>}
      </form>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.name} - {task.estado ? 'Pendiente' : 'Completada'}
            <button onClick={() => startEdit(task)}>Editar</button>
            <button onClick={() => deleteTask(task.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}


