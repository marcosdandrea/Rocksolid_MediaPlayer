import { useState } from "react";

const usePostMediaFile = () => {

    const [failed, setIsFailed] = useState(false)
    const [isPosting, setIsPosting] = useState(false)

    const postMediaFile = async (file) => {
        setIsPosting(true)
        setIsFailed(false)
        const formData = new FormData();
        formData.append('video', file);
        const host = window.location.hostname
        try {
            await fetch(`http://${host}:3000/media`, {
                method: 'POST',
                body: formData,
            })
        } catch (err) {
            console.error(err)
            setIsFailed(true)
        } finally {
            setIsPosting(false)
        }

    }

    return {postMediaFile, isPosting, failed};

}

export default usePostMediaFile;