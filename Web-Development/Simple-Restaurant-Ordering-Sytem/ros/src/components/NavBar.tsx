import Link from "next/link"
import Button from "./Button"
import { deleteMenus,deleteOrders } from "../../service/dbService"
import { redirect } from "next/navigation";


async function reset() {
    "use server"
    const resultMenus = await deleteMenus();
    const resultOrder = await deleteOrders();
    console.log("Deleted All Menus & Orders")
    redirect("/menu")
}

export default function NavBar() {
    return (
    <div className="navbar center bg-base-100">
        <div className="flex justify-evenly w-full">
            <Link className="btn btn-ghost normal-case text-xl" href="/menu"><h3>Menu</h3></Link>
            <Link className="btn btn-ghost normal-case text-xl" href="/order"><h3>Orders</h3></Link>
            <Link className="btn btn-ghost normal-case text-xl" href="/dapur"><h3>Kitchen</h3></Link>
            <Link className="btn btn-ghost normal-case text-xl" href="/kasir"><h3>Cashier</h3></Link>            
        </div>
        <div className="flex-none w-24">
            <Button
            name = {"reset"}
            handleClick={reset}
            />
        </div>
    </div>
    )
}