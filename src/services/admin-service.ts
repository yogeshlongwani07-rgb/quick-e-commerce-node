import AdminRepos from "../repositories/admin-repository.js";
import { Signup } from "../interfaces/admin.js";

class AdminServices {
  async create(body: Signup) {
    return await AdminRepos.create(body);
  }
}

export default new AdminServices();
