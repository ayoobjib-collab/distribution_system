import { VscAccount } from "react-icons/vsc";
import { CiMobile4 } from "react-icons/ci";
import { TbProgressAlert } from "react-icons/tb";

function CustomerData({ customer_name, customer_number, userFullName }) {


    return (
        <div className="container-wrapper">
            <div className="info-card">
                <div className="card-header">اطلاعات فروشگاه</div>
                <div className="card-body">
                    <div className="info-row">
                        <span>فروشگاه:</span> <b>{customer_name}</b>
                    </div>
                    <div className="info-row">
                        <span>شماره فروشگاه:</span> <b>{customer_number}</b>
                    </div>
                </div>
            </div>

            <div className="info-card">
                <div className="card-header">اطلاعات معرف</div>
                <div className="card-body">
                    <div className="info-row">
                        <span>نام:</span> <b>{userFullName}</b>
                    </div>
                    <div className="info-row">
                        <span>شماره:</span> <b>{customer_number}</b>
                    </div>
                </div>
            </div>
        </div>
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