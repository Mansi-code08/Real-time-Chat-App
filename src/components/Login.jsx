import { db } from "../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function Login() {
  const handleLogin = async () => {
  const provider = new GoogleAuthProvider();

  const result = await signInWithPopup(auth, provider);

  const user = result.user;

  await setDoc(
    doc(db, "users", user.uid),
    {
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      lastSeen: serverTimestamp(),
    },
    { merge: true }
  );
};
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Welcome to ChatApp</h1>

      <button onClick={handleLogin}>
        Sign in with Google
      </button>
    </div>
  );
}

export default Login;