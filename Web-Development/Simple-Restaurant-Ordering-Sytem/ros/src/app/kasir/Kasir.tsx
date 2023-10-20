'use client'

import Button from "@/components/Button"
import { redirect } from "next/navigation"
import {useState,useEffect} from "react"
import { useRouter } from "next/navigation"

export type KasirPropType = {
    tableOrders : any[]
} 

export function Kasir({tableOrders}:KasirPropType) {
    const router = useRouter()
    const [tableId,setTableId] = useState("");
    const [tables,setTables] = useState<any[]>([])
    const [activeTable,setActiveTable] = useState<any[]>()
    const [isHidden,setHidden] = useState(false);

    function getTableData() {
        const tables:any[] = [] 
        tableOrders.map((order)=> {
            const currentTableNumber = order.table_number;
            if (currentTableNumber in tables === false) {
                tables.push(currentTableNumber)
            } 
        })
        return tables;
    }
    useEffect(()=> {
        setTables(() => getTableData())
    },[])

    function emptyTable() {
        console.log("Table are emptied");
        
    }

    function handleSelect(tableNumber:number) {
        const currentTableOrder = tableOrders.filter((tableOrder)=> tableOrder.table_number === tableNumber);
        setActiveTable(currentTableOrder)
    }


    function handleClick(tableId: string) {
    const query = new URLSearchParams({id:tableId}).toString();
    const apiUrl = `/api/orderData?${query}`;
    console.log(apiUrl);
    fetch(apiUrl, {
        method: 'DELETE',
        headers: {
            'Content-Type':  "application/json", // Adjust the content type as needed
            // Add any other headers if required
          }
    })
        .then(response => {
        if (response.ok) {
            // Item was successfully deleted
            console.log('Item deleted successfully');
            // You can also navigate to a different page or perform other actions
        } else {
            // Handle errors here
            console.error('Failed to delete item');
        }
        })
        .catch(error => {
        console.error('Request failed:', error);
        });
    }
    
    function printReceipt() {
        console.log("receipt is printed");
        console.log(activeTable);
        setHidden(!isHidden);
    }
    return (
    <div >
        <div className="grid grid-cols-4 m-4">
            <select className="select select-bordered w-full max-w-xs" onChange={(e)=>{const tableId = e.target.value; handleSelect(parseInt(tableId)); setTableId(tableId)}}>
                <option value="Pilih Menu">Plih Meja ...</option>
                {tables.map((table,index)=> {                    
                    return (
                        <option key={index} value={table}>{table}</option> 
                    )
                })}
            </select>
            <Button
            name="Print Struk"
            handleClick={printReceipt}
            />
            <Button
            name="Empty Table"
            handleClick={()=> {handleClick(tableId); router.refresh()}}
            />            
        </div>
        <div hidden={isHidden} className="m-4 overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Jumlah</th>
                            <th>Menu</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activeTable?.map((tableOrder)=> {
                            return(
                                <tr key={tableOrder.id} className="hover"> 
                                <th>{tableOrder.quantity}</th>
                                <td>{tableOrder.menu_name}</td>
                                <td>{tableOrder.menu.menuPrice}</td>
                            </tr>
                            )
                        }) 
                        }
                    </tbody>
                </table>
                <p>Terima Kasih Sudah Makan di <span className="font-bold" >Restaurant</span> </p>
            </div>
    </div>
    )
}