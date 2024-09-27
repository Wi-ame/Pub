import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity'; // Assurez-vous que le chemin est correct

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // Vous pouvez ajouter des méthodes personnalisées pour interagir avec la base de données ici
}
