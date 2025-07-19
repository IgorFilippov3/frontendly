import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserEntity } from "../entities/user.entity";

export const GetUserId = createParamDecorator(
  (data: unknown, context: ExecutionContext): UserEntity => {
    const request = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return request.session?.userId;
  },
);
