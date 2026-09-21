import { useState } from 'react';

const Quantity = ({ value, label, onChange, min = 0, max = 999 }) => {

    const increase = () => {
        if (value < max) {
            onChange(value + 1);
        }
    };

    const decrease = () => {
        if (value > min) {
            onChange(value - 1);
        }
    };

    return (
        <div className="quantity flex gap-1">

            <label>
                {label}
            </label>

            <div className="qty-input flex ">

                <button
                    type="button"
                    onClick={increase}
                    disabled={value >= max}
                    className='qty-count qty-count--add'
                >
                    +
                </button>

                <span>{value}</span>

                <button
                    type="button"
                    onClick={decrease}
                    disabled={value <= min}
                    className='qty-count qty-count--minus'
                >
                    −
                </button>

            </div>
        </div>
    );
};

export default Quantity;