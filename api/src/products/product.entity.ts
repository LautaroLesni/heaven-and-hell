import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity({name:'products'})
export class Product{
@PrimaryGeneratedColumn()
id:number
@Column({unique:true})
name:string
@Column()
description:string
@Column()
img:string
@Column({type:'timestamp', default: ()=>'CURRENT_TIMESTAMP'})
createdAt:Date
}