import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity({name:'users'})
export class User{
@PrimaryGeneratedColumn()
id:number
@Column({unique:true})
username:string
@Column()
email:string
@Column()
password:string
@Column({type:'timestamp', default: ()=>'CURRENT_TIMESTAMP'})
createdAt:Date
}