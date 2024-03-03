import { Column, Model, Table, DataType, DeletedAt} from 'sequelize-typescript';
import { IsNotEmpty, MinLength, IsEmail, IsEnum,IsPhoneNumber } from 'class-validator';

@Table({tableName: "users"})
export default class User extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  @IsNotEmpty()
  full_name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @Column({ type: DataType.ENUM, allowNull: true, values:['male', 'female', 'other'] })
  @IsNotEmpty()
  gender: string;

  @Column({ type: DataType.STRING, allowNull: false })
  @IsNotEmpty()
  phone_no: string;

  @DeletedAt
  deletedAt?: Date;
}