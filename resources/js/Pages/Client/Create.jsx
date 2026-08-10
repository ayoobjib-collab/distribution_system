import DashboardLayout from "@/Layouts/Dashboard/Layout";
import FormField from "@/BaseComponents/FormField";
import { useForm } from "@inertiajs/react";
import { useState, useEffect } from 'react'
import Button from "@/BaseComponents/Button";

import { toast } from 'react-toastify';

function CreateClient({ sendUrl, clientType, msg }) {

    const { data, setData, processing, post, reset, errors } = useForm({
        name: '',
        phone: '',
        type: 'payer',
    });


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
                toast.success("عملیات با موفقیت انجام شد!");
            }
        })
    }

    return (
        <>
            <section>

                <div className="form-wrap">

                    {msg && (<div className='errors top'>{msg}</div>)}

                    <form action="" onSubmit={submitForm}>

                        <FormField
                            name="name"
                            label="عنوان"
                            value={data.name}
                            onChange={addFormData}
                            error={errors.name}
                            required
                        />

                        <FormField
                            name="phone"
                            type="tel"
                            label="شماره تماس"
                            value={data.phone}
                            onChange={addFormData}
                            error={errors.phone}
                            required
                        />

                        <FormField
                            name="type"
                            type="select"
                            label="نوع"
                            value={data.type}
                            onChange={addFormData}
                            error={errors.type}
                            options={clientType}
                        />

                        <Button isLoading={processing} />

                    </form>

                </div>

            </section>
        </>
    )
}

CreateClient.layout = page => <DashboardLayout children={page} h1="ایجاد یک طرف حساب" />

export default CreateClient;