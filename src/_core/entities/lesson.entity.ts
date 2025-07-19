import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { TutorialEntity } from "./tutorial.entity";
import { FileEntity } from "./file.entity";

@Entity({
  name: "lessons",
})
export class LessonEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  key: string;

  @Column()
  order: number;

  @Column({ default: null })
  taskHtml: string;

  @Column({ default: null })
  taskMarkdown: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  tutorialId: number;

  @ManyToOne(() => TutorialEntity, (tutorial) => tutorial.lessons)
  @JoinColumn({ name: "tutorialId" })
  tutorial: TutorialEntity;

  @OneToMany(() => FileEntity, (file) => file.lesson)
  files: FileEntity;
}
