import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm'
import { Product } from 'src/products/product.entity'

@Entity('categories')
export class Category {

@PrimaryGeneratedColumn()
id:number

@Column()
name:string

@ManyToMany(()=> Product, product => product.categories)
@JoinTable({name: 'products_categories', joinColumn:{name:'category_id'}, inverseJoinColumn:{name:'product_id'}})
products:Product[]

}
