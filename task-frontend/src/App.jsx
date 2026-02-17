import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoginView, setIsLoginView] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Form Inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [taskTitle, setTaskTitle] = useState('');

  useEffect(() => {
    if (token) fetchTasks();
  }, [token]);

  // --- ACTIONS ---

  const handleAuth = async () => {
    try {
      if (isLoginView) {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
        const receivedToken = response.data;
        localStorage.setItem('token', receivedToken);
        setToken(receivedToken);
      } else {
        await axios.post(`${API_BASE_URL}/auth/register`, { name, email, password, role: "USER" });
        alert("Registration Successful! Please Login.");
        setIsLoginView(true);
      }
    } catch (error) {
      console.error("Auth failed:", error);
      alert("Action failed! Check console.");
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(response.data);
    } catch (error) {
      if (error.response?.status === 403) logout();
    }
  };

  const addTask = async () => {
    if (taskTitle.length < 3) return alert("Title too short");
    try {
      await axios.post(`${API_BASE_URL}/tasks`,
        { title: taskTitle, description: "Added from React", completed: false },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTaskTitle('');
      fetchTasks();
    } catch (error) {
      alert("Failed to add task");
    }
  };

  // ✅ NEW: Toggle Task Completion
  const toggleTask = async (task) => {
    try {
      await axios.put(`${API_BASE_URL}/tasks/${task.id}`,
        { ...task, completed: !task.completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTasks();
    } catch (error) {
      alert("Failed to update task");
    }
  };

  // ✅ NEW: Delete Task
  const deleteTask = async (id) => {
    if(!confirm("Delete this task?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTasks();
    } catch (error) {
      alert("Failed to delete task");
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setTasks([]);
  };

  // --- RENDER ---

  return (
    <div style={{ padding: '40px', fontFamily: 'Segoe UI, sans-serif', maxWidth: '500px', margin: '0 auto' }}>
      <h1 style={{ color: '#2c3e50', textAlign: 'center' }}>Task Manager</h1>

      {!token ? (
        <div style={styles.card}>
          <h2 style={{ textAlign: 'center' }}>{isLoginView ? "Login" : "Register"}</h2>
          {!isLoginView && <input type="text" placeholder="Full Name" onChange={e => setName(e.target.value)} style={styles.input} />}
          <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} style={styles.input} />
          <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} style={styles.input} />
          <button onClick={handleAuth} style={styles.primaryButton}>{isLoginView ? "Login" : "Register"}</button>
          <p style={{ textAlign: 'center', marginTop: '15px', cursor: 'pointer', color: '#3498db' }} onClick={() => setIsLoginView(!isLoginView)}>
            {isLoginView ? "Need an account? Register" : "Already have an account? Login"}
          </p>
        </div>
      ) : (
        <div>
          <div style={styles.header}>
            <span>User: <strong>{email}</strong></span>
            <button onClick={logout} style={styles.logoutButton}>Logout</button>
          </div>

          <div style={styles.card}>
            <input value={taskTitle} placeholder="New Task Title..." onChange={e => setTaskTitle(e.target.value)} style={styles.input} />
            <button onClick={addTask} style={styles.primaryButton}>Add Task</button>
          </div>

          <h3>My Tasks</h3>
          {tasks.map(task => (
            <div key={task.id} style={styles.taskItem}>
              <div style={{ flexGrow: 1, textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? '#aaa' : '#000' }}>
                <strong>{task.title}</strong>
              </div>
              <div>
                {/* ✅ Action Buttons */}
                <button onClick={() => toggleTask(task)} style={{...styles.actionBtn, background: '#f1c40f', marginRight: '5px'}}>
                  {task.completed ? "Undo" : "Done"}
                </button>
                <button onClick={() => deleteTask(task.id)} style={{...styles.actionBtn, background: '#e74c3c'}}>
                  X
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  card: { background: '#fff', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', marginBottom: '20px' },
  input: { display: 'block', width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ddd', boxSizing: 'border-box' },
  primaryButton: { width: '100%', padding: '12px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' },
  logoutButton: { padding: '8px 15px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  taskItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', padding: '15px', marginBottom: '10px', borderRadius: '5px', borderLeft: '5px solid #3498db', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' },
  actionBtn: { border: 'none', padding: '5px 10px', color: 'white', borderRadius: '3px', cursor: 'pointer', fontSize: '12px' }
};

export default App;