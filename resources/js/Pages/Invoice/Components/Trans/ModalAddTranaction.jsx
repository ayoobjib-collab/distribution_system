import { useState, useEffect, useCallback } from "react";

import ModalBb from "@/BaseComponents/ModalBb";
import FormField from "@/BaseComponents/FormField";
import ButtonOptions from '@/BaseComponents/ButtonOptions';
import JalaliDatePicker from '@/BaseComponents/JalaliDatePicker';
import { LuCircleFadingPlus } from "react-icons/lu";
import { createRandomId } from '@/functions/helper.js';

const typeOptions = [
    {
        value: 'cash',
        label: 'نقد',
        icon: '💵',
    },
    {
        value: 'cheque',
        label: 'چک',
        icon: '🧾',
    },
];

const baseTransData = {
    id: createRandomId(),
    type: 'cash',
    reference_no: '',
    amount: '',
    due_date: '',
    description: '',
};

const getBaseTransData = (id) => {
    return {
        id: id,
        type: 'cash',
        reference_no: '',
        amount: '',
        due_date: '',
        description: '',
    }
};

const ModalAddTranaction = ({ transaction, childChanged, onModalClose }) => {

    const [open, setOpen] = useState(false);
    const [singleTrans, setSingleTrans] = useState(
        transaction ?? getBaseTransData(createRandomId)
    );

    useEffect(() => {
        if (transaction == null) return;
        setSingleTrans(transaction);
        setOpen(true);
    }, [transaction]);

    const updateField = useCallback((name, value) => {
        setSingleTrans(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    const addTransaction = () => {
        if (singleTrans.amount === '') {
            alert('قیمت اجباری هست');
            return;
        }

        childChanged(singleTrans);

        setSingleTrans(baseTransData);
        setOpen(false);
    }

    const openModal = useCallback(() => {
        setOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setSingleTrans(baseTransData);
        setOpen(false);
        onModalClose();
    }, []);

    const updateFormFiled = useCallback((e) => {
        const { name, value } = e.target;
        updateField(name, value);
    }, []);


    console.log(singleTrans.due_date);

    return (
        <>
            <button className="small secondary" onClick={openModal}>
                <LuCircleFadingPlus />
                افزودن تراکنش
            </button>

            <ModalBb
                head="افزودن تراکنش"
                isOpen={open}
                onClose={closeModal}
                footer={(
                    <button onClick={addTransaction} >
                        <span>
                            تایید تراکنش
                        </span>
                    </button>
                )}
            >

                <ButtonOptions
                    name='type'
                    value={singleTrans.type}
                    onChange={updateField}
                    options={typeOptions}
                />

                <FormField
                    name="amount"
                    label="مبلغ"
                    value={singleTrans.amount}
                    onChange={updateFormFiled}
                    type="tel"
                    isAmount={true}
                    required
                />

                {
                    singleTrans.type == 'cheque' &&

                    <div className="due-date">
                        <div className="d-result flex">
                            <span>
                                تاریخ چک:
                            </span>
                            <span>
                                {singleTrans.due_date}
                            </span>
                        </div>

                        <JalaliDatePicker
                            value={singleTrans.due_date}
                            onChange={(v) => updateField('due_date', v)}
                        />
                    </div>
                }

                <FormField
                    name="description"
                    label="توضیح"
                    value={singleTrans.description ?? ''}
                    onChange={updateFormFiled}
                />

            </ModalBb>

        </>
    )

}

export default ModalAddTranaction;