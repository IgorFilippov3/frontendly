import { NestFactory } from "@nestjs/core";
import * as session from "express-session";
import { TypeormStore } from "connect-typeorm";
import { AppModule } from "./app.module";
import { DataSource } from "typeorm";
import { Session } from "./_core/entities/session.entity";
import { ONE_MONTH } from "./_core/constants/time";
import { Logger } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger: Logger = new Logger("bootstrap");

  const port = process.env.PORT || 3000;
  const host = process.env.HOST || "localhost";

  app.use(
    session({
      secret: process.env.SESSION_SECRET || "super-secret",
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: ONE_MONTH, httpOnly: true, sameSite: "lax" },
      store: new TypeormStore({
        cleanupLimit: 2,
        limitSubquery: false,
        ttl: ONE_MONTH,
      }).connect(app.get(DataSource).getRepository(Session)),
    }),
  );

  app.setGlobalPrefix("api");

  await app.listen(port, host);

  logger.log(`Application listening on port ${port}`);
}

bootstrap();
