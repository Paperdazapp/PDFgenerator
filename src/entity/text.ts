import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

const status ={
    STARTED: "Started",
    COMPLETED: "Completed",
}

@Entity()
export class Text {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fileId: string

    @Column()
    text: string

    @Column()
    x_cordinate: string //

    @Column()
    y_cordinate: string //

    @Column({
        default: status.STARTED 
    })
    status: string 

}
