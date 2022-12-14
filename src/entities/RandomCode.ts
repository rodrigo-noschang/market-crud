import { Entity, Column, OneToOne, BeforeInsert, PrimaryGeneratedColumn, JoinTable, JoinColumn } from "typeorm";
import User from "./User";

@Entity()
class RandomCode {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    randomCode!: string

    @OneToOne(type => User)
    @JoinColumn()
    user!: User

    @BeforeInsert()
    generateCode = () => {
        let randomCodeString = '';
        for(let i = 0; i < 7; i ++){
            randomCodeString += Math.floor(Math.random() * 9)        
        }
        this.randomCode = randomCodeString;
    }
}

export default RandomCode;