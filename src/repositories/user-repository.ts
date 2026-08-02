import BaseRepository from "./base-repository.js";
import User from "../models/user.js";
import { Signup } from "../interfaces/base.js";

class UserRepository extends BaseRepository<Signup> {
  constructor() {
    super(User);
  }
}

export default new UserRepository();
