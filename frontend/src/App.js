import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import LoginScreen from "./components/LoginScreen";
import MainScreen from "./components/MainScreen";

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const subscription = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.data.subscription.unsubscribe();
  }, []);
  return (
    <div>
      {session ? <MainScreen /> : <LoginScreen />}
    </div>
  );
}