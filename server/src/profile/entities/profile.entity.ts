import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  companyname: string;

  @Column({ nullable: true })
  websiteurl: string;

  @Column({ nullable: true })
  registrationnumber: string;

  @Column({ nullable: true })
  industry: string;

  @Column({ nullable: true })
  accounttype: string;

  @Column({ nullable: true })
  dateregistered: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phonenumber: string;

  @Column({ nullable: true })
  streetaddress: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  zipcode: string;

  @Column({ nullable: true })
  countryregion: string;

  @Column({ nullable: true })
  photourl: string; // Optional for the photo
}
