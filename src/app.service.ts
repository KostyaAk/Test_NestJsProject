import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello, it is test project using Nest.js framework !!!';
  }
}
