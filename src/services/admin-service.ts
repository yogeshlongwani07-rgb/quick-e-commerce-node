import Admin from "../models/admin.js";

interface Signup {
  name: string;
  email: string;
  password: string;
}

class AdminServices {
  async create(body: Signup) {
    const { name, email, password } = body;
    await Admin.create({
      name,
      email,
      password,
    });
  }
}

export default new AdminServices();
