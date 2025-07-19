import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { UsersService } from "./services/users.service";
import { AuthService } from "./services/auth.service";
import { TutorialEntity } from "./entities/tutorial.entity";
import { TutorialsService } from "./services/tutorials.service";
import { LessonEntity } from "./entities/lesson.entity";
import { FileEntity } from "./entities/file.entity";
import { LessonsService } from "./services/lessons.service";
import { FilesService } from "./services/files.service";

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      TutorialEntity,
      LessonEntity,
      FileEntity,
    ]),
  ],
  providers: [
    UsersService,
    AuthService,
    TutorialsService,
    LessonsService,
    FilesService,
  ],
  exports: [
    UsersService,
    AuthService,
    TutorialsService,
    LessonsService,
    FilesService,
  ],
})
export class CoreModule {}
