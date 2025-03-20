
import { Buckle } from "./bucke.model";
import { BuckleBelt } from "./cinturonH.model";
import { LeatherStrap } from "./lonja.model";


export type Producto = Buckle | BuckleBelt | LeatherStrap;

export interface CartItem {
  product: Producto;
  cantidad: number;
}
