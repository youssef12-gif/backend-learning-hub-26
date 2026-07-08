// function calculateOrderTotal(items, discount) {
//   let total = 0;
//   for (const item of items) {
//     total += item.price * item.qty;
//   }
//   return total - discount;
// }

// //by the frontend team
// const order = {
//   customer: "Layla",
//   items: [
//     { price: "250 EGP", qty: 2 },//EGP will make the result of total = NaN
//     { price: 100, qty: 1 },
//   ],
// };

// console.log(calculateOrderTotal(order.items, "50")); 
// console.log(order.shippingAddress.city);//shippingAddress does not exist so we cannot access value of undefined variable

// //3.if a customer will use this program , he will see NaN and error

//===========================PART1==============================
// function calculateOrderTotal(items: any, discount: any) {
//   let total = 0;
//   for (const item of items) {
//     total += item.price * item.qty;
//   }
//   return total - discount;
// }

// //by the frontend team
// const order = {
//   customer: "Layla",
//   items: [
//     { price: "250 EGP", qty: 2 },    
//     { price: 100, qty: 1 },
//   ],
// };

// console.log(calculateOrderTotal(order.items, "50")); 
// console.log(order.shippingAddress.city);//the problem here because shipping address deoes not exist in order object


//===========================PART2==============================

type OrderStatus = "pending" | "shipped" | "delivered" | "cancelled";


// function canCancelOrder(status: OrderStatus):boolean{
//   if(status === "pending" || status === "shipped"){
//     return true;
//   }

//   return false;
// }

// console.log(canCancelOrder("refunded"));//refunded is not of type status
// //typescript raised an error quickly before descovering it when running and experiencing a wron result


//===========================PART3==============================
//===========================A==============================

// type WarehouseBin = [aisle: number, shelf: number];
// const binForOrder: WarehouseBin = [4, 12, "extra"];//the problem is that a tuple is a fixed datastructure so we cannot modify or add to it
//it is good to be tuple to store the places of goods and it shouldn't change

//===========================B==============================
class Repository<T extends { id: string }> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  findById(id: string): T | undefined {
    return this.items.find((item) => item.id === id);
  }
}

// interface Product{
//     id:string;
//     name:string;
//     price:number;

// }


// const productRepo = new Repository<Product>();

// productRepo.add({id: '1' ,name: 'product1' ,price:100});
// productRepo.add({id: '2' ,name: 'product2' ,price:200});
// productRepo.add({id:  ,name: 'product2' ,price:200});//it will raise an error because an interface obligates an object to fill all the required attributes


//  console.log(productRepo.findById('1')); 


//===========================PART4==============================

interface Product {
  id: string;
  name: string;
  price: number;
  costPrice: number; // internal, never shown to customers
}

interface OrderItem {
  product: Product;
  qty: number;
}

interface Order {
  id: string;
  customer: string;
  items: OrderItem[];
  status: OrderStatus;        // reuse Part 2's type
  shippedAt?: string;         // optional — only exists once shipped
  readonly createdAt: string; // set once, never changes
}


// const product1: OrderItem = {
//   product: {id: 'A' , name: 'product1' , price: 50 , costPrice: 100} , 
//   qty: 5
// };

// const product2: OrderItem = {
//   product: {id: 'B' , name: 'product2' , price: 20 , costPrice: 70} , 
//   qty: 5
// };

// let order:Order = {id: '1' ,
//    customer: 'Youssef', 
//   items: [
//     product1 ,
//     product2
//   ], 
//   status: "delivered" ,
// //  shippedAt: 'Inventory' ,
//  createdAt: '2026-1-5'
// }

// const shipOrder = (order:Order):Order=>{
 
//   const newOrder:Order = order;

//   newOrder.status = 'shipped';

//   newOrder.shippedAt = Date.now().toLocaleString();

//   return newOrder;
// }


// order.createdAt = '2025-1-1'; // it will raise error because we cannot modidfiy the value of readonly variable


// function calculateOrderTotal(items: OrderItem[], discount:number) {
//   let total = 0;
//   for (const item of items) {
//     total += item.product.price * item.qty;
//   }
//   return total - discount;
// }



//===========================PART5==============================

// What the customer-facing API is allowed to return — never leak costPrice
type PublicProduct = Omit<Product, "costPrice">;

// What's required to create a new product — no id yet, the DB assigns it
type CreateProductInput = Omit<Product, "id">;

// What's allowed when editing a product — any subset of fields
type UpdateProductInput = Partial<Product>;

// A fast lookup table by product id
type ProductCatalog = Record<string, Product>;

function toPublicProduct(product: Product):PublicProduct{
  const newProduct:PublicProduct = product;

  return newProduct;
}

function createProduct(input: CreateProductInput): Product{
     const tmp:CreateProductInput = input;

     const newProduct:Product = {id: crypto.randomUUID.toString() , name: tmp.name , price: tmp.price , costPrice:tmp.costPrice};

     return newProduct;
}

function updateProduct(product: Product, changes: UpdateProductInput): Product{
  return  {...product , ...changes};
}

const product1: Product= {id: 'A' , name: 'product1' , price: 50 , costPrice: 100};

const product2: Product= {id: 'B' , name: 'product2' , price: 70 , costPrice: 90};

let product_catalog:ProductCatalog = {
  '1' : product1 , 
  '2' : product2
}

//n a comment: explain what would have happened in the old JS codebase if someone added a discountPercent field to Product
//  but forgot to update the "public" copy by hand — and why that can't silently happen anymore.
//answer: it will print undeifned 