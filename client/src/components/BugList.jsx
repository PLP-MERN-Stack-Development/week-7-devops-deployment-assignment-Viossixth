import { useEffect, useState } from 'react';
import axios from 'axios';
import BugItem from '../../BugItem';
import BugForm from '../../BugForm';

const API_URL = import.meta.env.VITE_API_URL;

export default function BugList() {
  const [bugs, setBugs] = useState([]);

  useEffect(() => {
    fetchBugs();
  }, []);

  const fetchBugs = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${API_URL}/bugs`);
      const data = await response.json();
      setBugs(data);
    } catch (error) {
      console.error('Error fetching bugs:', error);
    }
  };


  const handleBugAdded = (newBug) => {
    setBugs([newBug, ...bugs]);
  };

  const handleBugUpdated = (updatedBug) => {
    setBugs(bugs.map(b => (b._id === updatedBug._id ? updatedBug : b)));
  };

  const handleBugDeleted = (deletedId) => {
    setBugs(bugs.filter(b => b._id !== deletedId));
  };

  return (
    <div>
      <h2>Bug List</h2>
      <BugForm onBugAdded={handleBugAdded} />
      {bugs.length === 0 ? (
        <p>No bugs reported yet.</p>
      ) : (
        bugs.map(bug => (
          <BugItem 
            key={bug._id} 
            bug={bug} 
            onBugUpdated={handleBugUpdated} 
            onBugDeleted={handleBugDeleted} 
          />
        ))
      )}
     
    </div>
  );
}
