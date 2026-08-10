import { useState, useEffect } from "react";


function NewDarkSwitch() {

    const [lightMode, setLightMode] = useState(function () {
        return localStorage.getItem('lightMode') === 'true'
    });

    //load virtual dom
    useEffect(() => {
        document.documentElement.classList.toggle('light', lightMode);
        localStorage.setItem('lightMode', lightMode);
        document.cookie = `lightMode=${lightMode}; path=/; max-age=31536000; SameSite=Lax`;
    }, [lightMode]);

    const toggleDarkMode = () => {
        setLightMode(prev => !prev);
    }

    return (
        <div
            className="toggle-switch"
        >
            <label className={`switch-label ${lightMode ? 'light' : 'dark'}`}
            >
                <input
                    type="checkbox"
                    className="checkbox"
                    onChange={toggleDarkMode}
                    checked={!lightMode}
                />
                <span className="slider"></span>
            </label>
        </div >
    )
}


export default NewDarkSwitch;