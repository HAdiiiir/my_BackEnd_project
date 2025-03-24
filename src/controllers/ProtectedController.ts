import { JsonController, Get, UseBefore } from 'routing-controllers';
import { authMiddleware } from '../middlewares/authMiddleware';
import { checkRole } from '../middlewares/roleMiddleware';

@JsonController('/protected')
export class ProtectedController {
  @Get('/admin')
  @UseBefore(authMiddleware, checkRole(['admin']))
  adminOnly(req: Request) {
    return { message: 'Welcome, Admin!' };
  }

  @Get('/manager')
  @UseBefore(authMiddleware, checkRole(['manager']))
  managerOnly(req: Request) {
    return { message: 'Welcome, Manager!'};
  }

  @Get('/user')
  @UseBefore(authMiddleware, checkRole(['user']))
  userOnly(req: Request) {
    return { message: 'Welcome, User!'};
  }
}