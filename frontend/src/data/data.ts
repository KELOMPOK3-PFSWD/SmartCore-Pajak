export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Officer {
  id: string;
  name: string;
  specialty: string;
}

export interface Report {
  id: string;
  taxpayer: string;
  npwp: string;
  taxType: string;
  status: "Verified" | "Pending" | "Approved" | "Review";
}

export const services: Service[] = [
  {
    id: "tax-monitoring",
    title: "Tax Monitoring",
    description: "Pantau seluruh aktivitas dan transaksi pajak perusahaan secara realtime.",
    icon: "📊",
  },
  {
    id: "npwp-validation",
    title: "NPWP Validation",
    description: "Validasi data wajib pajak dan identitas perusahaan secara digital.",
    icon: "🪪",
  },
  {
    id: "digital-reporting",
    title: "Digital Reporting",
    description: "Pembuatan laporan pajak otomatis dengan sistem terintegrasi.",
    icon: "📑",
  },
  {
    id: "secure-database",
    title: "Secure Database",
    description: "Keamanan data perpajakan dengan sistem cloud modern.",
    icon: "🔒",
  },
];

export const officers: Officer[] = [
  {
    id: "bobianus-zebua",
    name: "Bobianus Zebua",
    specialty: "Tax Consultant",
  },
  {
    id: "cedric-kosasih",
    name: "Cedric Kosasih",
    specialty: "Tax Analyst",
  },
  {
    id: "kennedy-victorio",
    name: "Kennedy Victorio Dinata",
    specialty: "Corporate Tax Auditor",
  },
  {
    id: "flora-sarumaha",
    name: "Flora Fentris Sarumaha",
    specialty: "Tax Compliance Officer",
  },
  {
    id: "alya-khansa",
    name: "Alya Khansa",
    specialty: "Finance Tax Specialist",
  },
];

export const reports: Report[] = [
  {
    id: "pt-digital-nusantara",
    taxpayer: "PT Digital Nusantara",
    npwp: "12.345.678.9",
    taxType: "PPh Badan",
    status: "Verified",
  },
  {
    id: "cv-nusantara-jaya",
    taxpayer: "CV Nusantara Jaya",
    npwp: "98.765.432.1",
    taxType: "PPN",
    status: "Pending",
  },
  {
    id: "pt-teknologi-indonesia",
    taxpayer: "PT Teknologi Indonesia",
    npwp: "76.111.222.3",
    taxType: "e-Faktur",
    status: "Approved",
  },
  {
    id: "pt-pajak-makmur",
    taxpayer: "PT Pajak Makmur",
    npwp: "55.888.999.0",
    taxType: "Validasi NPWP",
    status: "Review",
  },
];