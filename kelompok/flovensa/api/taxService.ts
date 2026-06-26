import api from "./index";

export type TaxService = {
  id: number;
  name: string;
  slug: string;
  description: string;
  status: string;
  icon: string;
  color: string;
};

export type TaxServicePayload = {
  name: string;
  description: string;
  status: string;
  icon: string;
  color: string;
};

const taxServiceEndpoints = {
  // Ambil semua Tax Service
  getTaxServices: async (): Promise<TaxService[]> => {
    return await api("tax_services");
  },

  // Ambil satu Tax Service
  getTaxService: async (slug: string): Promise<TaxService> => {
    return await api(`tax_services/${slug}`);
  },

  // Tambah Tax Service
  addTaxService: async (taxService: TaxServicePayload) => {
    return await api("tax_services", {
      method: "POST",
      data: {
        tax_service: taxService,
      },
    });
  },

  // Update Tax Service
  updateTaxService: async (
    slug: string,
    taxService: TaxServicePayload
  ) => {
    return await api(`tax_services/${slug}`, {
      method: "PATCH",
      data: {
        tax_service: taxService,
      },
    });
  },

  // Hapus Tax Service
  deleteTaxService: async (slug: string) => {
    return await api(`tax_services/${slug}`, {
      method: "DELETE",
    });
  },
};

export default taxServiceEndpoints;