import axios from 'axios';

export default function BugItem({ bug, onBugUpdated, onBugDeleted }) {
  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
    const res = await axios.patch(`${API_URL}/bugs/${bug._id}`, { status: newStatus });
      onBugUpdated(res.data);
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this bug?')) return;
    try {
      await axios.delete(`${API_URL}/bugs/${bug._id}`);
      onBugDeleted(bug._id);
    } catch (err) {
      alert('Failed to delete bug');
    }
  };

  return (
    <div className="bug">
      <div className="bug-controls">
        <div>
          <h3>{bug.title}</h3>
          <p>{bug.description}</p>
        </div>
        <div>
          <select value={bug.status} onChange={handleStatusChange}>
            <option value="open">🟥 Open</option>
            <option value="in-progress">🟡 In-Progress</option>
            <option value="resolved">🟢 Resolved</option>
          </select>
          <button onClick={handleDelete}>❌</button>
        </div>
      </div>
    </div>
  );
}
