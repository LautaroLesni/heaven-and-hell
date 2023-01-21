import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Category } from './category.entity';
import { Product } from 'src/products/product.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepository: Repository<Category>,
    @InjectRepository(Product) private productyRepository: Repository<Product>
    ) {}

  createCategory(categoria: CreateCategoryDto) {
    const newCategory = new Category()
    newCategory.name = categoria.name
    return this.categoryRepository.save(newCategory)
  }

  getCategories() {
    return this.categoryRepository.find();
  }

  getCategory(id: number) {
    return this.categoryRepository.findOne({where:{id: id},relations:['products']})
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const categoryFound = await this.categoryRepository.findOne({where:{id:id}})
    categoryFound.name = updateCategoryDto.name
    return this.categoryRepository.save(categoryFound)
  }

  deleteCategory(id: number) {
    return this.categoryRepository.delete({id: id})
  }
}
