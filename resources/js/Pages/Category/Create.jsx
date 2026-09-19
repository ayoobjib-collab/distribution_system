import DashboardLayout from "@/Layouts/Dashboard/Layout";
import FormField from "@/BaseComponents/FormField";
import Button from "@/BaseComponents/Button";
import { useForm, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "react-toastify";


function CreateCategory({ category, sendUrl }) {

    const {
        data,
        setData,
        processing,
        post,
        put,
        reset,
        errors
    } = useForm({
        name: category?.name ?? '',
        slug: category?.slug ?? '',
    });


    function addFormData(e) {
        const { id, value } = e.target;
        setData(id, value);
    }


    function submitForm(e) {

        e.preventDefault();

        // Create
        if (category === undefined) {

            post(sendUrl, {
                preserveScroll: true,

                onSuccess: () => {
                    reset();
                }
            });

        }

        // Update
        else {

            put(sendUrl, {
                preserveScroll: true,

                onSuccess: () => {
                    reset();
                }
            });

        }
    }


    return (
        <>
            <section>

                <div className="form-wrap">

                    <form action="" onSubmit={submitForm}>

                        <FormField
                            name="name"
                            label="عنوان دسته‌بندی"
                            value={data.name}
                            onChange={addFormData}
                            error={errors.name}
                        />

                        <FormField
                            name="slug"
                            label="نامک (Slug)"
                            value={data.slug}
                            onChange={addFormData}
                            error={errors.slug}
                        />

                        <Button isLoading={processing} />

                    </form>

                </div>

            </section>
        </>
    );
}


CreateCategory.layout = page => (
    <DashboardLayout
        children={page}
        h1="ایجاد دسته‌بندی"
    />
);

export default CreateCategory;