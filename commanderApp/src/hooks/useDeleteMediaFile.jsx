import { useState } from "react";

const useDeleteMediaFile = () => {
    const [success, setSuccess] = useState(true);
    const [error, setError] = useState(null); // Estado para manejar errores

    const deleteMediaFile = async (file) => {
        setSuccess(false);
        setError(null); // Reinicia el error al intentar eliminar de nuevo

        try {
            const host = window.location.hostname;
            const response = await fetch(`http://${host}:3000/media`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ file }),
            });

            if (!response.ok) {
                throw new Error("Error al eliminar el archivo");
            }

            setSuccess(true);
        } catch (err) {
            setSuccess(false);
            setError(err.message); // Almacena el mensaje de error
            console.error(err);
        }
    };

    return { deleteMediaFile, success, error };
};

export default useDeleteMediaFile;
