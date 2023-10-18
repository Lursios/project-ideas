"use client"
import {useState} from "react"

import Button from "@/components/Button"


function tester() {
    console.log("this works")
}

type TableSectionProps = {
    handleTableNumber : (event:any) => void
}

export default function TableSection({handleTableNumber}:TableSectionProps) {

    const [activeTable,setActiveTable] = useState("");

    function selectTable(tableNumber:any) {
        const tableNum = tableNumber.target.value;
        if (activeTable != tableNum) {
            setActiveTable(tableNum);
            handleTableNumber(tableNum)
        } else {
            setActiveTable("");
            handleTableNumber(0);
        }

    };

    return (
        <div className="flex border rounded-md mb-6">
            <button value={1} onClick={(e)=>{selectTable(e)}} className={`flex-1 p-2 text-center  ${ activeTable === "1"? "bg-green-500":"bg-black"} cursor-pointer transition-colors text-sm h-[60px] flex items-center justify-center rounded-l-md `} >Meja 1 </button>
            <button value={2} onClick={(e)=>{selectTable(e)}} className={`flex-1 p-2 text-center hover:bg-muted cursor-pointer transition-color text-foreground text-sm h-[60px] flex items-center justify-center border-x ${activeTable === "2"? "bg-green-500":"bg-black"} hover:bg-green-500`}>Meja 2</button>
            <button value={3} onClick={(e)=>{selectTable(e)}} className={`flex-1 p-2 text-center hover:bg-muted cursor-pointer transition-colors  text-foreground text-sm h-[60px] flex items-center justify-center rounded-r-md ${ activeTable === "3"? "bg-green-500":"bg-black"} hover:bg-green-500`}>Meja 3</button>
            {/* <Button
            name="Add Table"
            handleClick={()=>tester()}
            /> */}
        </div>
    )
};
