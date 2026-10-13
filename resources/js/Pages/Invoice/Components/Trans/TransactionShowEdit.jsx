import { memo, useCallback, useState } from 'react';

import ModalAddTransaction from './ModalAddTransaction';
import TransactionsList from './TransactionsList';

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

    }, [editingTransaction, dataTransactions, setData]);

    return (
        <>
            <TransactionsList
                transactions={dataTransactions}
                onEdit={setEditingTransaction}
                onRemove={removeTrans}
            />

            <ModalAddTransaction
                transaction={editingTransaction}
                childChanged={handleTransactionChanged}
                onModalClose={nullEditingTrans}
            />
        </>
    )

});

export default TransactionShowEdit;