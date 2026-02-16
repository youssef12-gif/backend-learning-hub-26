import { Injectable } from '@nestjs/common';
import {HttpService} from "@nestjs/axios"
import { firstValueFrom } from 'rxjs';
@Injectable()
export class WebhookappService {
  constructor (private readonly httpservice: HttpService){}
  async welcomediscord(name :string):  Promise<void>{
  const  url= "https://discord.com/api/webhooks/1471994279454052466/iJ3DnQ067Cd-XTQcNiDhTxY1Gwaw4NeJPS84rat995DFaTfJnl5C7JfxCwEG8knaHbF4"
    await firstValueFrom(this.httpservice.post(url,{content:`welcom ${name}`}))
  }
}
