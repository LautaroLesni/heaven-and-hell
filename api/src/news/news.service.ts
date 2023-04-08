import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, In } from 'typeorm'
import { Noticia } from './news.entity';

@Injectable()
export class NewsService {

  constructor(
    @InjectRepository(Noticia) private newsRepository: Repository<Noticia>,
  ) { }
  async createNew(newNoticia: CreateNewsDto) {
    const nuevaNoticia = new Noticia()
    nuevaNoticia.title = newNoticia.title
    nuevaNoticia.description = newNoticia.description
    nuevaNoticia.img = newNoticia.img
    nuevaNoticia.link = newNoticia.link
    await this.newsRepository.save(nuevaNoticia)
    const allNews = await this.newsRepository.find()
    return allNews
  }

  async getNoticias() {
    const allNews = await this.newsRepository.find()
    return allNews

  }

  getNoticia(id: string) {
    return  this.newsRepository.findOne({where:{id: id}})
  }

  async updateNoiticia(id: string, updateNewsDto: UpdateNewsDto) {
    const foundNoticia = await this.newsRepository.findOne({where:{id}})
    if (!foundNoticia){
      return new HttpException('Noticia no encontrada', HttpStatus.NOT_FOUND)
    }
    foundNoticia.title = updateNewsDto.title
    foundNoticia.description = updateNewsDto.description
    foundNoticia.img = updateNewsDto.img
    foundNoticia.link = updateNewsDto.link
    await this.newsRepository.save(foundNoticia)
    const allNews = this.newsRepository.find()
    return allNews
  }

  async removeNoticia(id: string) {
     await this.newsRepository.delete({ id })

    return this.newsRepository.find()
  }
}
