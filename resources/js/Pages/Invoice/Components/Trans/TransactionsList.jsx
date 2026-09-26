import { memo } from "react";

import Tooltip from '@/BaseComponents/Tooltip';
import { formatAmount } from "@/functions/helper";

import { SiDatabricks } from "react-icons/si";
import { AiOutlineEdit } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import { Collapse } from 'antd';

const TransactionsList = memo(({ transactions, onEdit, onRemove }) => {

    const List = () => {
        return (
            <>
                {Array.isArray(transactions) &&

                    transactions.map((t, index) => {

                        let typeLabel = (t.type === 'cash') ? 'نقد' : 'چک';

                        return (
                            <div key={t.id} className="flex justify-between mb-8">
                                <b>
                                    {`${typeLabel} : ${formatAmount(t.amount)}`}
                                </b>

                                <div>
                                    <Tooltip text="ویرایش">
                                        <span
                                            className="icon-wrap ml-2"
                                            onClick={() => onEdit(t)}
                                        >
                                            <AiOutlineEdit size={23} />
                                        </span>
                                    </Tooltip>

                                    <Tooltip text="حذف">
                                        <span
                                            className="icon-wrap ml-2"
                                            onClick={() => onRemove(t.id)}
                                        >
                                            <FaRegTrashAlt size={20} fill="inherit" />
                                        </span>
                                    </Tooltip>
                                </div>

                            </div>
                        )
                    })
                }
            </>
        )
    };

    return (
        <>
            <div className="flex flex-col gap2" style={{ marginBottom: 5 }}>
                <h3>
                    <SiDatabricks size={24} />
                    <span className="ml-2">
                        تراکنش‌های فاکتور
                    </span>
                </h3>
            </div >

            <section>
                <Collapse
                    size="small"
                    items={
                        [
                            {
                                key: '1',
                                label: 'تراکنش‌های فاکتور',
                                children: <List />
                            },
                        ]
                    }
                />
            </section>
        </>
    )
});

export default TransactionsList;