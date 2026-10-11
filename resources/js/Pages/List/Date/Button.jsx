const Button = ({
    size = "medium",
    className = "",
    children = "",
    onClick,
    ...props
}) => {
    const buttonClasses = `wd-button wd-button-${size} ${className}`;

    return (
        <button onClick={onClick} className={buttonClasses} {...props}>
            {children}
        </button>
    );
};

export default Button;