import Select from 'react-select';

const SelectCategory = ({ value = [], cats = [], setDataInChild, error }) => {

    const addCat = (selectObject) => {
        //component rerender again and fetch data form db
        let val = selectObject?.map(sb => sb.value);
        setDataInChild('categories', val);
    }

    const selectedOptions = value.map(category => ({
        value: category.id,
        label: category.name,
    }));

    return (
        <div className="form-group ic-search-wrap">
            <Select
                isMulti
                classNamePrefix="react-select"
                value={selectedOptions}
                options={cats}
                name="categories"
                onChange={addCat}
                placeholder="انتخاب دسته"
                required
            />
            {error && (<div>{error}</div>)}
        </div>
    );
}

export default SelectCategory;