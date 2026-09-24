import { memo, useState } from 'react';

import ModalAddTranaction from './Trans/ModalAddTranaction';
import TransactionsList from './Trans/TransactionsList';

const TransactionShowEdit = memo(({ dataTransactions, setData }) => {

    const [editingTransaction, setEditingTransaction] = useState(null);

    return (
        <>
            <TransactionsList
                transactions={dataTransactions}
                onEdit={(transaction) => setEditingTransaction(transaction)}
                onRemove={(id) => {
                    setData(
                        'transactions',
                        dataTransactions.filter(item => item.id !== id)
                    );
                }}
            />

            <ModalAddTranaction
                transaction={editingTransaction}
                childChanged={(trans) => {

                    console.table(trans + '-');

                    //console.log(editingTransaction);
                    

                    if (editingTransaction) {

                        setData(
                            'transactions',
                            dataTransactions.map(item =>
                                item.id === trans.id ? trans : item
                            )
                        );

                        setEditingTransaction(null);
                    } else {
                        // Add new transaction
                        setData('transactions', [
                            ...dataTransactions,
                            trans
                        ]);
                    }
                }}
            />
        </>
    )

});

export default TransactionShowEdit;