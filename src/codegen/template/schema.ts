import { Name } from "..";

export default (name: Name) => `import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Document } from 'mongoose';

export type ${name.upperCamel}Document = ${name.upperCamel} & Document;

@Schema()
export class ${name.upperCamel} {
  @ApiProperty()
  @Prop()
  @IsString()
  name: string;
}

export const ${name.upperCamel}Schema = SchemaFactory.createForClass(${name.upperCamel});`