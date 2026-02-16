import { Module } from '@nestjs/common';
import { GatewayGateway } from './gateway/gateway.gateway';
import { WebhookappController } from './app.controller';
import { WebhookappService } from './app.service';

import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [HttpModule],
  controllers: [WebhookappController],
  providers: [GatewayGateway, WebhookappService],
})
export class AppModule {}


