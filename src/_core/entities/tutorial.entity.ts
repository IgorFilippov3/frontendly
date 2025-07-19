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
import { TutorialContentType } from "../models/tutorial-content-type";
import { UserEntity } from "./user.entity";
import { LessonEntity } from "./lesson.entity";
import { TutorialDifficultyLevel } from "../models/tutorial-difficulty-level";

@Entity({
  name: "tutorials",
})
export class TutorialEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: null })
  description: string;

  @Column()
  key: string;

  @Column()
  contentType: TutorialContentType;

  @Column({ default: TutorialDifficultyLevel.intermediate })
  difficulty: TutorialDifficultyLevel;

  @Column({ default: false })
  published: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.tutorials)
  @JoinColumn({ name: "userId" })
  user: UserEntity;

  @OneToMany(() => LessonEntity, (lesson) => lesson.tutorial)
  lessons: LessonEntity[];
}
