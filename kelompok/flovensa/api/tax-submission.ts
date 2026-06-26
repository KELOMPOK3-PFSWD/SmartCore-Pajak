import api from "./index";

export type TaxSubmission = {
  id: number;
  tax_service_id: number;

  tax_service: {
    id: number;
    name: string;
  };

  taxpayer_name: string;
  npwp: string;
  fiscal_year: number;
  amount: number;
  notes: string;
  status: string;

  created_at: string;
  updated_at: string;

  // opsional (jika nanti membuat migration)
  approved_at?: string | null;
  rejected_at?: string | null;
};

export type TaxSubmissionPayload = {
  tax_service_id: number;
  taxpayer_name: string;
  npwp: string;
  fiscal_year: number;
  amount: number;
  notes: string;
  status: string;
};

const taxSubmissionEndpoints = {
  getTaxSubmissions: async (): Promise<TaxSubmission[]> => {
    return await api("tax_submissions");
  },

  getTaxSubmission: async (
    id: number
  ): Promise<TaxSubmission> => {
    return await api(`tax_submissions/${id}`);
  },

  addTaxSubmission: async (
    submission: TaxSubmissionPayload
  ) => {
    return await api("tax_submissions", {
      method: "POST",
      data: {
        tax_submission: submission,
      },
    });
  },

  updateTaxSubmission: async (
    id: number,
    submission: TaxSubmissionPayload
  ) => {
    return await api(`tax_submissions/${id}`, {
      method: "PATCH",
      data: {
        tax_submission: submission,
      },
    });
  },

  deleteTaxSubmission: async (id: number) => {
    return await api(`tax_submissions/${id}`, {
      method: "DELETE",
    });
  },
};

export default taxSubmissionEndpoints;