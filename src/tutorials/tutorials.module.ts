import { Module } from "@nestjs/common";
import { TutorialsController } from "./tutorials.controller";

@Module({
  controllers: [TutorialsController],
})
export class TutorialsModule {}
