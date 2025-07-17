import { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
console.log('Using API_URL:', API_URL);

export default function BugForm({ onBugAdded }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert('Title is required');

    try {
      const res = await axios.post(`${API_URL}/bugs`, { title, description });
      onBugAdded(res.data);
      setTitle('');
      setDescription('');
    } catch (err) {
      alert('Failed to add bug');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Bug title" 
        value={title} 
        onChange={e => setTitle(e.target.value)} 
        required 
      />
      <textarea 
        placeholder="Description" 
        value={description} 
        onChange={e => setDescription(e.target.value)} 
      />
      <button type="submit">Add Bug</button>
    </form>
  );
}
