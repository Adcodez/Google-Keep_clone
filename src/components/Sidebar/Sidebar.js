import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-item active-item">
        <span className="material-icons-outlined hover active_icon">lightbulb</span>
        <span className="sidebar-text">Notes</span>
      </div>
      <div className="sidebar-item">
        <span className="material-icons-outlined hover side_icon">notifications</span>
        <span className="sidebar-text">Reminders</span>
      </div>
      <div className="sidebar-item">
        <span className="material-icons-outlined hover side_icon">edit</span>
        <span className="sidebar-text">Edit Labels</span>
      </div>
      <div className="sidebar-item">
        <span className="material-icons-outlined hover side_icon">archive</span>
        <span className="sidebar-text">Archive</span>
      </div>
      <div className="sidebar-item">
        <span className="material-icons-outlined hover side_icon">delete</span>
        <span className="sidebar-text">Trash</span>
      </div>
    </div>
  );
}

export default Sidebar;
