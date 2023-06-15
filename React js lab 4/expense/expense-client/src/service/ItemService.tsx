import axios from 'axios'
import React from 'react'
import IDataList from '../model/iData'


   
export  const getItemData=()=>{
        return axios.get<IDataList[]>("http://localhost:3001/items").then((res)=> res.data)
    }

      

    export const pushDataFromUser = (newPurchase : Omit<IDataList,"id">) => {
        //http://localhost:4001/items
        // headers: {
        //     'Content-Type': 'application/json'
        // }
        return axios.post<IDataList>(
            `http://localhost:3001/items`,
            newPurchase,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        .then( response => response.data )
    }

