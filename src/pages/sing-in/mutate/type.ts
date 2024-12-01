export interface Userdata {
  login: string;
  password: string;
}

export interface LoginResponsTpype {
  data: {
    accessToken: string;
    refreshToken: string;
    staffInfo: {
      id: number;
      photo: string;
      user: { id: number; userType: number; status: number };
      firstName: string;
      lastName: string;
    };
  };
  error: null;
  success: boolean;
}
