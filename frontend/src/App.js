import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Route, Routes } from "react-router-dom";
import LoginScreen from "./components/LoginScreen";
import HomeScreen from "./components/MainPage/HomeScreen";
import UploadScreen from "./components/Pyp/UploadScreen";
import SearchScreen from "./components/Pyp/SearchScreen";
import ProfileScreen from "./components/MainPage/ProfileScreen";
import Pyp from "./components/Pyp/Pyp";
import { usePypList } from "./components/Pyp/PypListContext";
import { auth } from "./firebase"; // Import auth from firebase.js

export default function App() {
  const pypList = usePypList();
  const [session, setSession] = useState(null);

  onAuthStateChanged(auth, (user) => {
      setSession(user);
  });

  const routes = [
    {
      path: "/",
      element: <HomeScreen />,
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
  ];

  return (
    <div>
      {session ? (
      <Routes>
        {allRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>) : (
        <LoginScreen />
      )}
    </div>
  );
}