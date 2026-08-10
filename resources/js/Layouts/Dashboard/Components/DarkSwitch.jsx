import { useState, useEffect } from "react";

export default function DarkSwitch({}) {

    const [lightMode, setLightMode] = useState(function () {
        return localStorage.getItem('lightMode') === 'true'
    });

    //load virtual dom
    useEffect(() => {
        document.documentElement.classList.toggle('light', lightMode);
        localStorage.setItem('lightMode', lightMode);
    }, [lightMode]);

    const toggleDarkMode = () => setLightMode(prev => !prev);

    const iconSize = 20;

    return (
        <button
            className={`mode-switch ${lightMode ? 'active' : ''}`}
            onClick={toggleDarkMode}
        >

            <svg className="moon" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width={iconSize} height={iconSize} viewBox="0 0 24 24">
                <defs></defs>
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
            </svg>

            <span className="mode-text mob-hide">
                {lightMode ? 'حالت شب' : 'حالت روز'}
            </span>
        </button>
    )
}