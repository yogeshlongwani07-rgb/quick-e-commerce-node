import { Signup } from "../interfaces/admin.js";
class BaseRepository {
  constructor(public model: any) {}

  async create(body: Signup) {
    return this.model.create(body);
  }
  async findByEmail(email: string) {
    return this.model.findOne({ email });
  }
}

export default BaseRepository;
