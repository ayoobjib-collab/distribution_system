import DashboardLayout from "@/Layouts/Dashboard/Layout";
import FormField from "@/BaseComponents/FormField";
import { useForm } from "@inertiajs/react";
import Button from "@/BaseComponents/Button";


function CreateUser({ sendUrl, user }) {

    const { data, setData, processing, post, put, reset, errors } = useForm(
        {
            mobile: user?.mobile ?? '',
            full_name: user?.full_name ?? '',
            is_active: user?.is_active ?? true
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
        if (user == undefined) {
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
                            name="mobile"
                            type="tel"
                            label="شماره تماس"
                            value={data.mobile}
                            onChange={addFormData}
                            error={errors.mobile}
                            required
                        />

                        <FormField
                            name="full_name"
                            type="text"
                            label="نام و نام خانوادگی"
                            value={data.full_name}
                            onChange={addFormData}
                            error={errors.full_name}
                            required
                        />

                        <FormField
                            name="deActiveUser"
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

CreateUser.layout = page => <DashboardLayout children={page} />

export default CreateUser;