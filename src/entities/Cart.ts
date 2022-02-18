import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from ".";

@Entity('carts')
class Cart {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @OneToOne(type => User)
    @JoinColumn()
    user!: User

}

export default Cart;