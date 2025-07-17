import { useEffect, useState } from 'react';
import axios from 'axios';
import BugItem from '../../BugItem';
import BugForm from '../../BugForm';

const API_URL = import.meta.env.VITE_API_URL;

export default function BugList() {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchBugs = async () => {
      try {
        const response = await axios.get(`${API_URL}/bugs`);
        if (isMounted) {
          setBugs(response.data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) setError('Failed to fetch bugs');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    console.log('API URL:', API_URL);

    fetchBugs();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleBugAdded = (newBug) => {
    setBugs(prevBugs => [newBug, ...prevBugs]);
  };

  const handleBugUpdated = (updatedBug) => {
    setBugs(prevBugs => prevBugs.map(b => (b._id === updatedBug._id ? updatedBug : b)));
  };

  const handleBugDeleted = (deletedId) => {
    setBugs(prevBugs => prevBugs.filter(b => b._id !== deletedId));
  };

  if (loading) return <p>Loading bugs...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

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
