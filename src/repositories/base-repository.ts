import { Signup } from "../interfaces/admin.js";
class BaseRepository {
  constructor(public model: any) {}

  async create(body: Signup) {
    return await this.model.create(body);
  }
  async findByEmail(email: string) {
    return await this.model.findOne({ email });
  }
}

export default BaseRepository;
