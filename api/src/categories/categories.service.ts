import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Category } from './category.entity';
import { Product } from 'src/products/product.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepository: Repository<Category>,
    @InjectRepository(Product) private productyRepository: Repository<Product>
    ) {}

  async createCategory(categoria: CreateCategoryDto) {
    const categoryFound = await this.categoryRepository.findOne({where:{name:categoria.name}})
    if (categoryFound){
      return new HttpException('Ya existe esta categoría', HttpStatus.CONFLICT)
    }
    const newCategory = new Category()
    newCategory.name = categoria.name
    await this.categoryRepository.save(newCategory)
    return this.categoryRepository.find({relations: ['products']});
  }

  getCategories() {
    return this.categoryRepository.find({relations: ['products']});
  }

  getCategory(id: string) {
    return this.categoryRepository.findOne({where:{id: id},relations:['products']})
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const categoryFound = await this.categoryRepository.findOne({where:{id:id}})
    categoryFound.name = updateCategoryDto.name
    await this.categoryRepository.save(categoryFound)
    return this.categoryRepository.find({relations: ['products']});
  }

  async deleteCategory(id: string) {
    const foundCategory = await this.categoryRepository.findOne({where:{id: id}})
    foundCategory.products = []
    await this.categoryRepository.save(foundCategory)
    await this.categoryRepository.delete({id: id})
    return this.categoryRepository.find({relations: ['products']});
  }
}
