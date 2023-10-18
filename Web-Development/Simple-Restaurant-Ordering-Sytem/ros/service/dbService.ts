import { menus as Menus, orders as Orders } from "../database/models";

/// Order Section 

export async function fetchOrders() {
    const orders = await Orders.findAll();
    return orders;
};

export async function fetchOrder(id:String) {
    const order = await Orders.findOne({where:{id:id}})
    if (order === null) {
        return "Not Found";
    } else {
        return order.dataValues;
    };
}


/// Menu Section 
type Menu = {
    id : String,
    menuName : String,
    menuPrice : String
}

export async function newMenu({id,menuName,menuPrice} : Menu) {
    const newMenu = await Menus.create({
        id : id,
        menuName : menuName,
        menuPrice : menuPrice
    });

    // console.log(newMenu);
    return newMenu.dataValues;
};

export async function fetchMenu(id:String) {
    const menu = await Menus.findOne({where : {id : id}})
    if (menu === null) {
        console.log("Not Found");
        return "Not Found";
    } else {
        return menu.dataValues;
    };
}

export async function fetchMenus() {
    const menus = await Menus.findAll();
    const menuValues:any[] = menus.map((menu)=> menu.dataValues)
    return menuValues;
}

export async function deleteMenu(id:String) {
    const deletedItem =  await Menus.destroy({  where: {id : id} });
    console.log(deletedItem);
    return "Item Succesfully Deleted";
};

export async function deleteMenus() {
    const deletedMenus = await Menus.destroy({truncate : true});
    console.log(deletedMenus);
    return "Succesfully Deleted All Menus";
}