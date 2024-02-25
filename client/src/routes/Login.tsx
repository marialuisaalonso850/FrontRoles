import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import { API_URL } from "../Autenticacion/constanst";

export default function Login() {
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");
  const goto = useNavigate();

  async function handleSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();

    // Validación de campos de entrada
    if (!gmail || !password) {
      setErrorResponse("Por favor, ingresa un correo electrónico y una contraseña.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          gmail,
          password
        })
      });

      const json = await response.json();
      const userRol = json.user;
      
      if (response.ok) {
        // Almacenamiento seguro del token de acceso y el rol del usuario
        localStorage.setItem("token", json.token);
        
        if(userRol==="cliente"){
          goto("/Posts")
        }else{
          goto("/dashboard");
        }
        
       
      
      } else {
        // Manejo de errores en la respuesta del servidor
        setErrorResponse(json.error || "Ocurrió un error al iniciar sesión.");
      }
    } catch (error) {
      // Manejo de errores de red
      console.error("Error al enviar la solicitud:", error);
      setErrorResponse("Hubo un problema de red. Inténtalo de nuevo más tarde.");
    }
  }

  return (
    <DefaultLayout>
      <div className="form-box">
        <div className="wrapper">
          <div className="img-area">
            <img src="https://i.ibb.co/1mwWC9J/5fc5c7eb-c331-4fee-825a-fdf685fcd47c.jpg" alt="imagen" />
          </div>
          <div className="form-area">
            <form className="form" onSubmit={handleSubmit}>
              <h1>Login</h1>
              {errorResponse && <div className="errorMessage">{errorResponse}</div>}
              <label>Email</label>
              <input
                type="email"
                value={gmail}
                onChange={(e) => setGmail(e.target.value)} />
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

