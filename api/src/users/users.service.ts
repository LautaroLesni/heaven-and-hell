import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { hash, compare } from 'bcrypt';
import { HttpException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt'



@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService) { }
    async createUser(user: CreateUserDto) {
        const rawPassword = user.password // raw password from body input
        const plainToHash = await hash(rawPassword, 10) // function that hashes password into a complex one
        const hashedPasswordUser = { ...user, password: plainToHash } // using destructuring to insert the hashed password into the new created user
        const newUser = this.userRepository.create(hashedPasswordUser)
        return this.userRepository.save(newUser)
    }
    getUsers() {
        return this.userRepository.find()
    }

    async loginUser(authUser: LoginUserDto) {
        const { email, password } = authUser
        const findUser = await this.userRepository.findOne({
            where: { email }
        })
        if (!findUser){
            return new HttpException('User not found',404)
        }
        const checkPassword = await compare(password, findUser.password)
        if (!checkPassword){
            return new HttpException('Incorrect Password',403)
        }
        const payload = {id:findUser.id, username: findUser.username, email: findUser.email}
        const token = this.jwtService.sign(payload)
        const data = {
            status:200,
            user:findUser,
            token:token
        }
        return data
    }
}
