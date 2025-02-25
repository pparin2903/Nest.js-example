import { UserDetailsService } from './user_details.service';

export class UserDetailsController {
  constructor(private readonly userDetailsService: UserDetailsService) {}
}
