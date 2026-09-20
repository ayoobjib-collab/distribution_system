import { useState } from "react";
import AsyncSelect from "react-select/async";

const SelectCategory = ({ value, setDataInChild, error, required = true, isMulti = true, label = "انتخاب دسته" }) => {

    const [res, setRes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sCats, setSCats] = useState(() => {
        if (Array.isArray(value)) {
            return value.map(category => ({
                value: category.id,
                label: category.name,
            }));
        }
        return value
            ? {
                value: value.id,
                label: value.name,
            }
            : null;
    });

    const searchMe = async () => {

        if (res.length > 0) return;

        setLoading(true);

        try {
            const response = await fetch(`/api/v1/categories`);
            const data = await response.json();

            setRes(
                data.map(category => ({
                    value: category.id,
                    label: category.name,
                }))
            );
        } finally {
            setLoading(false);
        }
    };

    const searchRes = async (inputValue) => {
        return res.filter(item =>
            item.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    const addCat = (selectObject) => {

        let val;

        if (isMulti)
            val = selectObject?.map(sb => sb.value);
        else
            val = selectObject?.value;

        setDataInChild(val);

        setSCats(selectObject ?? []);
    }

    return (
        <div className="form-group ic-search-wrap">
            <AsyncSelect
                isMulti={isMulti}
                classNamePrefix="react-select"
                defaultOptions={res}
                onMenuOpen={searchMe}
                isLoading={loading}
                value={sCats}
                loadOptions={searchRes}
                onChange={addCat}
                placeholder={label}
                noOptionsMessage={() => "موردی یافت نشد"}
                required={required}
                cacheOptions
            />
            {error && (<div>{error}</div>)}
        </div>
    );
}

export default SelectCategory;