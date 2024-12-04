import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProfileService } from './profile.service';
import { Profile } from './entities/profile.entity';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads', // Folder where images will be stored
        filename: (req, file, callback) => {
          const uniqueName =
            Date.now() + '-' + Math.round(Math.random() * 1e9) + extname(file.originalname);
          callback(null, uniqueName);
        },
      }),
    }),
  )
  async create(
    @Body() profileData: Partial<Profile>,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Profile> {
    if (file) {
      profileData.photourl = `/uploads/${file.filename}`;
    }
    return this.profileService.create(profileData);
  }

  @Get()
  async findAll(): Promise<Profile[]> {
    return this.profileService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Profile> {
    return this.profileService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() profileData: Partial<Profile>,
  ): Promise<Profile> {
    return this.profileService.update(id, profileData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.profileService.delete(id);
  }
}
