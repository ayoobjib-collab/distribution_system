
import { useRef, useState } from "react";
import Button from "@/BaseComponents/Button";
import FormField from "@/BaseComponents/FormField";
import ModalBb from "@/BaseComponents/ModalBb";
import { MdOutlineMoveUp } from "react-icons/md";
import { useForm, usePage } from '@inertiajs/react';
import ClientSearch from "./ClientSearch";
import { toast } from 'react-toastify';
import { formatAmount } from '@/functions/helper.js';

function ModalMoveCheque({ chequeId, price, due_date, date_fa, payerId, payerName }) {

    const { msg } = usePage();

    const { data, setData, processing, post, reset, errors } = useForm({
        cheque_id: chequeId,
        payer_id: payerId,
        receiver_id: '',
        comment: '',

        trans_price: 0,
        trans_interest_rate: 4,
        trans_comment: ''
    });

    const [isOpen, setIsOpen] = useState(false);
    const [showTrans, setshowTrans] = useState(false);

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

    const addReciver = (option) => {
        setData('receiver_id', option.value);
    };

    function createNewLog(e) {

        e.preventDefault();

        post('/logs', {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                toast.success(msg);
                setIsOpen(false);
            }
        })
    }

    function calcInterestMountly(price, dueDate, interestRate) {

        const chequeAmount = Number(price);

        if (Number.isNaN(chequeAmount)) return '';

        const today = new Date();
        const due = new Date(dueDate);

        if (Number.isNaN(due.getTime())) return chequeAmount;

        const diffTime = due.getTime() - today.getTime();

        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const interestMonths = Math.ceil((diffDays / 30) * interestRate);

        const res = (chequeAmount * 100) / (100 + interestMonths);

        // Round price
        return (Math.ceil(res / 1000)) * 1000; 
    }

    function setTransPrice(e) {

        addFormData(e);

        let percent = Number(e.target.value);

        let n = calcInterestMountly(price, due_date, percent);

        setData('trans_price', n);
    }

    return (
        <>
            <MdOutlineMoveUp
                size={25}
                onClick={() => setIsOpen(true)}
            />


            <ModalBb
                isOpen={isOpen}
                head=" انتقال یک چک"
                onClose={() => setIsOpen(false)}
            >

                <form onSubmit={createNewLog}>

                    <div className={showTrans ? 'hide' : ''}>
                        <FormField
                            name="payer_name_no_need_in_form"
                            error={errors.payer_id}
                            label="انتقال چک از:"
                            value={payerName}
                            readOnly={true}
                        />

                        <ClientSearch
                            childChanged={addReciver}
                            error={errors.receiver_id}
                        />

                        <FormField
                            name="comment"
                            onChange={addFormData}
                            error={errors.comment}
                            label="توضیحات"
                            value={data.comment}
                        />
                    </div>

                    <FormField
                        name=""
                        customClass="without-bg"
                        onChange={() => setshowTrans(!showTrans)}
                        type="checkbox"
                        label="افزودن تراکنش برگشت"
                        value={showTrans}
                    />

                    {showTrans &&
                        (
                            <div className="trans-form">

                                <div className="cheque-trans flex justify-between pb-5">
                                    <span>
                                        مبلغ : <b>{formatAmount(price)}</b>
                                    </span>

                                    <span>
                                        تاریخ : <b>{date_fa}</b>
                                    </span>
                                </div>

                                <FormField
                                    name="trans_interest_rate"
                                    onChange={setTransPrice}
                                    type="tel"
                                    error={errors.interest_rate}
                                    label="درصد سود(بین 4 تا 7)"
                                    value={data.interest_rate}
                                />

                                <FormField
                                    name="trans_price"
                                    type="tel"
                                    onChange={addFormData}
                                    error={errors.trans_price}
                                    label="مبلغ واریزی"
                                    value={formatAmount(data.trans_price)}
                                    isAmount={true}
                                />

                                <FormField
                                    name="trans_comment"
                                    onChange={addFormData}
                                    error={errors.trans_comment}
                                    label="توضیحات تراکنش"
                                    value={formatAmount(data.trans_comment)}
                                />

                            </div>
                        )
                    }

                    <Button isLoading={processing} />

                </form>

            </ModalBb>
        </>
    )
}

export default ModalMoveCheque;