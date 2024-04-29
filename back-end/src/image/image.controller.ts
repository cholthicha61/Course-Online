import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateImageDto } from './dto/update-image.dto';
const MAX_PROFILE_PICTURE_SIZE_IN_BYTES = 2 * 1024 * 1024;

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}
  
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file) {
    return file;
  }

  // @Post()
  // create(@Body() createImageDto: CreateImageDto) {
  //   return this.imageService.create(createImageDto);
  // }

  @Get()
  findAll() {
    return this.imageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imageService.update(+id, updateImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imageService.remove(+id);
  }

  
}
