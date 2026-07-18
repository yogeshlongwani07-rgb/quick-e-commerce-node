import BaseRepos from "./base-repository.js";
import Admin from "../models/admin.js";

class AdminRepos extends BaseRepos {
  constructor() {
    super(Admin);
  }
}

export default AdminRepos;
