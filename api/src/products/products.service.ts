import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, In } from 'typeorm'
import { Product } from './product.entity';
import { Category } from 'src/categories/category.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { updateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>,
        @InjectRepository(Category) private categoryRepository: Repository<Category>
    ) { }

    async createProduct(product: CreateProductDto) {
        const newProduct = new Product()
        newProduct.name = product.name
        newProduct.description = product.description
        newProduct.img = product.img
        if (product.categories) {
            const categoriesIds = product.categories
            const categories = await this.categoryRepository.findBy({
                id: In(categoriesIds)
            })
            newProduct.categories = categories
        }

        return this.productRepository.save(newProduct)
    }
   async getProducts() {
        const products = await this.productRepository.find({relations: ['categories']})
        return products
    }
    getProduct(id: number) {
        return this.productRepository.findOne({
            where: { id: id },
            relations: ['categories']
        },)
    }
    deleteProduct(id: number) {
        return this.productRepository.delete({ id })
    }
    async updateProduct(id: number, updatedProduct: updateProductDto) {
        const foundProduct = await this.productRepository.findOneBy({ id })
        foundProduct.name = updatedProduct.name
        foundProduct.description = updatedProduct.description
        foundProduct.img = updatedProduct.img
        if (updatedProduct.categories) {
            const foundCategories = await this.categoryRepository.findBy({ id: In(updatedProduct.categories) })
            foundProduct.categories = foundCategories
        }

        return this.productRepository.save(foundProduct)
    }
}
