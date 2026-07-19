import { Signup } from "../interfaces/admin.js";
class BaseRepository {
  constructor(public model: any) {}

  async create(body: Signup) {
    return this.model.create(body);
  }
}

export default BaseRepository;
