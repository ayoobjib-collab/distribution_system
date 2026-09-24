import "@/../css/components/button-options.css";
import React from "react";

function ButtonOptions({
    options = [],
    value,
    onChange,
    className
}) {

    let lastKey = options.length - 1;

    return (
        <div className={`button-options ${className}`}>

            {options.map((option, key) => {

                const isActive = value === option.value;

                return (
                    <React.Fragment key={option.value}>

                        <span
                            type="button"
                            className={`option-btn ${isActive ? 'active' : ''}`}
                            onClick={() => onChange(option.value)}
                        >
                            {option.icon && (
                                <span className="option-btn-icon">
                                    {option.icon}
                                </span>
                            )}

                            <span>{option.label}</span>
                        </span>

                        {
                            key !== lastKey && <span key={option.value} className="divider"></span>
                        }

                    </React.Fragment>
                );

            })}

        </div >
    );
}

export default ButtonOptions;