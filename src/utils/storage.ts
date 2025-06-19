
// Storage utility for persisting data in localStorage

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  username: string;
  password: string;
  assignedDevices: number;
  completedAssessments: number;
  joinDate: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  totalPurchases: number;
  totalSales: number;
  joinDate: string;
  lastActivity: string;
}

export interface Device {
  id: string;
  name: string;
  brand: string;
  type: string;
  model: string;
  condition: string;
  storage: string;
  price: number;
  originalPrice: number;
  inStock: boolean;
  addedDate: string;
  images: string[];
}

export interface Transaction {
  id: string;
  transactionNumber: string;
  customerName: string;
  customerEmail: string;
  deviceInfo: string;
  status: string;
  amount: number;
  offeredAmount: number | null;
  submittedDate: string;
  agentId?: string;
  agentName?: string;
}

// Storage keys
const STORAGE_KEYS = {
  AGENTS: 'quickbuy_agents',
  CUSTOMERS: 'quickbuy_customers',
  DEVICES: 'quickbuy_devices',
  TRANSACTIONS: 'quickbuy_transactions'
};

// Generic storage functions
export const saveToStorage = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const loadFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
};

// Agent storage functions
export const saveAgents = (agents: Agent[]): void => {
  saveToStorage(STORAGE_KEYS.AGENTS, agents);
};

export const loadAgents = (): Agent[] => {
  return loadFromStorage(STORAGE_KEYS.AGENTS, [
    {
      id: "AGT001",
      name: "Sarah Mitchell",
      email: "sarah.m@quickbuy.co.za",
      phone: "+27 82 123 4567",
      role: "Senior Agent",
      status: "Active",
      username: "sarah.mitchell",
      password: "password123",
      assignedDevices: 12,
      completedAssessments: 45,
      joinDate: "2023-06-15"
    },
    {
      id: "AGT002",
      name: "Michael Johnson",
      email: "michael.j@quickbuy.co.za",
      phone: "+27 83 987 6543",
      role: "Agent",
      status: "Active",
      username: "michael.johnson",
      password: "password123",
      assignedDevices: 8,
      completedAssessments: 32,
      joinDate: "2023-08-22"
    }
  ]);
};

// Customer storage functions
export const saveCustomers = (customers: Customer[]): void => {
  saveToStorage(STORAGE_KEYS.CUSTOMERS, customers);
};

export const loadCustomers = (): Customer[] => {
  return loadFromStorage(STORAGE_KEYS.CUSTOMERS, [
    {
      id: "CUST001",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+27 82 111 2222",
      status: "Active",
      totalPurchases: 2,
      totalSales: 1,
      joinDate: "2023-12-01",
      lastActivity: "2024-01-15"
    }
  ]);
};

// Device storage functions
export const saveDevices = (devices: Device[]): void => {
  saveToStorage(STORAGE_KEYS.DEVICES, devices);
};

export const loadDevices = (): Device[] => {
  return loadFromStorage(STORAGE_KEYS.DEVICES, [
    {
      id: "DEV001",
      name: "iPhone 14 Pro",
      brand: "Apple",
      type: "phone",
      model: "iPhone 14 Pro",
      condition: "Excellent",
      storage: "256GB",
      price: 15999,
      originalPrice: 18999,
      inStock: true,
      addedDate: "2024-01-15",
      images: [
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1567784177951-6fa58317e16b?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&h=300&fit=crop"
      ]
    }
  ]);
};

// Transaction storage functions
export const saveTransactions = (transactions: Transaction[]): void => {
  saveToStorage(STORAGE_KEYS.TRANSACTIONS, transactions);
};

export const loadTransactions = (): Transaction[] => {
  return loadFromStorage(STORAGE_KEYS.TRANSACTIONS, [
    {
      id: "TXN001",
      transactionNumber: "TXN1705123456789",
      customerName: "John Doe",
      customerEmail: "john.doe@example.com",
      deviceInfo: "iPhone 13 Pro - 256GB",
      status: "Awaiting Offer",
      amount: 12500,
      offeredAmount: null,
      submittedDate: "2024-01-12",
      agentId: "AGT001",
      agentName: "Sarah Mitchell"
    },
    {
      id: "TXN002", 
      transactionNumber: "TXN1704987654321",
      customerName: "Jane Smith",
      customerEmail: "jane.smith@example.com",
      deviceInfo: "MacBook Pro 13\" - 512GB",
      status: "Device Assessed",
      amount: 18500,
      offeredAmount: null,
      submittedDate: "2024-01-10",
      agentId: "AGT002",
      agentName: "Michael Johnson"
    }
  ]);
};

// Authentication functions
export const authenticateAgent = (username: string, password: string): Agent | null => {
  const agents = loadAgents();
  return agents.find(agent => 
    agent.username === username && agent.password === password
  ) || null;
};

export const authenticateAdmin = (email: string, password: string): boolean => {
  // Simple admin authentication - in real app this would be more secure
  return email === "admin@quickbuy.co.za" && password === "admin123";
};
