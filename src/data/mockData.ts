import { AadharRecord } from '../types';

export const mockAadharDatabase: AadharRecord[] = [
  {
    aadharNumber: '1234-5678-9012',
    name: 'Rajesh Kumar',
    income: 45000,
    address: 'Village Rampur, District Meerut, UP',
    phoneNumber: '9876543210',
    isValid: true,
  },
  {
    aadharNumber: '2345-6789-0123',
    name: 'Priya Sharma',
    income: 25000,
    address: 'Village Ganeshpur, District Ghaziabad, UP',
    phoneNumber: '8765432109',
    isValid: true,
  },
  {
    aadharNumber: '3456-7890-1234',
    name: 'Amit Singh',
    income: 80000,
    address: 'Ward 5, Tehsil Noida, District Gautam Budh Nagar, UP',
    phoneNumber: '7654321098',
    isValid: true,
  },
  {
    aadharNumber: '4567-8901-2345',
    name: 'Sunita Devi',
    income: 0,
    address: 'Village Bhagwanpur, District Hapur, UP',
    phoneNumber: '6543210987',
    isValid: true,
  },
  {
    aadharNumber: '5678-9012-3456',
    name: 'Mohan Lal',
    income: 120000,
    address: 'Sector 15, Noida, UP',
    phoneNumber: '5432109876',
    isValid: false, // Income exceeds limit
  },
  {
    aadharNumber: '6789-0123-4567',
    name: 'Kavita Yadav',
    income: 35000,
    address: 'Village Khanpur, District Bulandshahr, UP',
    phoneNumber: '4321098765',
    isValid: true,
  },
  {
    aadharNumber: '7890-1234-5678',
    name: 'Ravi Gupta',
    income: 60000,
    address: 'Laxmi Nagar, District Ghaziabad, UP',
    phoneNumber: '3210987654',
    isValid: true,
  },
];

export const concernedOfficers = [
  {
    name: 'Dr. Ashok Kumar Mishra',
    designation: 'District Magistrate',
    contactNumber: '011-12345678',
  },
  {
    name: 'Mrs. Neha Agarwal',
    designation: 'Block Development Officer',
    contactNumber: '011-23456789',
  },
  {
    name: 'Mr. Suresh Chandra',
    designation: 'Tehsildar',
    contactNumber: '011-34567890',
  },
];