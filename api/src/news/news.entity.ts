import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany } from 'typeorm'


@Entity({name:'news'})
export class Noticia{
@PrimaryGeneratedColumn('uuid')
id:string
@Column({default:''})
title:string
@Column({default:''})
description:string
@Column({default:''})
link:string
@Column({default:''})
img:string
@Column({type:'timestamp', default: ()=>'CURRENT_TIMESTAMP'})
createdAt:Date
}