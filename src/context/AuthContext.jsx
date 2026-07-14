import { createContext, useContext, useEffect, useState } from "react";
import { auth, db, rtdb } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import {
  ref,
  set,
  onDisconnect,
} from "firebase/database";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (!currentUser) return;

      // User goes online
      const statusRef = ref(rtdb, `status/${currentUser.uid}`);

      await set(statusRef, {
        state: "online",
      });

      // Automatically set offline when connection closes
      onDisconnect(statusRef).set({
        state: "offline",
        lastChanged: Date.now(),
      });

      // Update Firestore lastSeen
      await updateDoc(doc(db, "users", currentUser.uid), {
        lastSeen: serverTimestamp(),
      });
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};