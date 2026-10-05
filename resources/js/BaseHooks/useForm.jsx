import { useForm } from "@inertiajs/react"

function useForm(defaultData) {

    const { data, setData, processing, post, put, reset, errors } = useForm(
        {
            mobile: user?.mobile ?? '',
            full_name: user?.full_name ?? '',
            is_active: user?.is_active ?? true
        }
    );

    function addFormData(e) {
        const { id, type, value, checked } = e.target;

        setData((prevData) => {
            let val = type === 'checkbox' ? checked : value;
            return {
                ...prevData,
                [id]: val
            }
        });
    }

    function submitForm(e) {

        e.preventDefault();

        //Create new
        if (user == undefined) {
            post(sendUrl, {
                preserveScroll: true,
                onSuccess: () => {

                }
            })

            //Update
        } else {
            put(sendUrl, {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                }
            })
        }
    }

    return {
        sendForm,
        addToForm
    }
}