import { memo, useCallback } from "react";
import { AiOutlineDelete } from "react-icons/ai";

const Quantity = memo(({
    name,
    value,
    label,
    onChange,
    onRemove,
    min = 0,
    max = 999
}
) => {

    const increase = useCallback(() => {
        if (value < max) onChange(name, value + 1);
    }, [value, max, onChange]);

    const decrease = useCallback(() => {
        if (value > min) onChange(name, value - 1);
    }, [value, min, onChange]);

    const setValue = useCallback((e) => {
        const val = Number(e.target.value);
        if (Number.isNaN(val)) return;
        const v = Math.min(Math.max(val, min), max);
        onChange(name, v);
    }, [name, min, max, onChange]);

    return (
        <div className="quantity flex">

            <label>{label}</label>

            <div className="qty-input flex">
                <button
                    type="button"
                    onClick={increase}
                    disabled={value >= max}
                    className='qty-count qty-count--add'
                >
                    +
                </button>

                <input type="tel" value={value} onChange={setValue} />

                {value <= 1 && onRemove ? (
                    <button
                        onClick={onRemove}
                        className='qty-remove'
                    >
                        <AiOutlineDelete size={20} />
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={decrease}
                        disabled={value <= min}
                        className='qty-count qty-count--minus'
                    >
                        −
                    </button>
                )}
            </div>
        </div>
    );
});

export default Quantity;