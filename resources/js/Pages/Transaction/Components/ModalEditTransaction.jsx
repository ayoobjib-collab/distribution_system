import { useRef, useState } from "react";
import Button from "@/BaseComponents/Button";
import FormField from "@/BaseComponents/FormField";
import ModalBb from "@/BaseComponents/ModalBb";
import { FiEdit } from "react-icons/fi";
import Select from 'react-select';
import { usePage, useForm } from "@inertiajs/react";
import { toast } from 'react-toastify';

function ModalEditTransaction({ id, price, type, type_label, comment }) {

    const { data, setData, processing, put, reset, errors } = useForm({
        id: id,
        price: price,
        type: type,
        comment: comment
    });


    const [isOpen, setIsOpen] = useState(false);

    //Get transaction type from controller
    const { msg, transactionType } = usePage().props;

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

    function addSelectData(option, data = 'payer_id') {
        setData(data, option.value);
    }

    function updateTrans(e) {

        e.preventDefault();

        put(`/transaction/${id}`, {

            preserveScroll: true,

            onSuccess: () => {
                setIsOpen(false);
                toast.success(msg);
            }
        })
    }

    return (
        <>
            <FiEdit
                size={24}
                onClick={() => setIsOpen(true)}
            />

            <ModalBb
                isOpen={isOpen}
                head="ویرایش یک تراکنش"
                onClose={() => setIsOpen(false)}
            >

                <form onSubmit={updateTrans}>

                    <FormField
                        name="type"
                        onChange={addFormData}
                        type="select"
                        label="نوع تراکنش"
                        value={data.type}
                        error={errors.type}
                        options={transactionType}
                    />

                    <FormField
                        name="price"
                        onChange={addFormData}
                        type="tel"
                        label="مبلغ تراکنش"
                        value={data.price}
                        error={errors.price}
                    />

                    <FormField
                        name="comment"
                        onChange={addFormData}
                        label="توضیحات"
                        value={data.comment}
                        error={errors.comment}
                    />

                    <Button isLoading={processing} />

                </form>

            </ModalBb>

        </>
    )
}

export default ModalEditTransaction;