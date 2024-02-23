import React, { createContext, useContext, useState, useEffect } from "react";
import type { AccessTokenResponse, AuthResponse, Parqueadero, User } from "../types/types";
import { API_URL } from "../Autenticacion/constanst";

// Definir el tipo de contexto extendido
interface ExtendedAuthContext {
  esAutentico: boolean;
  getAccessToken: () => string;
  saveUser: (userData: AuthResponse) => void;
  getRefreshToken: () => string | null;
  getUser: () => User | undefined;
  signOut: () => void;
  getParqueadero: () => Parqueadero | undefined;
  saveParqueadero: (parqueaderoData: Parqueadero) => void;
}

// Crear el contexto de autenticación
export const AuthContext = createContext<ExtendedAuthContext>({
  esAutentico: false,
  getAccessToken: () => "",
  saveUser: (_userData: AuthResponse) => {},
  getRefreshToken: () => "",
  getUser: () => undefined,
  signOut: () => {},
  getParqueadero: () => undefined,
  saveParqueadero: (_parqueaderoData: Parqueadero) => {},
});

// Componente proveedor de autenticación
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [esAutentico, setEsAutentico] = useState(false);
  const [accessToken, setAccessToken] = useState<string>("");
  const [user, setUser] = useState<User | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [parqueadero, setParqueadero] = useState<Parqueadero | undefined>();

  useEffect(() => {
    checkAuth();
  }, []);

  async function requestNewAccessToken(refreshToken: string) {
    try {
      const response = await fetch(`${API_URL}/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
      });

      if (response.ok) {
        const json = await response.json() as AccessTokenResponse;

        if (json.error) {
          throw new Error(json.error);
        }
        return json.body.accessToken;
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async function getUserInfo(accessToken: string) {
    try {
      const response = await fetch(`${API_URL}/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        const json = await response.json();

        if (json.error) {
          throw new Error(json.error);
        }
        return json.body;
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async function getParqueaderoInfo(accessToken: string) {
    try {
      const response = await fetch(`${API_URL}/parqueadero`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        const json = await response.json();

        if (json.error) {
          throw new Error(json.error);
        }
        return json.body;
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async function checkAuth() {
    const storedRefreshToken = getRefreshToken();
    if (storedRefreshToken) {
      const newAccessToken = await requestNewAccessToken(storedRefreshToken);
      if (newAccessToken) {
        const userInfo = await getUserInfo(newAccessToken);
        if (userInfo) {
          saveSessionInfo(userInfo.user, newAccessToken, storedRefreshToken, userInfo.role);
          const parqueaderoInfo = await getParqueaderoInfo(newAccessToken);
          if (parqueaderoInfo) {
            saveParqueadero(parqueaderoInfo);
          }
        }
      }
    }
    setIsLoading(false);
  }

  function signOut() {
    setEsAutentico(false);
    setAccessToken("");
    setUser(undefined);
    setParqueadero(undefined);
    localStorage.removeItem("token");
  }

  function saveSessionInfo(userInfo: User, accessToken: string, refreshToken: string, role: string) {
    setAccessToken(accessToken);
    localStorage.setItem('token', JSON.stringify(refreshToken));
    setEsAutentico(true);
    setUser({ ...userInfo, role });
  }

  function getAccessToken() {
    return accessToken;
  }

  function getRefreshToken(): string | null {
    return localStorage.getItem("token");
  }

  function saveUser(userData: AuthResponse) {
    saveSessionInfo(
      userData.body.user,
      userData.body.accessToken,
      userData.body.refreshToken,
      userData.body.user.role
    );
  }

  function saveParqueadero(parqueaderoData: Parqueadero): void {
    setParqueadero(parqueaderoData);
  }

  function getParqueadero() {
    return parqueadero;
  }

  function getUser() {
    return user;
  }

  return (
    <AuthContext.Provider value={{ esAutentico, getAccessToken, saveUser, getRefreshToken, getUser, signOut, getParqueadero, saveParqueadero }}>
      {isLoading ? <div>Cargando...</div> : children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para acceder al contexto de autenticación
export const useAuth = () => useContext(AuthContext) as ExtendedAuthContext;
