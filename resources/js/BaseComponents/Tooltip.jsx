import '@/../css/components/tooltip.css';

function Tooltip({ children, text, className = '' }) {
    return (
        <div
            className={`tooltip ${className}`}
        >
            {children}

            <span className="tooltiptext tooltip-top">
                {text}
            </span>
        </div>
    )
}

export default Tooltip;