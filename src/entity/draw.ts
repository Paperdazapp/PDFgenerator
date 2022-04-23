import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm"

@Entity()
export class Draw {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fileId: string

    @Column()
    drawing: string

    @Column()
    x_cordinate: string

    @Column()
    y_cordinate: string

    @CreateDateColumn()
    create_at: number

}
