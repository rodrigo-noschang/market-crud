import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('products')
class Product {
    @PrimaryGeneratedColumn('uuid')
    product_id!: string

    @Column()
    product_name!: string

    @Column()
    product_description!: string

    @Column()
    created_at!: Date

    @Column()
    updated_at!: Date

    @Column()
    price!: number

    @Column()
    amount_in_stock!: number

    constructor() {
        this.created_at = new Date();
        this.updated_at = new Date();
        this.product_description = this.product_description || "";
    }
}

export default Product;