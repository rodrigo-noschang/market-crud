import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToOne, JoinColumn } from "typeorm";
import * as bcrypt from 'bcryptjs';
import Cart from "./Cart";

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column()
    user_name!: string

    @Column()
    user_email!: string

    @Column()
    user_password!: string

    @Column()
    is_admin!: boolean

    @Column()
    created_at!: Date

    @Column()
    updated_at!: Date

    @OneToOne(type => Cart)
    @JoinColumn()
    user_cart!: Cart

    constructor() {
        this.created_at = new Date();
        this.updated_at = new Date();
    }

    @BeforeInsert()
    hashPassword = () => {
        this.user_password = bcrypt.hashSync(this.user_password, 10);   
    }
}

export default User