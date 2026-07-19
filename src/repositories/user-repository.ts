import BaseRepository from "./base-repository.js";
import User from "../models/user.js";

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }
}

export default new UserRepository();
