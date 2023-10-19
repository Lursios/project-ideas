import Order from "./OrderButton";
import { fetchOrders,fetchMenus,fetchOrder} from "../../../service/dbService";
import OrderSection from "./OrderSection";
import TableSection from "./TableSection";

async function getOrders() {
    const orders = await fetchOrders();
    console.log(orders);
};

export async function getOrderId() {
    
    // Later for performance optimziation generate 5 number random then query based on that and return the null indexes so we query the database once and return 5 or more result for each call
    // var arr = [];  
    // while(arr.length < 5){
    //     var r = Math.floor(Math.random() * 100) + 1;
    //     if(arr.indexOf(r) === -1) arr.push(r);
    // }
    let notUnique = true ;
    let id:String = "" ;

    while (notUnique) {
        id = (Math.floor(Math.random()*99999) + 1).toString(); 
        const result = await fetchOrder(id);
        if (result === "Not Found") {
            notUnique = false;
        } 
    }
    return id;
}


async function createOrder() {
    "use server"
    console.log("order has been created");
}

async function getValues() {
    "use server"
    console.log("from server values")
    return "this works too"
}


export default async function OrderApp() {
    const Menus = await fetchMenus();
    return ( 
        <OrderSection
        Menus={Menus}
        />
    )
}