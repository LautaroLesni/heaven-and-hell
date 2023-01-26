interface Categories{
    id:number
    name:string
}
interface Products{
id:number
name:string
description:string
img:string
createdAt:string
categories:Categories[]
}
interface User{
    id:number | null
    username:string | null
    email:string | null
    password:string | null 
    createdAt:string | null
}