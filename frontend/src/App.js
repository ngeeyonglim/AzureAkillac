import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import LoginScreen from "./components/LoginScreen";
import HomeScreen from "./components/HomeScreen";
import { Route, Routes } from "react-router-dom";
import SearchScreen from "./components/SearchScreen";

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
      <Routes>
        <Route path="/" element={session ? <HomeScreen /> : <LoginScreen />} />
        <Route path="/search" element={<SearchScreen />} />
      </Routes>
    </div>
  );
}