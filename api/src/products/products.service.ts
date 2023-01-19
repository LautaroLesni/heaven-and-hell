import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { updateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {

    constructor(@InjectRepository(Product) private productRepository: Repository<Product>) {}

    createProduct(product: CreateProductDto) {
        const newProduct = this.productRepository.create(product)
        return this.productRepository.save(newProduct)
    }
    getProducts(){
        return this.productRepository.find()
    }
    getProduct(id:number){
        return this.productRepository.findOne({
            where: { id: id }
        })
    }
    deleteProduct(id:number){
        return this.productRepository.delete({id})       
    }
    updateProduct(id:number, updatedProduct: updateProductDto){
        return this.productRepository.update({id: id}, updatedProduct)
    }
}
