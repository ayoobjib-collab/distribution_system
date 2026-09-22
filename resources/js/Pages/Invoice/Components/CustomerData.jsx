import { VscAccount } from "react-icons/vsc";
import { CiMobile4 } from "react-icons/ci";
import { Collapse, Divider } from 'antd';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

function CustomerData({ customer_name, customer_number, userFullName }) {


    const CustomerInfo = () => {
        return (
            <>
                <div className="info-row">
                    <span>فروشگاه:</span> <b>{customer_name}</b>
                </div>
                <div className="info-row">
                    <span>شماره فروشگاه:</span> <b>{customer_number}</b>
                </div>
            </>
        )
    }


    const Urloo = (
        <div className="card-body">
            <div className="info-row">
                <span>نام:</span> <b>{userFullName}</b>
            </div>
            <div className="info-row">
                <span>شماره:</span> <b>{customer_number}</b>
            </div>
        </div>
    );

    return (
        <>
            <div className="container-wrapper">
                <div className="info-card">
                    <Collapse
                        items={
                            [
                                {
                                    key: '1',
                                    label: 'اطلاعات فروشگاه',
                                    children: < CustomerInfo />
                                }
                            ]
                        }
                    />
                </div>

                <div className="info-card">
                    <Collapse
                        items={
                            [
                                {
                                    key: '1',
                                    label: 'اطلاعات معرف',
                                    children: Urloo
                                }
                            ]
                        }
                    />
                </div>
            </div>
        </>

    );

    return (
        <>


            <div className="data-box flex flex-col gap-1">

                <div className="db-title">
                    اطلاعات فروشگاه
                </div>

                <div className="db-content flex gap-1">

                    <div className='flex gap-1'>
                        <span>
                            <VscAccount size={20} />
                            <span className="ml-2">
                                فروشگاه :
                            </span>
                        </span>
                        <b>{customer_name}</b>
                    </div>

                    <div className='flex gap-1'>
                        <span>
                            <CiMobile4 size={22} />
                            <span className="ml-2">
                                شماره فروشگاه :
                            </span>
                        </span>
                        <b>{customer_number}</b>
                    </div>

                </div>

            </div>

            <div className="data-box flex flex-col gap-1">

                <div className="db-title">
                    اطلاعات معرف
                </div>

                <div className="db-content flex gap-1">

                    <div className='flex gap-1'>
                        <span>
                            <VscAccount size={20} />
                            <span className="ml-2">
                                نام :
                            </span>
                        </span>
                        <b>{userFullName}</b>
                    </div>

                    <div className='flex gap-1'>
                        <span>
                            <CiMobile4 size={22} />
                            <span className="ml-2">
                                شماره :
                            </span>
                        </span>
                        <b>{customer_number}</b>
                    </div>

                </div>

            </div>

        </>
    )
}

export default CustomerData;