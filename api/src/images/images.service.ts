import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Repository, In } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from 'src/products/product.entity';
import { Image } from './image.entity';
import { generateUploadURL } from 'src/s3/s3';

@Injectable()
export class ImagesService {

  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Image) private imageRepository: Repository<Image>
  ){}
  
  async createImage(image: CreateImageDto) {

    const newImage = new Image()
    newImage.url = image.url
    await this.imageRepository.save(newImage)
    const product = await this.productRepository.findOneBy({id:image.idproduct})
    const imgids = image.imagesID
    if (imgids.length > 0){
      imgids.push(newImage.id)
      const images = await this.imageRepository.findBy({
        id: In(imgids)})
        product.images = images
        return this.productRepository.save(product);
    }
    product.images = [newImage]
    return this.productRepository.save(product);
  }

  async getImages() {
    const images = await this.imageRepository.find({relations: ['product']})
    return images
  }
  async getImageURL() {
    const url = await generateUploadURL()
    return {url}
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
