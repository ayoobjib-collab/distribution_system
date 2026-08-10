import DashboardLayout from "@/Layouts/Dashboard/Layout";
import FormField from "@/BaseComponents/FormField";
import { useForm } from "@inertiajs/react";
import { useState, useEffect } from 'react'
import Button from "@/BaseComponents/Button";

import { toast } from 'react-toastify';

import ClientSearch from "../Cheque/Components/ClientSearch";

import Select from 'react-select';

function CreateTrans({ sendUrl, transactionType, msg }) {

    const { data, setData, processing, post, reset, errors } = useForm(
        {
            type: '',
            price: '',
            payer_id: '',
            receiver_id: '',
            comment: ''
        }
    );

    useEffect(() => {
        if (msg)
            toast.success(msg);
    }, msg);

    function addSelectData(option, data = 'payer_id') {
        setData(data, option.value);
    }

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

        post(sendUrl, {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            }
        })
    }

    return (
        <>
            <section>

                <div className="form-wrap">

                    <form action="" onSubmit={submitForm}>

                        <FormField
                            name="price"
                            type="tel"
                            label="مبلغ"
                            value={data.price}
                            onChange={addFormData}
                            error={errors.price}
                            required
                        />

                        <div className="form-group">
                            <Select
                                classNamePrefix="react-select"
                                defaultValue='انتخاب نوع تراکنش'
                                isClearable={true}
                                isRtl={true}
                                isSearchable
                                name="type"
                                // value={data.type}
                                options={transactionType}
                                placeholder=''
                                onChange={(o) => addSelectData(o, 'type')}
                            />
                            <label htmlFor="exporter">نوع تراکنش</label>
                            {errors.type && <div className="errors">{errors.type}</div>}
                        </div>

                        <ClientSearch
                            label='تراکنش از'
                            childChanged={(option) => addSelectData(option, 'payer_id')}
                            error={errors.owner}
                        />

                        <ClientSearch
                            label='برای شخص'
                            childChanged={(option) => addSelectData(option, 'receiver_id')}
                            error={errors.owner}
                        />

                        <FormField
                            name="comment"
                            label="توضیحات"
                            value={data.comment}
                            onChange={addFormData}
                            error={errors.comment}
                            required
                        />

                        <Button isLoading={processing} />

                    </form>

                </div>

            </section>
        </>
    )
}

CreateTrans.layout = page => <DashboardLayout children={page} h1="ایجاد یک  تراکنش" />

export default CreateTrans;