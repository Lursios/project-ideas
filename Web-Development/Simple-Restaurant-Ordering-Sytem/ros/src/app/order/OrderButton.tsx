"use client"
import { useEffect, useState } from "react"
// import CreateOrder from "./CreateOrder")

type ordersProps = {
    name : String,
    orderData:any
    handleOrder : (orderData:any) => void
}


export default function OrderButton({name,orderData,handleOrder}:ordersProps) {
    const [isDisabled,setDisabled] = useState(false);

    // const orderDataCompleted = () => {if (orderData.menuName != "" && orderData.orderQuantity != 0 && orderData.tableNumber != 0) {setDisabled(false)}};

    // useEffect(() => orderDataCompleted)

    function handleButton() {
        console.log("new order created");
        console.log(orderData);

    };
    
    return (
        <button onClick={()=>handleButton()} className="btn btn-md bg-blue-500 text-white" disabled={isDisabled}>
        {name}
        </button>
    )
}
