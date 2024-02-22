export interface AuthResponse{
    body: {
        user: User;
        parqueadero: parqueadero;
        accessToken: string;
        refreshToken: string;
    };

}
  
export interface AuthResponseError {
  body: {
    error: string;
  };
}
  
export interface ExtendedAuthContext {
    esAutentico: boolean;
    getAccessToken: () => string;
    saveUser: (userData: AuthResponse) => void;
    getRefreshToken: () => string | null;
    getUser: () => User | undefined;
    signOut: () => void;
    getParqueadero: () => parqueadero | undefined;
    createParqueadero: (newParqueadero: parqueadero) => void;
    role: string;
  }

export interface User{
    _id: string;
    name: string;
    username: string;
    role: string;
}
export interface parqueadero{
    _id: string;
    title: string;
    content: string
    longitud: number;
    altura: number ;
    puestos: number,
}

export interface AccessTokenResponse {
    statusCode: number;
    body: {
      accessToken: string; 
    };
    error?: string;
  }
  