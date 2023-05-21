import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "../supabase";

export default function LoginScreen() {
    return (
        <div className = "login-background">
        <div className="login-style">
        <h1 className="login-title">AKILLAC</h1>
        <h2 className="login-slogan">Soar and Score</h2>
        <Auth 
        supabaseClient={supabase} 
        appearance={{ extend:true,
        className:{
            button: "login-button",
            anchor: "login-anchor",
            divider: "login-divider"
        }}}
        providers={[]}
        localization={{
            variables: {
              sign_in: {
                email_label: "Username",
                password_label: "Password",
                button_label:"Login"
              },
            },
          }} />
          </div>
          </div>
    )
}