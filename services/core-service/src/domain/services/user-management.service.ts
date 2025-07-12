import { UserRepository } from '../../infrastructure/repositories/user.repository.impl';

export class UserManagementService {
	private userRepository = new UserRepository();
}
