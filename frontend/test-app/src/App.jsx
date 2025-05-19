import { useState } from 'react'
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "./GoogleLogin";
// import './App.css'
const clientId = "216764135168-9qq9vj8n4o20241l6bgr1v4na3dp0vm6.apps.googleusercontent.com";

function App() {
  const [count, setCount] = useState(0)

  return (
      <div>
        <GoogleOAuthProvider clientId={clientId}>
          <GoogleLogin />
        </GoogleOAuthProvider>
      </div>
  )
}

export default App
