import { useState, useEffect } from "react";

import ModalBb from "@/BaseComponents/ModalBb";
import FormField from "@/BaseComponents/FormField";
import ButtonOptions from '@/BaseComponents/ButtonOptions';
import JalaliDatePicker from '@/BaseComponents/JalaliDatePicker';
import { LuCircleFadingPlus } from "react-icons/lu";
import { createRandomId } from '@/functions/helper.js';


const ModalAddTranaction = ({ transaction, childChanged }) => {

    const baseTransData = {
        id: createRandomId(),
        type: 'cash',
        reference_no: '',
        amount: '',
        due_date: '',
        description: '',
    };

    const [open, setOpen] = useState(false);
    const [singleTrans, setSingleTrans] = useState(
        transaction ?? baseTransData
    );

    useEffect(() => {
        if (transaction) {
            setSingleTrans(transaction);
            setOpen(true);
        }
    }, [transaction]);

    const updateField = (name, value) => {
        setSingleTrans(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const addTransaction = () => {

        if (singleTrans.amount == '') alert('قیمت اجباری هست');

        childChanged(singleTrans);

        setSingleTrans(baseTransData);
        setOpen(false);
    };

    return (
        <>
            <button className="small secondary" onClick={() => setOpen(true)}>
                <LuCircleFadingPlus />
                افزودن تراکنش
            </button>


            <ModalBb
                id="sdfsdfsdf"
                head="افزودن تراکنش"
                isOpen={open}
                onClose={() => setOpen(false)}
            >

                <ButtonOptions
                    value={singleTrans.type}
                    onChange={(value) => updateField('type', value)}
                    options={[
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
                    ]}
                />

                <FormField
                    name="amount"
                    label="مبلغ"
                    value={singleTrans.amount}
                    onChange={(e) => updateField('amount', e.target.value)}
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
                    value={singleTrans.description}
                    onChange={(e) => updateField('description', e.target.value)}
                />

                <div className="mob-fix">
                    <button onClick={addTransaction}>
                        <span>
                            تایید تراکنش
                        </span>
                    </button>
                </div>

            </ModalBb>

        </>
    )

}

export default ModalAddTranaction;