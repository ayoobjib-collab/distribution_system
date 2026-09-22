import { useEffect, useState } from "react";

function useIsMobile() {

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width:900px)");

        const handleChange = (e) => {
            setIsMobile(e.matches);
        };

        setIsMobile(mediaQuery.matches);

        mediaQuery.addEventListener("change", handleChange);

        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, []);

    return isMobile;
}

export default useIsMobile;