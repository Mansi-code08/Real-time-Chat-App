import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function Sidebar() {
  const { user } = useAuth();

  return (
    <div className="sidebar">
      <div className="logo">
        <h2>ChatApp</h2>
      </div>

      {/* User Profile */}
      <div className="user-info">
        {user && (
          <>
            <img
              src={user.photoURL}
              alt="Profile"
              width="50"
              style={{ borderRadius: "50%" }}
            />
            <h3>{user.displayName}</h3>

            <button onClick={() => signOut(auth)}>
              Logout
            </button>
          </>
        )}
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