import { NextRequest,NextResponse } from 'next/server';
import { redirect } from 'next/navigation';
import { type NewOrder, newOrder } from '../../../../service/dbService';
import { getOrderId } from '@/app/order/page';

 
export async function GET(req: NextRequest,) {
  const searchParams = req.nextUrl.searchParams;
  const orderId = await getOrderId();
  const orderQuantity = searchParams.get("orderQuantity")!; // ! is added to assert that the value receive will never be empty and will always return a string instead of null or undefined

  const orderData:NewOrder = {
    menuName:searchParams.get("menuName")!,
    menuId:searchParams.get("menuId")!,
    orderQuantity:parseInt(orderQuantity), //convert to number
    orderId: orderId,
    tableNumber:parseInt(searchParams.get("tableNumber")!) // convert to number
  }

  console.log(orderData);
  const currentOrder = await newOrder(orderData);

  if (currentOrder != "Success") {
    console.log("There was an error when creating the menu")
  }

  const url = "/order"
  redirect(url);
}

// export default async function handler(req:Request, res:Response) {
//     console.log(req.method);
//     if (req.method === 'GET') {
//         // Access query parameters from the request object
//         const { id, category } = await req.json();
    
//         // Process the data on the server
//         const response = {
//           id,
//           category,
//         };
    
//         res.status(200).json(response);
//       } else {
//         res.status(405).end(); // Method not allowed
//       }
//     };
// type queryParams = {
//   params: { slug: string }
//   searchParams: {id:string,category:string}
// }

// export async function POST({params,searchParams}:queryParams) {
//   console.log(params);
//   console.log(searchParams);
//   const response = "it is working"

//   return NextResponse.json(response)
// }

// export async function GET(req: NextApiRequest ,res : NextApiResponse) {
//   const q = req.query;
//   console.group(q);
//   const response = "it is working"

//   return NextResponse.json(response)
// }

