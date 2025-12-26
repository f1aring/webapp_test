import { IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

export class CreateMurmurDto {
  @IsNotEmpty({ message: 'Content is required' })
  @IsString({ message: 'Content must be a string' })
  @MinLength(1, { message: 'Content cannot be empty' })
  @MaxLength(280, { message: 'Content must not exceed 280 characters' })
  content!: string;
}

