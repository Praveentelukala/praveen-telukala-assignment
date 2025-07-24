import React, { useState } from 'react';
import { Search, FileText, Calendar, User, Phone, MapPin, IndianRupee } from 'lucide-react';
import { applicationService } from '../services/applicationService';
import { Application } from '../types';
import StatusBadge from './StatusBadge';

const CitizenPortal: React.FC = () => {
  const [aadharNumber, setAadharNumber] = useState('');
  const [application, setApplication] = useState<Application | null>(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'apply' | 'status'>('apply');

  const handleSubmitApplication = async () => {
    if (!aadharNumber.trim()) {
      setMessage('Please enter your Aadhar number.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const result = applicationService.submitApplication(aadharNumber);
      setMessage(result.message);
      
      if (result.success) {
        setAadharNumber('');
        setActiveTab('status');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckStatus = () => {
    if (!aadharNumber.trim()) {
      setMessage('Please enter your Aadhar number.');
      return;
    }

    const app = applicationService.getApplicationByAadhar(aadharNumber);
    if (app) {
      setApplication(app);
      setMessage('');
    } else {
      setApplication(null);
      setMessage('No application found for this Aadhar number.');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatAadhar = (aadhar: string) => {
    return aadhar.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8">
        <button
          onClick={() => setActiveTab('apply')}
          className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors ${
            activeTab === 'apply'
              ? 'bg-white text-orange-600 shadow-sm'
              : 'text-gray-600 hover:text-orange-600'
          }`}
        >
          Apply for Connection
        </button>
        <button
          onClick={() => setActiveTab('status')}
          className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors ${
            activeTab === 'status'
              ? 'bg-white text-orange-600 shadow-sm'
              : 'text-gray-600 hover:text-orange-600'
          }`}
        >
          Check Status
        </button>
      </div>

      {activeTab === 'apply' && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Apply for LPG Connection</h2>
            <p className="text-gray-600">
              Enter your Aadhar number to apply for the Pradhan Mantri Ujjwala Yojana scheme.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="aadhar" className="block text-sm font-medium text-gray-700 mb-2">
                Aadhar Number
              </label>
              <input
                type="text"
                id="aadhar"
                value={aadharNumber}
                onChange={(e) => setAadharNumber(e.target.value)}
                placeholder="1234-5678-9012"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <button
              onClick={handleSubmitApplication}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Submitting...' : 'Submit Application'}
            </button>

            {message && (
              <div className={`p-4 rounded-lg ${
                message.includes('successfully') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
              }`}>
                {message}
              </div>
            )}
          </div>

          {/* Eligibility Information */}
          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Eligibility Criteria</h3>
            <ul className="space-y-2 text-blue-800">
              <li>• Annual income should be below ₹1,00,000</li>
              <li>• Valid Aadhar card is required</li>
              <li>• Subsidy percentage varies based on income level</li>
            </ul>
          </div>
        </div>
      )}

      {activeTab === 'status' && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Application Status</h2>
            <p className="text-gray-600">
              Enter your Aadhar number to check the status of your application.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="status-aadhar" className="block text-sm font-medium text-gray-700 mb-2">
                Aadhar Number
              </label>
              <div className="flex space-x-4">
                <input
                  type="text"
                  id="status-aadhar"
                  value={aadharNumber}
                  onChange={(e) => setAadharNumber(e.target.value)}
                  placeholder="1234-5678-9012"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <button
                  onClick={handleCheckStatus}
                  className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2"
                >
                  <Search className="h-5 w-5" />
                  <span>Check</span>
                </button>
              </div>
            </div>

            {message && !application && (
              <div className="p-4 rounded-lg bg-red-50 text-red-800">
                {message}
              </div>
            )}

            {application && (
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Application Details</h3>
                  <StatusBadge status={application.status} />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Applicant Name</p>
                        <p className="font-medium">{application.applicantName}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Aadhar Number</p>
                        <p className="font-medium">{formatAadhar(application.aadharNumber)}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Phone Number</p>
                        <p className="font-medium">{application.phoneNumber}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="font-medium">{application.address}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Applied Date</p>
                        <p className="font-medium">{formatDate(application.appliedDate)}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <IndianRupee className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Annual Income</p>
                        <p className="font-medium">₹{application.income.toLocaleString('en-IN')}</p>
                      </div>
                    </div>

                    {application.status === 'approved' && (
                      <>
                        {application.expectedConnectionDate && (
                          <div className="flex items-center space-x-3">
                            <Calendar className="h-5 w-5 text-green-500" />
                            <div>
                              <p className="text-sm text-gray-500">Expected Connection Date</p>
                              <p className="font-medium text-green-600">
                                {formatDate(application.expectedConnectionDate)}
                              </p>
                            </div>
                          </div>
                        )}

                        {application.subsidyAmount && (
                          <div className="flex items-center space-x-3">
                            <IndianRupee className="h-5 w-5 text-green-500" />
                            <div>
                              <p className="text-sm text-gray-500">Subsidy Amount</p>
                              <p className="font-medium text-green-600">
                                ₹{application.subsidyAmount} ({application.subsidyPercentage}% off)
                              </p>
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {application.status === 'rejected' && application.rejectionReason && (
                      <div className="bg-red-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1">Rejection Reason</p>
                        <p className="font-medium text-red-800">{application.rejectionReason}</p>
                      </div>
                    )}
                  </div>
                </div>

                {application.status === 'approved' && application.concernedOfficer && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Concerned Officer Details</h4>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="font-medium text-green-900">{application.concernedOfficer.name}</p>
                      <p className="text-green-700">{application.concernedOfficer.designation}</p>
                      <p className="text-green-600">Contact: {application.concernedOfficer.contactNumber}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CitizenPortal;