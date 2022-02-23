import { Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product, User } from ".";

@Entity('carts')
class Cart {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @ManyToMany(type => Product, {eager: true})
    @JoinTable()
    products!: Product[]

}

export default Cart;