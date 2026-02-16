import { Param, Controller, Get, Post } from '@nestjs/common';
import { WebhookappService } from './app.service';

@Controller("app")
export class WebhookappController {
  constructor(private readonly webhookappService: WebhookappService) {}

  @Get("welcome/:name")
  async welcomediscord(@Param('name') name:string):  Promise<string> {
    await this.webhookappService.welcomediscord(name)
    return "welcome message sent to discord"
  }
}