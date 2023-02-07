import { Controller, Post, Get, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService){}

    @Get()
    getUsers() :Promise<User[]>{
        return this.userService.getUsers();
    }

    @Post('register')
    createUser(@Body() newUser:CreateUserDto){
      return this.userService.createUser(newUser)
    }
    @Post('login')
    loginUser(@Body() authUser:LoginUserDto){
      return this.userService.loginUser(authUser)
    }
}
