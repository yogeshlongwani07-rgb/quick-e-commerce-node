import { Signup } from "../interfaces/base.js";
class BaseRepository {
  constructor(public model: any) {}

  async create(body: Signup) {
    return this.model.create(body);
  }
  async findByEmail(email: string) {
    return this.model.findOne({ email });
  }
  async delete(id: string) {
    return this.model.deleteOne({ _id: id });
  }
  async findById(id: string) {
    return this.model.findById(id);
  }
}

export default BaseRepository;
