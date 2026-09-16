import ModalBb from "@/BaseComponents/ModalBb";
import FormField from "@/BaseComponents/FormField";

import { SiDatabricks } from "react-icons/si";
import { AiOutlineEdit } from "react-icons/ai";
import { useState } from "react";

function ModalAddPayMethod({ pay_method, childChanged }) {

    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="flex flex-col gap2" style={{ marginBottom: 5 }}>
                <h3>
                    <SiDatabricks size={24} />
                    <span className="ml-2">
                        اطلاعات پرداخت
                    </span>
                </h3>
            </div >

            <section>

                <div>
                    <span>
                        ویرایش نحوه پرداخت
                    </span>
                    <span onClick={() => setOpen(true)} >
                        <AiOutlineEdit size={24} />
                    </span>
                </div>

            </section>


            <ModalBb
                id="sdfsdfsdf"
                head="اطلاعات پرداخت فاکتور"
                isOpen={open}
                onClose={() => setOpen(false)}
            >
                <FormField
                    name='cach_amount'
                    label='مبلغ نقد'
                    value
                    onChange={childChanged}
                    type="tel"
                    errors
                    isAmount={true}
                />

                <FormField
                    name='check_amount'
                    label='مبلغ چک'
                    value
                    onChange={childChanged}
                    type="tel"
                    errors
                    isAmount={true}
                />

            </ModalBb>
        </>
    )

}

export default ModalAddPayMethod;