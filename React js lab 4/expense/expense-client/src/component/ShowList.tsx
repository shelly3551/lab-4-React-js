import React, { useEffect, useState } from 'react'
import IDataList from '../model/iData'
import {getItemData} from '../service/ItemService'
import ExpenseTracker from './ExpenseTracker'

const ShowList = () => {
    const [item, setItem] = useState<IDataList[]>([])
    const [error, setError] = useState<Error | null>(null)
    const [sum, setSum] = useState<number | null>(0);
    const [kuwarSpent, setKuwarSpent] = useState<number>(0);
    const [nawabSpent, setNawabSpent] = useState<number>(0);
    const [showForm, setShowForm] = useState<boolean>(false);


    useEffect(() => {
        const fetchItemData = async () => {
            try {
                const data = await getItemData();
                console.log(data);
                setItem(data);
                //calcSum..update state variable sum
                //calc nawabSpent & kuwar Spent and update the state
                setSum(data.reduce((result, expense) => result + expense.price, 0));
                calculateShares(data);
            } catch (error: any) {
                // console.error(error);
                setError(error);
            }
        };
        fetchItemData();
    }, [showForm]);

    const calculateShares = (data: IDataList[]) => {
        // Use data.map...
        // figure out how much rahul, ramesh spent
        // setKuwarSpent
        //setNawabSpent
        var kuwarspent1: number = 0;
        var nawabspent1: number = 0;
        data.map((sams) =>
          sams.payeeName === "Rahul"
            ? (kuwarspent1 = kuwarspent1 + sams.price)
            : (nawabspent1 = nawabspent1 + sams.price)
        );
        setKuwarSpent(kuwarspent1);
        setNawabSpent(nawabspent1);
      };

    const getTableHeaders = () => {
        return (
            <>
                <div className="use-inline date header-color">Date</div>
                <div className="use-inline header-color">Product Purchased</div>
                <div className="use-inline price header-color">Price</div>
                <div className="use-inline header-color" style={{ width: 112 }}>
                    Payee
                </div>
            </>
        );
    };

    return (
        <>
            <header id="page-Header">Expense Tracker</header>
            <button id="Add-Button" onClick={()=>setShowForm(true)}>Add</button>
            {
                showForm && (
                    <div className="form">
                        <ExpenseTracker onTrue={()=>setShowForm(false)} onClose={()=>setShowForm(false)}></ExpenseTracker>
                    </div>
                )
            }
            {/* Add button */}
            {getTableHeaders()}
            {item && item.map((expenseItem) => {
                return (
                    <div key={expenseItem.id}>
                        <div className="use-inline date ">{expenseItem.setDate}</div>
                        <div className="use-inline">{expenseItem.product}</div>
                        <div className="use-inline price">{expenseItem.price}</div>
                        <div className={`use-inline ${expenseItem.payeeName}`}>{expenseItem.payeeName}</div>
                    </div>
                )
            })}
            <hr />
            <div className="use-inline ">Total: </div>
        <span className="use-inline total">{sum}</span> <br />
        <div className="use-inline ">Kuwar paid: </div>
        <span className="use-inline total Kuwar">{kuwarSpent}</span> <br />
        <div className="use-inline ">Nawab paid: </div>
        <span className="use-inline total Nawab">{nawabSpent}</span> <br />
        <span className="use-inline payable">{kuwarSpent>nawabSpent? "Pay Kuwar " : "Pay Nawab"}</span>
        <span className="use-inline payable price"> {Math.abs((kuwarSpent-nawabSpent)/2)}</span>
        {
               error && (
                    <>
                        {error?.message}
                    </>
                )
            } 
        </>
    );
}

export default ShowList