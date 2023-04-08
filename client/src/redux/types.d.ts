interface Categories{
    id:number
    name:string
}
interface Products{
id:number | null
name:string | null
description:string | null
img:string | null
width: string | null
weigth: string | null
height: string | null
materials: string | null
createdAt:string | null
categories:Categories[] | null
}
interface Noticias{
    id:string | null
    title:string | null
    description:string | null
    link:string | null
    img:string | null
}
interface User{
    id:number | null
    username:string | null
    email:string | null
    password:string | null 
    createdAt:string | null
}