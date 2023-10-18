// Ideas and to Do's
// For the price try recreating in so it's way neater
// Get the menus from the saved database part
import MenuItems from "@/components/MenuItems"
import { newMenu,fetchMenus,deleteMenu,fetchMenu } from "../../../service/dbService";
import { redirect} from "next/navigation"

async function getId() {
    
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
        const result = await fetchMenu(id);
        if (result === "Not Found") {
            notUnique = false;
        } 
    }
    return id;
}

async function createMenu(data: FormData) { // function is used to create a menu 
    "use server"

    const menuName = data.get("menuName")?.valueOf();
    const menuPrice = data.get("menuPrice")?.valueOf(); // RETURNS invalid if there's nothing
    const id = await getId(); // 
    
    if (typeof(menuName) != "string" || typeof(menuPrice) != "string" || menuName.length === 0 || menuPrice.length === 0 ) {
        throw new Error("Invalid Data Input")
    } 
    const result = await newMenu({id,menuName,menuPrice})
    redirect("/menu");
}

async function removeMenu(id:String) {
    "use server"
    const result = await deleteMenu(id);
    console.log(id);
}

export default async function Menu() {
    const menus = await fetchMenus();
    // const menu = await fetchMenu("1");
    return (
    <div className="container">
        <h1>Food Menu</h1>
        <form action={createMenu} className="grid grid-cols-5 gap-2">
            <input  name= "menuName" type="text" placeholder="Tambahkan Menu Disini ... " className="input input-bordered input-primary w-full max-w-xs" />
            <input name= "menuPrice"type="text" placeholder="Tambahkan Harga Disini ... " className="input input-bordered input-primary w-full max-w-xs" />
            <button className="btn btn-primary">Add</button>
        </form>
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Menu Name</th>
                        <th>Price</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                {menus.map(menu=> (
                  <MenuItems
                    id={menu.id}
                    key_id={menu.id}
                    menuName={menu.menuName}
                    menuPrice={menu.menuPrice}
                    handleDelete={removeMenu}
                  />      
                ))
                }
            </table>
        </div>
    </div>
    )
}