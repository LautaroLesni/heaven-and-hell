import { Controller, Post, Get, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService){}

    @Get()
    getUsers() :Promise<User[]>{
        return this.userService.getUsers();
    }

    @Post()
    createUser(@Body() newUser:CreateUserDto){
      return this.userService.createUser(newUser)
    }
}
