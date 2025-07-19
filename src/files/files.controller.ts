import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { FilesService } from "src/_core/services/files.service";
import { CreateFileDto } from "./dto/create-file.dto";
import { UpdateFileDto } from "./dto/update-file.dto";

@Controller("files")
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.filesService.findById(+id);
  }

  @Post()
  create(@Body() createFileDto: CreateFileDto) {
    return this.filesService.create(createFileDto);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.filesService.update(+id, updateFileDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.filesService.remove(+id);
  }

  @Get()
  findAll(@Query("lessonId") lessonId?: string) {
    if (lessonId) {
      return this.filesService.findByLessonId(+lessonId);
    }
    return this.filesService.findAll();
  }
}
