import { useState, useEffect } from "react";
import { Link, } from "react-router-dom";
import { API_URL } from "../Autenticacion/constanst";
import { useAuth } from "../Autenticacion/AutProvider";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const [role, setRole] = useState(""); 
  const [, setErrorResponse] = useState("");


  

  useEffect(() => {
    async function fetchUserRole() {
      try {
        const response = await fetch(`${API_URL}/login`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}` // Añadido token de autorización
          }
        });
  
        if (response.ok) {
          const json = await response.json();
          setRole(json.role); // Actualizado el estado del rol
        } else {
          setErrorResponse("Ocurrió un error al obtener el rol del usuario.");
        }
      } catch (error) {
        setErrorResponse("Hubo un problema de red. Inténtalo de nuevo más tarde.");
      }
    }
  
    fetchUserRole(); // Llamar a la función para obtener el rol del usuario al cargar el componente
  }, []);
  

  async function handleSignOut(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/signout`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getRefreshToken()}`
        }
      });

     
      
      if (response.ok) {
        auth.signOut();
        window.location.href = "/";
        
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  }

  return (
    <>
      <header className="principal">
        <div className="container-pri">
          <Link to="/" className="inicio">
            Parking<span className="span">Location.</span>{" "}
          </Link>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/Perfil">Perfil</Link>
            </li>
            {role === "usuario" && ( // Mostrar el enlace "Mapa navegacion" solo si el usuario es un usuario
              <li>
                <Link to="/Dashboard">Mapa navegacion</Link>
              </li>
            )}
            {role === "cliente" && ( // Mostrar el enlace "Creacion parqueadero" solo si el usuario es un cliente
              <li>
                <Link to="/Posts">Creacion parqueadero</Link>
              </li>
            )}
            <li>
              <a href="/" onClick={handleSignOut}>
                Salir
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main>{children}</main>
    </>
  );
}
