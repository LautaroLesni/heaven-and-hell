import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm'
import { Category } from 'src/categories/category.entity'

@Entity({name:'products'})
export class Product{
@PrimaryGeneratedColumn()
id:number
@Column({unique:true})
name:string
@Column({default:''})
description:string
@Column({default:''})
img:string
@Column({type:'timestamp', default: ()=>'CURRENT_TIMESTAMP'})
createdAt:Date
@ManyToMany(()=> Category, category => category.products)
categories:Category[];
}