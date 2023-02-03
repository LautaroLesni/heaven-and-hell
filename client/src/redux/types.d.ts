interface Categories{
    id:number
    name:string
}
interface Products{
id:number | null
name:string | null
description:string | null
img:string | null
createdAt:string | null
categories:Categories[] | null
}
interface User{
    id:number | null
    username:string | null
    email:string | null
    password:string | null 
    createdAt:string | null
}