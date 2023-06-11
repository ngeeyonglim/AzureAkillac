import { useState, useEffect, useContext, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Route, Routes } from "react-router-dom";
import LoginScreen from "./components/LoginScreen";
import HomeScreen from "./components/MainPage/HomeScreen";
import UploadScreen from "./components/Pyp/UploadScreen";
import SearchScreen from "./components/Pyp/SearchScreen";
import ProfileScreen from "./components/MainPage/ProfileScreen";
import Pyp from "./components/Pyp/Pyp";
import { usePypList } from "./components/Pyp/PypListContext";
import { auth, getProfile } from "./firebase"; // Import auth from firebase.js

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export default function App() {
  const pypList = usePypList();
  const [session, setSession] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      const userProfile = user ? getProfile(user.uid) : null;
      userProfile.then((profile) => {
        setSession(profile);
      });
  });}, [session]);

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
      <UserContext.Provider value={session}>
        {session ? (
        <Routes>
          {allRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>) : (
          <LoginScreen />
        )}
      </UserContext.Provider>
    </div>
  );
}