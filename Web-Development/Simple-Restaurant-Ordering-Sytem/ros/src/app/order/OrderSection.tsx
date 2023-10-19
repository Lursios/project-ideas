"use client"
import { useState,useEffect} from "react"
import OrderButton from "./OrderButton";
import TableSection from "./TableSection";

type MenusProp = {
    Menus: any[],
}


export default function OrderSection({Menus}:MenusProp) {
    const [tester,setTester] = useState("test");
    const [orderData,setOrderData] = useState({menuName:"",menuId:"",orderQuantity:0,tableNumber:0})


    function menuOrderData(event:any) {
        const values = event.target.value.split(",");
        const updateOrderData = {menuName:values[1], menuId:values[0]}
        setOrderData((prevValue)=> ({
            ...prevValue,
            ...updateOrderData
        }));
    }

    function orderQuantityData(quantity:any) {
        const updateOrderQuantity = {orderQuantity : quantity}
        setOrderData((prevValue)=> ({
            ...prevValue,
            ...updateOrderQuantity
        }));
    }

    function getTableNumber(tableNum:any) {
        const updateTableNumber = {tableNumber : tableNum}
        setOrderData((prevValue)=> ({
            ...prevValue,
            ...updateTableNumber
        }));
    }

    return (
    
    <div className="m-4">
     
        <TableSection
        handleTableNumber={getTableNumber}
        />
        <div className="grid grid-cols-4 mt-4">
            <select className="select select-bordered w-full max-w-xs" onChange={(e)=>{menuOrderData(e)}}>
                <option value="Pilih Menu">Plih Menu ...</option>
                {Menus.map((menu)=> {
                    return (
                        <option key={menu.id} value={[menu.id,menu.menuName]}>{menu.menuName}</option> 
                    )
                })}
            </select>
            <select className="select select-bordered w-full max-w-xs" onChange={(e)=>{orderQuantityData(e.target.value)}}>
                    <option value="Pilih Menu">Pilih Jumlah...</option>
                    <option value= {1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
            </select>
            <OrderButton
            name={"Confirm Order"}
            orderData={orderData}
            />
        </div>
        
    </div>
    )
}   