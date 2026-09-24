import { VscAccount } from "react-icons/vsc";
import { CiMobile4 } from "react-icons/ci";
import { Collapse } from 'antd';

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
}

export default CustomerData;