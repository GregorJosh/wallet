import React from 'react';
import css from './Transactions.module.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import sprite from 'images/icons.svg';
import { setIsModalConfirmDeleteOpen } from 'redux/global/globalSlice';
import { ModalConfirmDelete } from '../ModalConfirmDelete/ModalConfirmDelete';

export const Transactions = ({ transactions, onDelete, onEdit }) => {
  const [sortOrder, setSortOrder] = useState({
    column: null,
    direction: 'asc',
  });

  const [selectedTransactionId, setSelectedTransactionId] = useState(null);
  const dispatch = useDispatch();

  const getAmountClass = type => {
    return type === 'Income'
      ? css.amountPlus
      : type === 'Expense'
      ? css.amountMinus
      : '';
  };

  const handleSort = sortColumn => {
    const direction =
      sortColumn === sortOrder.column && sortOrder.direction === 'asc'
        ? 'desc'
        : 'asc';
    setSortOrder({ column: sortColumn, direction });
  };

  const handleDelete = transactionId => {
    setSelectedTransactionId(transactionId);
    dispatch(setIsModalConfirmDeleteOpen(true));
  };
  const confirmDelete = () => {
    onDelete(selectedTransactionId);
    dispatch(setIsModalConfirmDeleteOpen(false));
  };

  const formatDate = dateString => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  };

  const formatType = type => {
    if (type === 'Expense') {
      return <span className={css.tableMinus}>-</span>;
    } else if (type === 'Income') {
      return <span className={css.tablePlus}>+</span>;
    }
    return type;
  };

  return (
    <div className={css.tableBg}>
      <ModalConfirmDelete onConfirm={confirmDelete} />
      <table className={css.transactionsTable}>
        <thead className={css.transactionsTableHead}>
          <tr>
            <th onClick={() => handleSort(0)} title="Sort">
              <div className={css.thName}>
                <span>Date</span>
                <svg className={css.iconSort} width="20px" height="20px">
                  <use href={`${sprite}#icon-sort`}></use>
                </svg>
              </div>
            </th>
            <th onClick={() => handleSort(1)} title="Sort">
              <div className={css.thName}>
                <span>Type</span>
                <svg className={css.iconSort} width="20px" height="20px">
                  <use href={`${sprite}#icon-sort`}></use>
                </svg>
              </div>
            </th>
            <th onClick={() => handleSort(2)} title="Sort">
              <div className={css.thName}>
                <span>Category</span>
                <svg className={css.iconSort} width="20px" height="20px">
                  <use href={`${sprite}#icon-sort`}></use>
                </svg>
              </div>
            </th>
            <th onClick={() => handleSort(3)} title="Sort">
              <div className={css.thName}>
                <span>Comment</span>
                <svg className={css.iconSort} width="20px" height="20px">
                  <use href={`${sprite}#icon-sort`}></use>
                </svg>
              </div>
            </th>
            <th onClick={() => handleSort(4)} title="Sort">
              <div className={css.thName}>
                <span>Amount</span>
                <svg className={css.iconSort} width="20px" height="20px">
                  <use href={`${sprite}#icon-sort`}></use>
                </svg>
              </div>
            </th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction._id} data-type={transaction.type}>
              <td data-label="Date">{formatDate(transaction.date)}</td>
              <td data-label="Type">{formatType(transaction.type)}</td>
              <td data-label="Category">{transaction.category}</td>
              <td data-label="Comment">{transaction.comment}</td>
              <td data-label="Sum" className={getAmountClass(transaction.type)}>
                {transaction.sum}
              </td>
              <td data-label="Options">
                <svg
                  className={css.iconTransactions}
                  width="20px"
                  height="20px"
                  onClick={() => onEdit(transaction)}
                >
                  <use href={`${sprite}#icon-pencil2`}></use>
                </svg>
                <svg
                  className={css.iconTransactions}
                  width="20px"
                  height="20px"
                  onClick={() => handleDelete(transaction._id)}
                >
                  <use href={`${sprite}#icon-bin`}></use>
                </svg>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// import React, { useState, useEffect, useCallback } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import css from './Transactions.module.scss';
// import sprite from 'images/icons.svg';
// import { getUserDetails } from 'redux/session/operations';
// import { selectUserDetails } from 'redux/session/selectors';

// import { walletInstance } from 'utils/api';

// export const Transactions = ({
//   transactions,
//   deleteTransaction,
//   editTransaction,
// }) => {
// const [, setSums] = useState({ sumPlus: 0, sumMinus: 0, balance: 0 });
// const [sortOrder, setSortOrder] = useState({
//   column: null,
//   direction: 'asc',
// });
// const dispatch = useDispatch();
// const userDetails = useSelector(selectUserDetails);
// const userBalance = userDetails ? userDetails.balance : 0;

// useEffect(() => {
//   dispatch(getUserDetails());
// }, [dispatch, transactions, deleteTransaction]);

// const calculateSums = useCallback(() => {
//   let sumPlus = 0;
//   let sumMinus = 0;

//   transactions.forEach(transaction => {
//     const amount = parseFloat(transaction.sum);
//     if (transaction.type === 'Income') {
//       sumPlus += amount;
//     } else if (transaction.type === 'Expense') {
//       sumMinus += amount;
//     }
//   });

//   return { sumPlus, sumMinus, balance: sumPlus - sumMinus };
// }, [transactions]);

// useEffect(() => {
//   const { sumPlus, sumMinus, balance } = calculateSums();
//   setSums({ sumPlus, sumMinus, balance });
// }, [transactions, calculateSums]);

// const getAmountClass = type => {
//   return type === 'Income'
//     ? css.amountPlus
//     : type === 'Expense'
//     ? css.amountMinus
//     : '';
// };

// const handleSort = sortColumn => {
//   const direction =
//     sortColumn === sortOrder.column && sortOrder.direction === 'asc'
//       ? 'desc'
//       : 'asc';
//   setSortOrder({ column: sortColumn, direction });
// };

// const sortedTransactions = [...transactions].sort((a, b) => {
//   let valueA, valueB;
//   if (sortOrder.column === 4) {
//     valueA = parseFloat(a.sum);
//     valueB = parseFloat(b.sum);
//   } else if (sortOrder.column === 0) {
//     valueA = new Date(a.date);
//     valueB = new Date(b.date);
//   } else {
//     valueA = a[sortOrder.column];
//     valueB = b[sortOrder.column];
//   }

//   return sortOrder.direction === 'asc'
//     ? valueA > valueB
//       ? 1
//       : -1
//     : valueA < valueB
//     ? 1
//     : -1;
// });

// const { sumPlus, sumMinus } = calculateSums();

//   const handleEdit = transactionId => {
//     const transactionToEdit = transactions.find(t => t._id === transactionId);
//     if (transactionToEdit) {
//       editTransaction(transactionToEdit);
//     }
//   };

//   const handleDelete = async transactionId => {
//     try {
//       const response = await walletInstance.delete(
//         `/transactions/${transactionId}`
//       );
//       if (response.status === 200) {
//         deleteTransaction(transactionId);
//       } else {
//         console.error('Error deleting transaction');
//       }
//     } catch (error) {
//       console.error('Error deleting transaction', error);
//     }
//   };

//   return (
//     <div>
//       <div className={css.tableBg}>
//         <table className={css.transactionsTable}>
//           <thead className={css.transactionsTableHead}>
//             <tr>
//               <th onClick={() => handleSort(0)} title="Sort">
//                 <div className={css.thName}>
//                   <span>Date</span>
// //                   <svg className={css.iconSort} width="20px" height="20px">
// //                     <use href={`${sprite}#icon-sort`}></use>
// //                   </svg>
// //                 </div>
// //               </th>
//               <th onClick={() => handleSort(1)} title="Sort">
//                 <div className={css.thName}>
//                   <span>Type</span>
//                   <svg className={css.iconSort} width="20px" height="20px">
//                     <use href={`${sprite}#icon-sort`}></use>
//                   </svg>
//                 </div>
//               </th>
//               <th onClick={() => handleSort(2)} title="Sort">
//                 <div className={css.thName}>
//                   <span>Category</span>
//                   <svg className={css.iconSort} width="20px" height="20px">
//                     <use href={`${sprite}#icon-sort`}></use>
//                   </svg>
//                 </div>
//               </th>
//               <th onClick={() => handleSort(3)} title="Sort">
//                 <div className={css.thName}>
//                   <span>Comment</span>
//                   <svg className={css.iconSort} width="20px" height="20px">
//                     <use href={`${sprite}#icon-sort`}></use>
//                   </svg>
//                 </div>
//               </th>
//               <th onClick={() => handleSort(4)} title="Sort">
//                 <div className={css.thName}>
//                   <span>Amount</span>
//                   <svg className={css.iconSort} width="20px" height="20px">
//                     <use href={`${sprite}#icon-sort`}></use>
//                   </svg>
//                 </div>
//               </th>
//               <th>Options</th>
//             </tr>
//           </thead>
//           <tbody className={css.transactionsTableBody}>
//             {sortedTransactions.map(transaction => (
//               <tr key={transaction._id}>
//                 <td>{transaction.date}</td>
//                 <td>{transaction.type}</td>
//                 <td>{transaction.category}</td>
//                 <td>{transaction.comment}</td>
//                 <td className={getAmountClass(transaction.type)}>
//                   {transaction.sum}
//                 </td>
//                 <td>
// <svg
//   className={css.iconTransactions}
//   width="20px"
//   height="20px"
//   onClick={() => handleEdit(transaction._id)}
// >
//   <use href={`${sprite}#icon-pencil2`}></use>
// </svg>
// <svg
//   className={css.iconTransactions}
//   width="20px"
//   height="20px"
//   onClick={() => handleDelete(transaction.id)}
// >
//   <use href={`${sprite}#icon-bin`}></use>
// </svg>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className={css.sumSection}>
//         <p>Incomes: {sumPlus.toFixed(2)}</p>
//         <p>Expenses: {sumMinus.toFixed(2)}</p>
//         <p>Balance: {userBalance}</p>
//       </div>
//     </div>
//   );
// };
