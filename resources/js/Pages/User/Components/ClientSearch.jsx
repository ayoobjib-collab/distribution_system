import AsyncSelect from 'react-select/async';
import { useEffect, useState } from 'react';

function ClientSearch({ childChanged, error, value, label = "دریافت کننده" }) {

    const [client, setClient] = useState(value);

    const getClients = async (inputValue) => {

        if (!inputValue) return [];

        const res = await fetch(`/clients/search?q=${encodeURIComponent(inputValue)}`);
        const data = await res.json();

        return data;
    };

    function handleChildChange(option) {
        setClient(option);
        childChanged(option);
    }

    return (
        <>
            <div className="form-group">
                <AsyncSelect
                    classNamePrefix="react-select"
                    cacheOptions
                    // defaultOptions
                    loadOptions={getClients}
                    value={client}
                    onChange={handleChildChange}
                    placeholder=""
                    noOptionsMessage={() => "موردی یافت نشد"}
                    isClearable
                />
                <label htmlFor="exporter">{label}</label>
                {error && <div className="errors">{error}</div>}
            </div>
        </>
    )
}

export default ClientSearch;