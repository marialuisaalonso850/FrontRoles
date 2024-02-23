export interface AuthResponse{
    body: {
        user: User;
        parqueadero: Parqueadero;
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
    getParqueadero: () => Parqueadero | undefined;
    createParqueadero: (newParqueadero: Parqueadero) => void;
    role: string;
  }

export interface User{
    _id: string;
    name: string;
    username: string;
    role: string;
}
export interface Parqueadero{
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
  