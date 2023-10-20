import { Kasir } from "./Kasir";
import { fetchTableOrderData } from "../../../service/dbService";


export default async function Cashier() {
    const  currentTableOrder:any = await fetchTableOrderData();
    return (
        <Kasir
        tableOrders={currentTableOrder}
        />
    )
}