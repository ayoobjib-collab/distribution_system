import React from "react";
import { formatAmount, reFromatAmount } from "@/functions/helper.js";

function FormField({
    name,
    type = "text",
    label,
    value,
    onChange,
    error,
    required = false,
    placeholder = "",
    options = [],
    readOnly = false,
    customClass = "",
    isAmount = false
}) {

    const isSelect = type === "select";
    const isTextarea = type === "textarea";
    const isCheckbox = type === "checkbox";

    const classes = `form-group ${type} ${customClass}`;

    // Display value for price fields
    const displayValue = (name == 'price' || isAmount) ? formatAmount(value) : value;

    function onChangeByFilterData(e) {
        const { id, type, value, checked } = e.target;

        var customEvent = e;
        if (name == 'price' || isAmount)
            customEvent.target.value = reFromatAmount(value);

        onChange(customEvent);
    }

    const commonProps = {
        name,
        id: name,
        required,
        placeholder,
        readOnly,
    };

    return (
        <div className={classes}>
            {isSelect ? (
                <select
                    {...commonProps}
                    value={value ?? ""}
                    onChange={onChange}
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}

                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            ) : isTextarea ? (
                <textarea
                    {...commonProps}
                    value={displayValue ?? ""}
                    onChange={onChangeByFilterData}
                />
            ) : (
                <input
                    {...commonProps}
                    type={type}
                    value={displayValue}
                    checked={isCheckbox ? !!value : undefined}
                    onChange={onChangeByFilterData}
                />
            )}

            <label htmlFor={name}>{label}</label>
            {error && <div className="errors">{error}</div>}
        </div>
    );
}

export default FormField;