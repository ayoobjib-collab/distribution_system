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
            <table className="responsive-table">
                <tbody>

                    {Array.isArray(transactions) &&

                        transactions.map((t, index) => {

                            let typeLabel = (t.type === 'cash') ? 'نقد' : 'چک';

                            return (

                                <tr key={t.id}>

                                    <td className="mob-hide">
                                        {t.id}
                                    </td>

                                    <td>
                                        {typeLabel}
                                    </td>

                                    <td>
                                        {formatAmount(t.amount)}
                                    </td>

                                    <td className="mob-hide">
                                        {t.description}
                                    </td>

                                    <td>
                                        <Tooltip text="ویرایش" onClick={() => onEdit(t)} >
                                            <span
                                                className="icon-wrap"
                                            >
                                                <AiOutlineEdit size={23} />
                                            </span>
                                        </Tooltip>

                                        <Tooltip text="حذف">
                                            <span
                                                className="icon-wrap"
                                                onClick={() => onRemove(t.id)}
                                            >
                                                <FaRegTrashAlt size={20} fill="inherit" />
                                            </span>
                                        </Tooltip>
                                    </td>

                                </tr>
                            )
                        })
                    }
                </tbody>
            </table >
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