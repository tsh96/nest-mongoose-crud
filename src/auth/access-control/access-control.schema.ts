import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type AccessControlDocument = AccessControl & Document;

@Schema()
export class Permission {
  @Prop()
  @ApiProperty()
  resource: string;

  @Prop()
  @ApiProperty()
  actions: string[];
}

@Schema()
export class AccessControl {
  @Prop()
  @ApiProperty()
  role: string;

  @Prop()
  @ApiProperty()
  permissions: Permission[];
}

export const AccessControlSchema = SchemaFactory.createForClass(AccessControl);