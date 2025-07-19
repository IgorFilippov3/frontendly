import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { LessonEntity } from "./lesson.entity";

@Entity({
  name: "files",
})
export class FileEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: null })
  code: string;

  @Column()
  path: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  lessonId: number;

  @ManyToOne(() => LessonEntity, (lesson) => lesson.files)
  @JoinColumn({ name: "lessonId" })
  lesson: LessonEntity;
}
