import { v4 as uuidv4 } from 'uuid';
import { Application, AadharRecord } from '../types';
import { mockAadharDatabase, concernedOfficers } from '../data/mockData';
import { calculateSubsidy, isEligible } from '../utils/subsidyCalculator';

class ApplicationService {
  private applications: Application[] = [];

  findAadharRecord(aadharNumber: string): AadharRecord | null {
    return mockAadharDatabase.find(record => record.aadharNumber === aadharNumber) || null;
  }

  submitApplication(aadharNumber: string): { success: boolean; message: string; applicationId?: string } {
    // Check if Aadhar exists
    const aadharRecord = this.findAadharRecord(aadharNumber);
    if (!aadharRecord) {
      return { success: false, message: 'Invalid Aadhar number. Please check and try again.' };
    }

    // Check if already applied
    const existingApplication = this.applications.find(app => app.aadharNumber === aadharNumber);
    if (existingApplication) {
      return { success: false, message: 'Application already exists for this Aadhar number.' };
    }

    // Create new application
    const applicationId = uuidv4();
    const newApplication: Application = {
      id: applicationId,
      aadharNumber,
      applicantName: aadharRecord.name,
      income: aadharRecord.income,
      address: aadharRecord.address,
      phoneNumber: aadharRecord.phoneNumber,
      status: 'pending',
      appliedDate: new Date().toISOString(),
    };

    this.applications.push(newApplication);
    return { success: true, message: 'Application submitted successfully!', applicationId };
  }

  getApplicationByAadhar(aadharNumber: string): Application | null {
    return this.applications.find(app => app.aadharNumber === aadharNumber) || null;
  }

  getAllApplications(): Application[] {
    return this.applications;
  }

  approveApplication(applicationId: string): { success: boolean; message: string } {
    const application = this.applications.find(app => app.id === applicationId);
    if (!application) {
      return { success: false, message: 'Application not found.' };
    }

    if (!isEligible(application.income)) {
      return { success: false, message: 'Applicant is not eligible due to income criteria.' };
    }

    const subsidy = calculateSubsidy(application.income);
    const connectionDate = new Date();
    connectionDate.setDate(connectionDate.getDate() + 15); // 15 days from now

    application.status = 'approved';
    application.reviewedDate = new Date().toISOString();
    application.expectedConnectionDate = connectionDate.toISOString();
    application.concernedOfficer = concernedOfficers[Math.floor(Math.random() * concernedOfficers.length)];
    application.subsidyAmount = subsidy.amount;
    application.subsidyPercentage = subsidy.percentage;

    return { success: true, message: 'Application approved successfully!' };
  }

  rejectApplication(applicationId: string, reason: string): { success: boolean; message: string } {
    const application = this.applications.find(app => app.id === applicationId);
    if (!application) {
      return { success: false, message: 'Application not found.' };
    }

    application.status = 'rejected';
    application.reviewedDate = new Date().toISOString();
    application.rejectionReason = reason;

    return { success: true, message: 'Application rejected successfully!' };
  }
}

export const applicationService = new ApplicationService();