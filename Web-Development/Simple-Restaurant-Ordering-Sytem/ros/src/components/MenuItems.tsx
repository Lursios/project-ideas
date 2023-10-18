'use client'
// import {fetchMenus,deleteMenu} from "../../service/dbService"
import { Key,useState } from "react"
import {useRouter} from "next/navigation"


// type Menus = {
//     [key: string]: any
// }

type MenuItemProps = {
    // Menus : Menus[],
    id : String,
    key_id : Key,
    menuName : String,
    menuPrice : String,
    handleDelete : (id:String) => void
}
// pass as props the onclick handler and the menus so this section can be for interactivity using the client

// export default function MenuItems(){
//     // const menus = await fetchMenus();
//     const Menus = getMenus()
    
// }


// export default async function MenuItems(){
//     const menus = await fetchMenus();
//     return (
//     <div className="overflow-x-auto">
//         <table className="table">
//             <thead>
//                 <tr>
//                     <th>ID</th>
//                     <th>Menu Name</th>
//                     <th>Price</th>
//                     <th>Delete ?</th>
//                 </tr>
//             </thead>
//             <tbody>
//             {menus.map(menu=> (
//             <tr className="hover" key={menu.dataValues.id}>
//                 <th>{menu.dataValues.id}</th>
//                 <td>{menu.dataValues.menuName}</td>
//                 <td>{menu.dataValues.menuPrice}</td>
//                 <td><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-300 hover:text-red-500 cursor-pointer"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg></td>
//             </tr>
//             ))}
//             </tbody>
//         </table>
//     </div>
//     )
// }

export default function MenuItem({id,key_id,menuName,menuPrice,handleDelete}:MenuItemProps) {

    const router = useRouter()

    return (
        <tbody>
        <tr className="hover" key={key_id}> 
            <th>{id}</th>
            <td>{menuName}</td>
            <td>{menuPrice}</td>
            <td onClick={async (e)=> {const result =await handleDelete(id);router.refresh();}}><svg  xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-300 hover:text-red-500 cursor-pointer"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg></td>
        </tr>
        </tbody>
    )
           
}