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
    const response = await axios.get(`${API_URL}/bugs`);
    setBugs(response.data);
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
