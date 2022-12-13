import { Body, Controller, Get, Post } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateNotificationBody } from './createNotificationBody';
import { PrismaService } from './Services/prisma/prisma.service';

@Controller('api/notifications')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  listNotifications() {
    return this.prisma.notification.findMany();
  }

  @Post()
  async createNotification(@Body() body: CreateNotificationBody) {
    const {recipientId, content, category} = body;
    
    await this.prisma.notification.create({
      data: {
        id: randomUUID(), 
        content,
        category,
        recipientId
      }
    })
  }

}
