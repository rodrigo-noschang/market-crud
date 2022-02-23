import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from ".";

@Entity('carts')
class Cart {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @ManyToMany(type => Product, {eager: true})
    @JoinTable()
    products!: Product[]

    @Column()
    finished!: boolean

    constructor() {
        this.finished = false;
    }
}

export default Cart;