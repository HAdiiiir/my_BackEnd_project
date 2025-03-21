import { JsonController, Get, UseBefore } from 'routing-controllers';
import { checkRole } from '../middlewares/roleMiddleware';

@JsonController('/protected')
export class ProtectedController {
  @Get('/admin')
  @UseBefore(checkRole(['admin']))
  adminOnly() {
    return { message: 'Welcome, Admin!' };
  }

  @Get('/manager')
  @UseBefore(checkRole(['manager']))
  managerOnly() {
    return { message: 'Welcome, Manager!' };
  }

  @Get('/user')
  @UseBefore(checkRole(['user']))
  userOnly() {
    return { message: 'Welcome, User!' };
  }
}