import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async create(profileData: Partial<Profile>): Promise<Profile> {
    return this.profileRepository.save(profileData);
  }

  async findAll(): Promise<Profile[]> {
    return this.profileRepository.find();
  }

  async findOne(id: number): Promise<Profile> {
    return this.profileRepository.findOne({ where: { id } });
  }

  async update(id: number, profileData: Partial<Profile>): Promise<Profile> {
    await this.profileRepository.update(id, profileData);
    return this.findOne(id); // Return updated profile
  }

  async delete(id: number): Promise<void> {
    await this.profileRepository.delete(id);
  }
}