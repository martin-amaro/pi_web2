import { useState } from "react";
import axios, { AxiosError } from 'axios';

import React from 'react'
import { APP_BACKEND } from "../config";

export default function useAuth() {

    const [token, setToken] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            const response = await axios.post(`${APP_BACKEND}/auth/login`, {
                email,
                password
            });
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token);
            setError(null);
            return true;

        } catch (err) {
            const error = err as AxiosError;

            if (error.response) {
                const status = error.response.status;
                const data = error.response.data;

                switch (status) {
                    case 401:
                        setError("Correo o contraseña incorrectos.");
                        break;

                    case 400:
                        if (data && typeof data === 'object') {
                            const fields = data as Record<string, string>;
                            const firstMessage = Object.values(fields)[0];
                            setError(firstMessage || "Solicitud incorrecta.");
                        } else {
                            setError("Solicitud incorrecta.");
                        }
                        break;

                    case 500:
                        setError("Error interno del servidor.");
                        break;

                    default:
                        setError((data as any).message || "Error desconocido.");
                }
            } else {
                setError("No hay respuesta del servidor.");
            }
            return false
        }
    }

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
    }

    return { token, login, logout, error, setError }
}
