import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { CoreModule } from "./_core/core.module";
import { AuthMiddleware } from "./auth/auth.middleware";
import { ServeStaticModule } from "@nestjs/serve-static";
import { resolve } from "path";
import { TutorialsModule } from "./tutorials/tutorials.module";
import { LessonsModule } from "./lessons/lessons.module";
import { FilesModule } from "./files/files.module";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, "../web/dist"),
      exclude: ["/api"],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        url: configService.get("DATABASE_URL"),
        type: "postgres",
        entities: ["dist/**/*.entity{.ts,.js}"],
        synchronize: true,
      }),
    }),
    CoreModule,
    AuthModule,
    TutorialsModule,
    LessonsModule,
    FilesModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: "/api", method: RequestMethod.ALL });
  }
}
