import api from "./index";

export type Officer = {
  id: number;
  slug: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  description: string;
  status: string;
};

export type OfficerPayload = {
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  description: string;
  status: string;
};

const officerEndpoints = {
  // Ambil semua Officer
  getOfficers: async (): Promise<Officer[]> => {
    return await api("officers");
  },

  // Ambil satu Officer
  getOfficer: async (slug: string): Promise<Officer> => {
    return await api(`officers/${slug}`);
  },

  // Tambah Officer
  addOfficer: async (officer: OfficerPayload) => {
    return await api("officers", {
      method: "POST",
      data: {
        officer,
      },
    });
  },

  // Update Officer
  updateOfficer: async (
    slug: string,
    officer: OfficerPayload
  ) => {
    return await api(`officers/${slug}`, {
      method: "PATCH",
      data: {
        officer,
      },
    });
  },

  // Hapus Officer
  deleteOfficer: async (slug: string) => {
    return await api(`officers/${slug}`, {
      method: "DELETE",
    });
  },
};

export default officerEndpoints;