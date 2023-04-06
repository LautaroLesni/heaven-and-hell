import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany } from 'typeorm'
import { Category } from 'src/categories/category.entity'
import { Image } from 'src/images/image.entity'

@Entity({name:'products'})
export class Product{
@PrimaryGeneratedColumn('uuid')
id:string
@Column({unique:true, default:''})
name:string
@Column({default:''})
description:string
@Column({default:''})
height:string
@Column({default:''})
width:string
@Column({default:''})
weigth:string
@Column({default:''})
materials:string
@Column({default:''})
img:string
@Column({type:'timestamp', default: ()=>'CURRENT_TIMESTAMP'})
createdAt:Date
@ManyToMany(()=> Category, category => category.products)
categories:Category[];
@OneToMany(()=>Image, image => image.product)
images: Image[]
}