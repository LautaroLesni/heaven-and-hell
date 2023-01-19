import { Controller, Post, Get, Put, Delete , Param , Body, ParseIntPipe } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { updateProductDto } from './dto/update-product.dto';
import { Product } from './product.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {

    constructor(private productService:ProductsService){}

    @Get()
    getProducts():Promise<Product[]>{
        return this.productService.getProducts()
    }

    @Get(':id')
    getProduct(@Param('id', ParseIntPipe) id:number){
        console.log(typeof id)
        return this.productService.getProduct(id)
    }
    @Post()
    createProduct(@Body() newProduct:CreateProductDto){
        return this.productService.createProduct(newProduct)
    }
    @Put(':id')
    updateProduct(@Param('id', ParseIntPipe) id:number, @Body()updatedData:updateProductDto){
        return this.productService.updateProduct(id, updatedData)
    }
    @Delete(':id')
    deleteProduct(@Param('id', ParseIntPipe) id:number){
        return this.productService.deleteProduct(id)
    }   
}
