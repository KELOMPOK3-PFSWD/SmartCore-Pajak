import api from "./index";

export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  identifier_number: string;
  type_id?: number;
};

export type RegisterPayload = {
  name: string;
  email: string;
  phone: string;
  identifier_number: string;
  password?: string;
  password_confirmation?: string;
  type_id?: number;
};

export type LoginPayload = {
  email: string;
  password: string;
};

const userEndpoints = {
  // Ambil semua user
  getUsers: async (): Promise<User[]> => {
    return await api("users");
  },

  // Ambil satu user
  getUser: async (id: number): Promise<User> => {
    return await api(`users/${id}`);
  },

  // Register User
  register: async (user: RegisterPayload) => {
    return await api("register", {
      method: "POST",
      data: {
        user,
      },
    });
  },

  // Login
  login: async (credentials: LoginPayload) => {
    return await api("login", {
      method: "POST",
      data: credentials,
    });
  },

  // Add User oleh Admin
  addUser: async (user: RegisterPayload) => {
    return await api("users", {
      method: "POST",
      data: {
        user,
      },
    });
  },

  // Update User
  updateUser: async (id: number, user: RegisterPayload) => {
    return await api(`users/${id}`, {
      method: "PATCH",
      data: {
        user,
      },
    });
  },

  // Delete User
  deleteUser: async (id: number) => {
    return await api(`users/${id}`, {
      method: "DELETE",
    });
  },
};

export default userEndpoints;