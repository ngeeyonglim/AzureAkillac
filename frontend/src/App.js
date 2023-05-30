import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import { Route, Routes } from "react-router-dom";
import LoginScreen from "./components/LoginScreen";
import HomeScreen from "./components/HomeScreen";
import UploadScreen from "./components/UploadScreen";
import SearchScreen from "./components/SearchScreen";
import ProfileScreen from "./components/ProfileScreen";
import { PypListProvider } from "./components/PypListContext";

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
      <PypListProvider>
        <Routes>
          <Route path="/" element={session ? <HomeScreen /> : <LoginScreen />} />
          <Route path="/upload" element={<UploadScreen />} />
          <Route path="/search" element={<SearchScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
        </Routes>
      </PypListProvider>
    </div>
  );
}