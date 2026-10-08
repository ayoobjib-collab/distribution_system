import '@/../css/components/tooltip.css';

function Tooltip({ onClick, children, text, className = '' }) {
    return (
        <div
            className={`tooltip ${className}`}
            onClick={onClick}
        >
            {children}

            <span className="tooltiptext tooltip-top">
                {text}
            </span>
        </div>
    )
}

export default Tooltip;