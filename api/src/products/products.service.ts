import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, In } from 'typeorm'
import { Product } from './product.entity';
import { Category } from 'src/categories/category.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { updateProductDto } from './dto/update-product.dto';
import { findProductByNameDto } from './dto/find-product.dto';
import { ILike } from "typeorm"

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
        newProduct.height = product.height
        newProduct.width = product.width
        newProduct.materials = product.materials
        newProduct.weigth = product.weigth
        if (product.categories.length > 0) {
            const categoriesIds = product.categories
            const categories = await this.categoryRepository.findBy({
                id: In(categoriesIds)
            })
            newProduct.categories = categories
        }
        await this.productRepository.save(newProduct)
        //Para refrescar la base de datos y mostrar la información nueva
        const products = await this.productRepository.find({relations: ['categories', 'images']})
        return products
    }
   async getProducts() {
        const products = await this.productRepository.find({relations: ['categories', 'images']})
        return products
    }
    getProduct(id: string) {
        return this.productRepository.findOne({
            where: { id: id },
            relations: ['categories']
        },)
    }
    getProductbyName(query:any){
        return this.productRepository.findBy({
            name:ILike(`%${query.name}%`)
        })
    }
   async deleteProduct(id: string) {
    const foundProduct = await this.productRepository.findOneBy({ id })
        foundProduct.categories = []
        await this.productRepository.save(foundProduct)
    
      await this.productRepository.delete({ id })
      const products = await this.productRepository.find({relations: ['categories', 'images']})
      return products
    }
    async updateProduct(id: string, updatedProduct: updateProductDto) {
        const foundProduct = await this.productRepository.findOneBy({ id })
        foundProduct.name = updatedProduct.name
        foundProduct.description = updatedProduct.description
        foundProduct.img = updatedProduct.img
        foundProduct.height = updatedProduct.height
        foundProduct.width = updatedProduct.width
        foundProduct.materials = updatedProduct.materials
        foundProduct.weigth = updatedProduct.weigth
            const foundCategories = await this.categoryRepository.findBy({ id: In(updatedProduct.categories) })
            foundProduct.categories = foundCategories
        
        await this.productRepository.save(foundProduct)
        //Para refrescar la base de datos y mostrar la información nueva
        const products = await this.productRepository.find({relations: ['categories', 'images']})
        return products
    }
}
