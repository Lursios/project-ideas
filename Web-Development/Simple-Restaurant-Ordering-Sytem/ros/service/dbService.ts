import { menus as Menus, orders as Orders } from "../database/models";

// Cashier Section 
export async function clearTable(tableId:number) {
    const clearedTable = await Orders.destroy({where:{table_number:tableId}});
    return clearedTable;
}

export async function fetchTableOrderData() {
    const orderData = await Orders.findAll({
        include: Menus,
    });
    const ordersValues:any[] = orderData.map((order)=> order.get({plain:true}))
    return ordersValues;
}


/// Order Section 

export async function deleteOrders() {
    const deletedOrders = await Orders.destroy({truncate:true});
    console.log(deletedOrders)
    return "Orders has been succesfully removed"
}

export type NewOrder = {
    menuName : string,
    menuId : string,
    orderQuantity : number,
    tableNumber : number,
    orderId : String
}



export async function newOrder(order:NewOrder) {
    console.log(order);
    const newOrder = await Orders.create({
        menu_name: order.menuName,
        menu_id: order.menuId,
        quantity: order.orderQuantity,
        id: order.orderId ,
        table_number: order.tableNumber
    })
    console.log(newOrder.dataValues);   

    return "Success"
}

export async function fetchOrders() {
    const orders = await Orders.findAll();
    const ordersValues:any[] = orders.map((order)=> order.dataValues)
    return ordersValues;
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