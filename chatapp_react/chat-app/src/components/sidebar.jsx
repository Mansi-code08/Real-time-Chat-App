function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">
        <h2>ChatApp</h2>
      </div>

      <div className="search-box">
        <input type="text" placeholder="Search contacts..." />
      </div>

      <div className="contacts">
        <div className="contact-card">
          <h4>Mansi Bighane</h4>
          <p>Hey, how are you?</p>
        </div>

        <div className="contact-card">
          <h4>Sarah Smith</h4>
          <p>See you tomorrow!</p>
        </div>

        <div className="contact-card">
          <h4>Alex Brown</h4>
          <p>Let's meet at 5 PM.</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;