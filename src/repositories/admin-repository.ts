import Admin from "../models/admin.js";
import { Signup } from "../interfaces/admin.js";


class AdminRepos {
  async create(body: Signup) {
    return await Admin.create({
      ...body,
    });
  }
}

export default new AdminRepos();
