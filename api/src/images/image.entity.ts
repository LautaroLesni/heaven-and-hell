import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Product } from 'src/products/product.entity'

@Entity({name:'image'})
export class Image{
@PrimaryGeneratedColumn('uuid')
id:string
@Column({default:'https://imgur.com/a/u2qEqO1'})
url:string
@Column({type:'timestamp', default: ()=>'CURRENT_TIMESTAMP'})
createdAt:Date
@ManyToOne(()=> Product, product => product.images)
product: Product
}