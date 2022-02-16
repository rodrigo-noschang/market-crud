import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinColumn } from "typeorm";
// import Product from "./Product";

@Entity('carts')
class Cart {
    @PrimaryGeneratedColumn('uuid')
    id!: string
}

export default Cart;