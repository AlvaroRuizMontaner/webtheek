import { useState, useEffect } from 'react';

// Una alternativa usando librería es usar next-themes junto con su provider, que ahorra posibles problemas de SSR y FOUC

const useTheme = () => {
    const [theme, setTheme] = useState(''); // Vacío para evitar FOUC inicialmente
    const [isMounted, setIsMounted] = useState(false); // evita errores relacionados con el renderizado en el lado del servidor (SSR).


    //  sincroniza el estado local del tema con el valor persistente en el navegador
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'system'; //system significa que el tema predeterminado será el basado en las preferencias del sistema operativo.
        setTheme(savedTheme);
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted) {
            const root = window.document.documentElement;

            if (theme === 'system') { // Sincronza con la configuración del sistema operativo
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches; // Usa la API matchMedia para consultar si el usuario tiene configurado el tema oscuro en su sistema operativo
                root.classList.add(prefersDark ? 'dark' : 'light');
                root.classList.remove(prefersDark ? 'light' : 'dark'); // Elimina la clase contraria a la que se acaba de añadir
            } else { // Se usa cuando el usuario ha elegido explícitamente un tema (oscuro o claro), ignorando las preferencias del sistema.
                root.classList.add(theme);
                root.classList.remove(theme === 'dark' ? 'light' : 'dark');
            }

            localStorage.setItem('theme', theme);
        }
    }, [theme, isMounted]);

    return { theme, setTheme };
};

export default useTheme;