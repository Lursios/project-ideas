"use client"
import { useEffect, useState} from "react"
import { useRouter } from "next/navigation";
// import CreateOrder from "./CreateOrder")

type ordersProps = {
    name : String,
    orderData:any
}


export default function OrderButton({name,orderData}:ordersProps) {
    const router = useRouter()
    
    const [isDisabled,setDisabled] = useState(false);

    function handleClick(event:any){
        event.preventDefault();
        const query = new URLSearchParams(orderData).toString();
        router.replace(`/api/orderData?${query}`);
      };

    // const orderDataCompleted = () => {if (orderData.menuName != "" && orderData.orderQuantity != 0 && orderData.tableNumber != 0) {setDisabled(false)}};

    // useEffect(() => orderDataCompleted)
    return (
        <button onClick={(e)=>handleClick(e)} className="btn btn-md bg-blue-500 text-white" disabled={isDisabled}>
        {name}
        </button>
    )
}
