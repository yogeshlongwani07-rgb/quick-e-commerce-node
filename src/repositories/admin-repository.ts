import Admin from "../models/admin.js";
import BaseRepository from "./base-repository.js";
import { Signup } from "../interfaces/base.js";

class AdminRepository extends BaseRepository<Signup> {
  constructor() {
    super(Admin);
  }
}

export default new AdminRepository();
