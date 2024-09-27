import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configure CORS
  app.enableCors({
    origin: 'http://localhost:3000', // Votre URL frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Configure session
  app.use(
    session({
      secret: 'your-secret-key', // Remplacez par une clé secrète pour sécuriser les sessions
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }, // Définir `true` si vous utilisez HTTPS
    }),
  );

  // Initialize passport
  app.use(passport.initialize());
  app.use(passport.session());

  app.useGlobalPipes(new ValidationPipe());

  // Middleware global pour logger les requêtes
  app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.path}`);
    next();
  });
  
  await app.listen(3001);
  console.log(`Server is running on http://localhost:3001`);
}
bootstrap();
