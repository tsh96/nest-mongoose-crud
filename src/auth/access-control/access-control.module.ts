import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccessControl, AccessControlSchema } from './access-control.schema';
import { AccessControlService } from './access-control.service';
import { AccessControlController } from './access-control.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AccessControl.name, schema: AccessControlSchema }]),
  ],
  providers: [AccessControlService],
  exports: [AccessControlService],
  controllers: [AccessControlController]
})
export class AccessControlModule { }
