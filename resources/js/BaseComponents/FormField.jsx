import React, { memo, useCallback } from "react";
import { formatAmount, reFromatAmount, faToEn } from "@/functions/helper.js";

// 1. بسته‌بندی با memo برای جلوگیری از رندرهای بیهوده والد
const FormField = memo(function FormField({
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

    const displayValue = (name == 'price' || isAmount) ? formatAmount(value) : value;

    const onChangeByFilterData = useCallback((e) => {
        const { type, value } = e.target;
        var customEvent = { ...e };

        if (type == 'tel')
            customEvent.target.value = faToEn(value);

        if (name == 'price' || isAmount)
            customEvent.target.value = reFromatAmount(value);

        onChange(customEvent);
        
    }, [name, isAmount, onChange]); 

    const commonProps = { name, id: name, required, placeholder, readOnly };

    return (
        <div className={classes}>
            {isSelect ? (
                <select {...commonProps} value={value ?? ""} onChange={onChange}>
                    {placeholder && <option value="" disabled>{placeholder}</option>}
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            ) : isTextarea ? (
                <textarea {...commonProps} value={displayValue ?? ""} onChange={onChangeByFilterData} />
            ) : (
                <input {...commonProps} type={type} value={displayValue}
                    checked={isCheckbox ? !!value : undefined} onChange={onChangeByFilterData} />
            )}

            <label htmlFor={name}>{label + (required ? ' (*)' : '')}</label>
            {error && <div className="errors">{error}</div>}
        </div>
    );
});

export default FormField;