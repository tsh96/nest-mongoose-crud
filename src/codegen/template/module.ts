import { Name } from "..";

export default (name: Name) => `import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ${name.upperCamel}, ${name.upperCamel}Schema } from './${name.lowerCamel}.schema';
import { ${name.upperCamelPlural}Controller } from './${name.lowerCamelPlural}.controller';
import { ${name.upperCamelPlural}Service } from './${name.lowerCamelPlural}.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ${name.upperCamel}.name, schema: ${name.upperCamel}Schema }]),
  ],
  controllers: [${name.upperCamelPlural}Controller],
  providers: [${name.upperCamelPlural}Service],
})
export class ${name.upperCamelPlural}Module { }`