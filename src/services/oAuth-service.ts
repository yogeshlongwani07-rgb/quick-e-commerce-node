class oAuthService {
  async createUrl(state: string) {
    const params = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
      response_type: "code",
      scope: "openid email profile",
      state: state,
    });

    const url =
      "https://accounts.google.com/o/oauth2/v2/auth?" + params.toString();
    return url;
  }

  async validateOrCreate() {
    
  }
}

export default new oAuthService();
