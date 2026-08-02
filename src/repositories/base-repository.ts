class BaseRepository<T> {
  constructor(public model: any) {}

  async create(body: T) {
    return this.model.create(body);
  }
  async update(id: string, body: Partial<T>) {
    return this.model.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
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
