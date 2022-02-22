import { Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product, User } from ".";

@Entity('carts')
class Cart {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @OneToOne(type => User)
    @JoinColumn()
    user!: User

    @ManyToMany(type => Product, {eager: true})
    @JoinTable()
    products!: Product[]

}

export default Cart;