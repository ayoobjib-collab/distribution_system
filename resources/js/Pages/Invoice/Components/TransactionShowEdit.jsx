import { memo, useCallback, useState } from 'react';

import ModalAddTranaction from './Trans/ModalAddTranaction';
import TransactionsList from './Trans/TransactionsList';

const TransactionShowEdit = memo(({ dataTransactions, setData }) => {

    const [editingTransaction, setEditingTransaction] = useState(null);

    // console.log('trans for edit: ' + editingTransaction);

    const nullEditingTrans = useCallback(() => {
        setEditingTransaction(null);
    }, []);

    const removeTrans = useCallback((id) => {
        setData(
            'transactions',
            dataTransactions.filter(item => item.id !== id)
        );
    }, [dataTransactions, setData]);

    const handleTransactionChanged = useCallback((trans) => {
        if (editingTransaction !== null) {
            setData(
                'transactions',
                dataTransactions.map(item =>
                    item.id === trans.id ? trans : item
                )
            );

            nullEditingTrans();
        } else {
            setData('transactions', [
                ...dataTransactions,
                trans
            ]);
        }
    }, [editingTransaction, dataTransactions, setData, nullEditingTrans]);

    return (
        <>
            <TransactionsList
                transactions={dataTransactions}
                onEdit={(transaction) => setEditingTransaction(transaction)}
                onRemove={removeTrans}
            />

            <ModalAddTranaction
                transaction={editingTransaction}
                childChanged={handleTransactionChanged}
                onModalClose={nullEditingTrans}
            />
        </>
    )

});

export default TransactionShowEdit;