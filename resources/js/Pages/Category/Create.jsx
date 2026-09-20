import DashboardLayout from "@/Layouts/Dashboard/Layout";
import FormField from "@/BaseComponents/FormField";
import Button from "@/BaseComponents/Button";
import { useForm } from "@inertiajs/react";
import SelectCategory from "../Product/Components/SelectCategory";

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
        parent_id: category?.parent_id ?? null,
    });

    const catErrors = Object.entries(errors)
        .filter(([key]) => key.startsWith('categor.'))
        .flatMap(([, messages]) => messages);

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

                        <SelectCategory
                            value={category?.parent ?? {}}
                            setDataInChild={(v) => setData('parent_id', v)}
                            error={catErrors}
                            isMulti={false}
                            required={false}
                            label="دسته والد"
                        />

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