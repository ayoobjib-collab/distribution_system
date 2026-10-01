import { AiOutlineDelete } from "react-icons/ai";

const Quantity = ({ value, label, onChange, onRemove, min = 0, max = 999 }) => {

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

    const setValue = (e) => {
        const value = Number(e.target.value);
        if (Number.isNaN(value)) return;
        const v = Math.min(Math.max(value, min), max);
        onChange(v);
    }

    return (
        <div className="quantity flex">

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

                <input type="tel" name="" value={value} onChange={setValue} />

                {
                    value <= 1 && onRemove
                        ?
                        <button
                            onClick={onRemove}
                            className='qty-remove'
                        >
                            <AiOutlineDelete size={20} />
                        </button>
                        :
                        <button
                            type="button"
                            onClick={decrease}
                            disabled={value <= min}
                            className='qty-count qty-count--minus'
                        >
                            −
                        </button>

                }

            </div>
        </div>
    );
};

export default Quantity;