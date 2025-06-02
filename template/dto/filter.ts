
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';
import { ToUpperCase } from 'src/utils/ToUpperCase';

export class Filter<className>Dto {
  @ApiProperty({
    example: '1',
    name: 'codigo',
  })
  @IsString()
  @ToUpperCase()
  @Length(0, 1)
  @IsOptional()
  codigo: string;
  @ApiProperty({
    example: 'CONSULTA',
    name: 'descripcion',
  })
  @IsString()
  @ToUpperCase()
  @Length(0, 20)
  @IsOptional()
  descripcion: string;
  @ApiProperty({
    example: 'CON',
    name: 'corta',
  })
  @IsString()
  @ToUpperCase()
  @Length(0, 3)
  @IsOptional()
  corta: string;
}
