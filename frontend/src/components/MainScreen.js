import { supabase } from "../supabase";

export default function MainScreen() {
    const handleLogOutClick = () => {
        supabase.auth.signOut();
      };
    return (
        <div>
            <h1>Hello User</h1>
            <button onClick={handleLogOutClick}>LOGOUT</button>
        </div>
    );
}