import DashboardLayout from "@/Layouts/Dashboard/Layout";
import FormField from "@/BaseComponents/FormField";
import { useForm, usePage } from "@inertiajs/react";
import { useState, useEffect } from 'react'
import Button from "@/BaseComponents/Button";

import { toast } from 'react-toastify';

import Select from 'react-select';

function CreateUser({ sendUrl, product }) {

    const { msg } = usePage().props;

    useEffect(() => {
        if (msg)
            toast.success(msg);
    }, [msg]);

    const { data, setData, processing, post, put, reset, errors } = useForm(
        {
            name: product?.name ?? '',
            sale_price: product?.sale_price ?? 0,
            unit: product?.unit ?? 'عدد',
            stock: product?.stock ?? 0,
            description: product?.description ?? '',
            is_active: product?.is_active ?? true
        }
    );

    // const selectedBank = banks.find(i => i.value == data.bank) || null;

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
        if ( product == undefined) {
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


    return (
        <>
            <section>

                <div className="form-wrap">

                    <form action="" onSubmit={submitForm}>


                        <FormField
                            name="name"
                            label="عنوان محصول"
                            value={data.name}
                            onChange={addFormData}
                            error={errors.name}
                        />

                        <FormField
                            name="stock"
                            type="tel"
                            label="تعداد"
                            value={data.stock}
                            onChange={addFormData}
                            error={errors.stock}
                        />

                        <FormField
                            name="sale_price"
                            type="tel"
                            label="قیمت فروش"
                            value={data.sale_price}
                            onChange={addFormData}
                            error={errors.sale_price}
                            isAmount={true}
                        />

                        <FormField
                            name="unit"
                            label="واحد"
                            value={data.unit}
                            onChange={addFormData}
                            error={errors.unit}
                        />

                        <FormField
                            name="description"
                            label="توضیحات"
                            value={data.description}
                            onChange={addFormData}
                            error={errors.description}
                        />

                        <FormField
                            name="is_active"
                            type="checkbox"
                            label="وضعیت فعال بودن"
                            // customClass="without-bg"
                            value={data.is_active}
                            onChange={(e) => {
                                const isChecked = e.target.checked;
                                setData('is_active', isChecked);
                            }}
                        />

                        <Button isLoading={processing} />

                    </form>

                </div>

            </section>
        </>
    )
}

CreateUser.layout = page => <DashboardLayout children={page} h1="ایجاد محصول" />

export default CreateUser;