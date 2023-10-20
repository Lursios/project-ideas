"use client"
import { useEffect, useState } from "react";

type kitchenOrderProps = {
    kitchenOrders : any[]
}

export default function KitchenOrders({kitchenOrders}:kitchenOrderProps) {

    type TableArray = {
        [key: string]: any
    }
    const [tableArray,setTableArray] = useState<TableArray>({table_1:[],table_2:[],table_3:[]}) ; // Bugs still don't know how to add dynamically 
        // Fetch Menus 
        // map each array values 
        // each array values will update a tables state that contains the key table_tableNumber which is updated 
        // the update will be like so 
        // run once on the useEffect part
        //try to get value from table to see 

        // fetch the orders 

        // map each order then create the constant
    function mapTableOrders() {
        kitchenOrders.map((order,index)=> {
            const currentTableNumber = `table_${order.table_number}`;
            // console.log(currentTableNumber,index);
            if (currentTableNumber in tableArray) { // check if key exist   
                // console.log(currentTableNumber);
                const tableOrders = tableArray[currentTableNumber]; //current order arrays
                tableOrders.push(`${order.quantity}x ${order.menu_name}`)
                 //use state here
                const updatedTableOrders = {[currentTableNumber]:tableOrders} 
                setTableArray((prevValue)=> ({
                    ...prevValue,
                    ...updatedTableOrders
                }));
    
            } else {
                // create a new key value pair inside table array
                const tester = currentTableNumber in tableArray;
                const newTableOrders = {[currentTableNumber]: [`${order.quantity}x ${order.menu_name}`]};
                // console.log(currentTableNumber,index,newTableOrders,tester)
                setTableArray((prevValue)=> ({
                    ...prevValue,
                    ...newTableOrders
                })) 
                // push the current table ex: table 1 : [`${quantiy}x ${menuName}`] 
            }

        })

        // const tester = {
        //     menuName: 'Nasi Goreng Seafood',
        //     menuId: '44670',
        //     orderQuantity: 3,
        //     orderId: '38238',
        //     tableNumber: 3
        //   }


    };

    useEffect(()=>{
        mapTableOrders();
    },[])

    return ( 


        <div className="flex border rounded-md mb-6">
            <h2 className="flex bg-blue-400 font-bold m-3 "> Meja1</h2>
            <ul>
            {tableArray.table_1.map((order:string,index:string)=> {
                    return (
                        <li key={index} className="m-2">{order}</li>
                    )
                })}
            </ul>
            <h2 className="flex bg-blue-400 font-bold m-3" >Meja2</h2>
            <ul>
            {tableArray.table_2.map((order:string,index:string)=> {
                    return (
                        <li key={index} className="m-2">{order}</li>
                    )
                })}
            </ul>
            <h2 className="flex bg-blue-400 font-bold m-3" >Meja3</h2>
            <ul> 
                {tableArray.table_3.map((order:string,index:string)=> {
                    return (
                        <li key={index} className="m-2">{order}</li>
                    )
                })}
            </ul>
        </div>

        // <div className="w-full">
        //     <div className="flex bg-blue-400 font-bold">
        //         <div className="w-1/3 p-2 text-black">Meja 1</div>
        //         <div className="w-1/3 p-2 text-black">Meja 2</div>
        //         <div className="w-1/3 p-2 text-black">Meja 3</div>
        //     </div>
        //     <div className="flex bg-blue-200">
        //         {tableArray.table_1.map((order:string,index:string)=> {
        //             return (
        //             <div key={index} className="w-1/3 p-2 text-black">{order}</div> // using index should be avoided    
        //         )})}
        //         {tableArray.table_2.map((order:string,index:string)=> {
        //             return (
        //             <div key={index} className="w-1/3 p-2 text-black">{order}</div> // using index should be avoided
        //         )})}               
        //         {tableArray.table_3.map((order:string,index:string)=> {
        //             return (
        //             <div key={index} className="w-1/3 p-2 text-black">{order}</div> // using index should be avoided
        //         )})}              
        //     </div>

        // </div>

    )
}