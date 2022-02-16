import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import Product from "./Product";

@Entity('carts')
class Cart {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @ManyToMany(() => Product)
    @JoinTable()
    products!: Product[]
}

export default Cart;