import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import { Route, Routes } from "react-router-dom";
import LoginScreen from "./components/LoginScreen";
import HomeScreen from "./components/HomeScreen";
import UploadScreen from "./components/UploadScreen";
import SearchScreen from "./components/SearchScreen";
import ProfileScreen from "./components/ProfileScreen";
import Pyp from "./components/Pyp";
import { usePypList } from "./components/PypListContext";

export default function App() {
  const pypList = usePypList();
  const [session, setSession] = useState(null);

  useEffect(() => {
    const subscription = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.data.subscription.unsubscribe();
  }, []);

  const routes = [
    {
      path: "/",
      element: session ? <HomeScreen /> : <LoginScreen />,
    },
    {
      path: "/upload",
      element: <UploadScreen />,
    },
    {
      path: "/search",
      element: <SearchScreen />,
    },
    {
      path: "/profile",
      element: <ProfileScreen />,
    },
  ];

  const allRoutes = [
    ...routes,
    ...pypList.map((pyp) => ({
      path: `/search/${pyp.courseCode + pyp.pypYear + pyp.semester + pyp.midOrFinals}`,
      element: <Pyp pyp={pyp} />,
    }))
  ]
  return (
    <div>
        <Routes>
          {allRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
    </div>
  );
}