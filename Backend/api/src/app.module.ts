import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CampaignsModule } from './campaigns/campaigns.module';
import { Campaign } from './campaigns/entities/campaign/campaign';
import { SocialNetworksModule } from './social-networks/social-networks.module';
import { SocialNetwork } from './social-networks/social-networks.entity';
import { CampaignSocialNetworksModule } from './campaign_social-networks/campaign_social-networks.module';
import { CampaignSocialNetwork } from './campaign_social-networks/campaign_social_networks.entity';
import { ReviewsModule } from './reviews/reviews.module';
import { Reviews } from './reviews/reviews.entity';
import { StatisticsModule } from './statistics/statistics.module';
import { Statistiques } from './statistics/statistics.entity';
import { HistoriqueStatistiquesService } from './historique/historique.service';
import { HistoriqueStatistiquesController } from './historique/historique.controller';
import { HistoriqueStatistiques } from './historique/historique.entity';
import { HistoriqueModule } from './historique/historique.module';
import { RapportsModule } from './rapports/rapports.module';
import { Rapport } from './rapports/rapports.entity';
import { NeedsModule } from './needs/needs.module';
import { Besoins } from './needs/needs.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'Pub',
      entities: [
        User, 
        Campaign, 
        SocialNetwork, 
        CampaignSocialNetwork, 
        Reviews, 
        Statistiques, 
        HistoriqueStatistiques, 
        Rapport,
        Besoins // Ajout de l'entité Rapport ici
      ],
      synchronize: false,
    }),
    UserModule,
    AuthModule,
    CampaignsModule,
    SocialNetworksModule,
    CampaignSocialNetworksModule,
    ReviewsModule,
    StatisticsModule,
    HistoriqueModule,
    RapportsModule,
    NeedsModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
