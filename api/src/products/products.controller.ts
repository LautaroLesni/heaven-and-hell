import { Controller, Post, Get, Put, Delete, Param, Query, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { updateProductDto } from './dto/update-product.dto';
import { findProductByNameDto } from './dto/find-product.dto';
import { Product } from './product.entity';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from 'src/users/jwt-auth.guard';

@Controller('products')
export class ProductsController {

    constructor(private productService: ProductsService) { }
    @Get()
    getProducts(@Query() name: any):Promise<Product[]> {
        if (!name.name) {
            return this.productService.getProducts()
        }
        return this.productService.getProductbyName(name)
    }

    @Get(':id')
    getProduct(@Param('id') id: string) {
        //  console.log(typeof id)
        return this.productService.getProduct(id)
    }
    @UseGuards(JwtAuthGuard)
    @Post()
    createProduct(@Body() newProduct: CreateProductDto) {
        return this.productService.createProduct(newProduct)
    }
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    updateProduct(@Param('id') id: string, @Body() updatedData: updateProductDto) {
        return this.productService.updateProduct(id, updatedData)
    }
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteProduct(@Param('id') id: string) {
        return this.productService.deleteProduct(id)
    }
}
