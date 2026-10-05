import DashboardLayout from "@/Layouts/Dashboard/Layout";
import FormField from "@/BaseComponents/FormField";
import { useForm } from "@inertiajs/react";
import Button from "@/BaseComponents/Button";


function CreateUser({ sendUrl, account }) {

    const { data, setData, processing, post, put, reset, errors } = useForm(
        {
            name: account?.name ?? '',
            type: account?.type ?? 'store',
            mobile: account?.mobile ?? '',
            phone: account?.phone ?? '',
            national_code: account?.national_code ?? '',
            economic_code: account?.economic_code ?? '',
            address: account?.address ?? '',
            lat: account?.lat ?? '',
            long: account?.long ?? '',
            is_active: account?.is_active ?? true,
        }
    );

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
        if (account == undefined) {
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
                            type="text"
                            label="نام فروشگاه"
                            value={data.name}
                            onChange={addFormData}
                            error={errors.name}
                            required={true}
                        />

                        <FormField
                            name="mobile"
                            type="tel"
                            label="شماره موبایل"
                            value={data.mobile}
                            onChange={addFormData}
                            error={errors.mobile}
                            required={true}
                        />

                        <FormField
                            name="phone"
                            type="tel"
                            label="شماره تلفن"
                            value={data.phone}
                            onChange={addFormData}
                            error={errors.phone}
                        />

                        <FormField
                            name="national_code"
                            type="tel"
                            label="کد ملی صاحب فروشگاه"
                            value={data.national_code}
                            onChange={addFormData}
                            error={errors.national_code}
                        />

                        <FormField
                            name="economic_code"
                            type="text"
                            label="کد اقتصادی"
                            value={data.economic_code}
                            onChange={addFormData}
                            error={errors.economic_code}
                        />

                        <FormField
                            name="address"
                            type="text"
                            label="آدرس"
                            value={data.address}
                            onChange={addFormData}
                            error={errors.address}
                        />

                        <Button isLoading={processing} />

                    </form>

                </div>

            </section>
        </>
    )
}

CreateUser.layout = page => <DashboardLayout children={page} />

export default CreateUser;