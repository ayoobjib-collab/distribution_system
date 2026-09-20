import DashboardLayout from "@/Layouts/Dashboard/Layout";
import FormField from "@/BaseComponents/FormField";
import { useForm } from "@inertiajs/react";
import Button from "@/BaseComponents/Button";

import UploadBox        from "./Components/UploadBox";
import SelectCategory   from "./Components/SelectCategory";

function Create({ sendUrl, product, h1 }) {

    const { data, setData, processing, post, reset, errors } = useForm(
        {
            _method: 'PUT', //PUT method not support xhttp-form-data so by add this line and send reqeust by post method you can send file by request
            name: product?.name ?? '',
            sale_price: product?.sale_price ?? 0,
            unit: product?.unit ?? 'عدد',
            stock: product?.stock ?? 0,
            description: product?.description ?? '',
            is_active: product?.is_active ?? true,
            old_image: product?.image ?? [],
            image: product?.image ?? [],

            categories: product?.categories ?? [],
        }
    );

    const imageErrors = Object.entries(errors)
        .filter(([key]) => key.startsWith('image.'))
        .flatMap(([, messages]) => messages);

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
        if (product == undefined) {

            data._method = 'POST';

            post(sendUrl, {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                }
            })

            //Update
        } else {
            //Use POST instead of PUT for send file
            post(sendUrl, {
                preserveScroll: true,
                forceFormData: true,
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

                        <UploadBox
                            name="image"
                            label="تصاویر"
                            value={data.old_image}
                            setDataInChild={setData}
                            error={imageErrors}
                        />

                        <SelectCategory
                            value={data.categories}
                            setDataInChild={setData}
                            error={errors.categories}
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

Create.layout = page => <DashboardLayout children={page} h1={page.props.h1} />

export default Create;