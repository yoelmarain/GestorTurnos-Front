import { createContext, useContext, useState, type ReactNode } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { FetchLogin } from "@/API/Login";

interface TokenPayload {
    user_id: number;
    role: string;
    nombre: string;
    email: string;
    exp: number;
}

interface AuthUser {
    id: number;
    role: string;
    nombre: string;
    email: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: AuthUser | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

// Toda la info del user se obtiene al decodificar el token. No se hacen requests adicionales al backend.
const decodeUser = (token: string): AuthUser | null => {
    try {
        const payload = jwtDecode<TokenPayload>(token);
        if (Date.now() >= payload.exp * 1000) return null;
        return {
            id: payload.user_id,
            role: payload.role,
            nombre: payload.nombre,
            email: payload.email,
        };
    } catch {
        return null;
    }
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AuthUser | null>(() => {
        const token = Cookies.get("token");
        return token ? decodeUser(token) : null;
    });

    const isAuthenticated = user !== null;

    const login = async (email: string, password: string) => {
        const data = await FetchLogin(email, password);
        setUser(decodeUser(data.access));
    };

    const logout = () => {
        Cookies.remove("token");
        Cookies.remove("refreshToken");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}> {/* Aca se setean los estados del contexto */}
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};

export { AuthContext, AuthProvider };
