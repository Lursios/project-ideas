import KitchenOrders from "./KitchenOrders";
import { fetchOrders } from "../../../service/dbService";

export default async function Kitchen() {
    const Orders = await fetchOrders()
    return (
    <div>
        <KitchenOrders
        kitchenOrders = {Orders}
        />
    </div>
    
    )
}