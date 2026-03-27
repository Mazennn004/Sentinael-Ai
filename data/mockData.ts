// Mock data for Sentinel AI UI
export interface Incident {
  id: string;
  date: string;
  time: string;
  location: string;
  latitude: number;
  longitude: number;
  severity: "critical" | "high" | "medium" | "low";
  status: "reported" | "processing" | "completed" | "dismissed";
  speed: number;
  gForce: number;
  vehiclesDetected: string[];
  damageAssessment: string;
  reportUrl?: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
  avatar?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  vehicleInfo: string;
  avatar?: string;
}

export const mockUser: UserProfile = {
  name: "Mazen Mohammed Hammad",
  email: "[EMAIL_ADDRESS]",
  phone: "+20 100 123 4567",
  vehicleInfo: "Toyota Corolla 2022 — White",
};

export const mockContacts: EmergencyContact[] = [
  {
    id: "1",
    name: "Ahmed Hassan",
    phone: "+20 100 987 6543",
    relationship: "Father",
  },
  {
    id: "2",
    name: "Sara Mohamed",
    phone: "+20 101 234 5678",
    relationship: "Sister",
  },
  {
    id: "3",
    name: "Dr. Khaled Youssef",
    phone: "+20 102 345 6789",
    relationship: "Doctor",
  },
];

export const mockIncidents: Incident[] = [
  {
    id: "inc-001",
    date: "2026-03-08",
    time: "14:32",
    location: "6th October Bridge, Cairo",
    latitude: 30.0444,
    longitude: 31.2357,
    severity: "high",
    status: "completed",
    speed: 85,
    gForce: 6.2,
    vehiclesDetected: ["Sedan (Silver)", "SUV (Black)"],
    damageAssessment:
      "Front-end collision detected. Significant damage to front bumper and hood. Airbag deployment confirmed.",
    reportUrl: "report-001.pdf",
  },
  {
    id: "inc-002",
    date: "2026-02-21",
    time: "09:15",
    location: "Ring Road, Giza",
    latitude: 30.013,
    longitude: 31.2089,
    severity: "medium",
    status: "completed",
    speed: 42,
    gForce: 3.8,
    vehiclesDetected: ["Pickup Truck (Red)"],
    damageAssessment:
      "Side impact detected. Minor damage to left rear panel. No airbag deployment.",
    reportUrl: "report-002.pdf",
  },
  {
    id: "inc-003",
    date: "2026-01-15",
    time: "22:48",
    location: "Autostrad Road, Nasr City",
    latitude: 30.0511,
    longitude: 31.3656,
    severity: "critical",
    status: "reported",
    speed: 110,
    gForce: 9.1,
    vehiclesDetected: ["Bus (White)", "Sedan (Blue)", "Motorcycle"],
    damageAssessment:
      "High-speed rear collision. Severe structural damage. Multiple vehicles involved. Emergency services dispatched.",
  },
];

export const processingSteps = [
  {
    id: 1,
    label: "Stitching video footage",
    description: "Combining 15s pre-impact + 15s post-impact",
    icon: "videocam" as const,
  },
  {
    id: 2,
    label: "Uploading telemetry data",
    description: "Video + GPS + sensor readings",
    icon: "cloud-upload" as const,
  },
  {
    id: 3,
    label: "AI vision analysis",
    description: "YOLOv11 detecting vehicles & damage",
    icon: "eye" as const,
  },
  {
    id: 4,
    label: "Generating incident report",
    description: "LLM writing structured assessment",
    icon: "document-text" as const,
  },
];

// Documents & License data
export interface DriverLicense {
  name: string;
  nameAr: string;
  nationalId: string;
  licenseNumber: string;
  licenseClass: string;
  issueDate: string;
  expiryDate: string;
  bloodType: string;
  governorate: string;
}

export interface CarRegistration {
  ownerName: string;
  ownerNameAr: string;
  make: string;
  model: string;
  year: number;
  color: string;
  engineNumber: string;
  chassisNumber: string;
  registrationNumber: string;
  issueDate: string;
  expiryDate: string;
}

export interface CarPlate {
  lettersAr: string;
  lettersEn: string;
  numbers: string;
  governorate: string;
}

export interface TrafficFine {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: "paid" | "unpaid" | "appealed";
  linkedIncidentId?: string;
  location: string;
}

export const mockDriverLicense: DriverLicense = {
  name: "Mazen Mohammed Hammad",
  nameAr: "مازن محمد حماد",
  nationalId: "30001150100532",
  licenseNumber: "12345678",
  licenseClass: "Private (خاص)",
  issueDate: "2024-01-15",
  expiryDate: "2027-01-15",
  bloodType: "O+",
  governorate: "Cairo",
};

export const mockCarRegistration: CarRegistration = {
  ownerName: "Mazen Mohammed Hammad",
  ownerNameAr: "مازن محمد حماد",
  make: "Cupra",
  model: "Formentor",
  year: 2024,
  color: "Grey",
  engineNumber: "2ZR-5847291",
  chassisNumber: "JTDBR42E-X-0123456",
  registrationNumber: "742819",
  issueDate: "2023-06-20",
  expiryDate: "2026-06-20",
};

export const mockCarPlate: CarPlate = {
  lettersAr: "ن ه ر",
  lettersEn: "N H R",
  numbers: "3 5 7 ",
  governorate: "CAIRO",
};

export const mockFines: TrafficFine[] = [
  {
    id: "fine-001",
    date: "2026-03-09",
    description: "Reckless driving — causing rear-end collision",
    amount: 1500,
    status: "unpaid",
    linkedIncidentId: "inc-001",
    location: "6th October Bridge, Cairo",
  },
  {
    id: "fine-002",
    date: "2026-01-16",
    description: "Excessive speed in residential zone",
    amount: 500,
    status: "paid",
    linkedIncidentId: "inc-003",
    location: "Autostrad Road, Nasr City",
  },
  {
    id: "fine-003",
    date: "2025-11-03",
    description: "Failure to maintain safe distance",
    amount: 750,
    status: "unpaid",
    location: "Ring Road, Giza",
  },
];
