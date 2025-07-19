import { Injectable, NotFoundException } from "@nestjs/common";
import { FileEntity } from "../entities/file.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateFileDto } from "src/files/dto/create-file.dto";
import { UpdateFileDto } from "src/files/dto/update-file.dto";

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
  ) {}

  async create(createFileDto: CreateFileDto): Promise<FileEntity> {
    const file = this.fileRepository.create(createFileDto);
    return await this.fileRepository.save(file);
  }

  async update(id: number, updateFileDto: UpdateFileDto): Promise<FileEntity> {
    const file = await this.findById(id);

    Object.assign(file, updateFileDto);

    return await this.fileRepository.save(file);
  }

  async findById(id: number): Promise<FileEntity> {
    const file = await this.fileRepository.findOne({
      where: { id },
    });

    if (!file) {
      throw new NotFoundException(`File with ID ${id} not found`);
    }

    return file;
  }

  async findByLessonId(lessonId: number): Promise<FileEntity[]> {
    return await this.fileRepository.find({ where: { lessonId } });
  }

  async findAll(): Promise<FileEntity[]> {
    return await this.fileRepository.find();
  }

  async remove(id: number): Promise<void> {
    const file = await this.findById(id);
    await this.fileRepository.remove(file);
  }
}
