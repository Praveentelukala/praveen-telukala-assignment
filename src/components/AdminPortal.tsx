import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Eye, Calendar, User, IndianRupee } from 'lucide-react';
import { applicationService } from '../services/applicationService';
import { Application } from '../types';
import StatusBadge from './StatusBadge';

const AdminPortal: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = () => {
    const apps = applicationService.getAllApplications();
    setApplications(apps);
  };

  const handleApprove = (applicationId: string) => {
    const result = applicationService.approveApplication(applicationId);
    setMessage(result.message);
    loadApplications();
    setSelectedApplication(null);
  };

  const handleReject = (applicationId: string) => {
    if (!rejectionReason.trim()) {
      setMessage('Please provide a rejection reason.');
      return;
    }

    const result = applicationService.rejectApplication(applicationId, rejectionReason);
    setMessage(result.message);
    setRejectionReason('');
    loadApplications();
    setSelectedApplication(null);
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

  const getStatsData = () => {
    const total = applications.length;
    const pending = applications.filter(app => app.status === 'pending').length;
    const approved = applications.filter(app => app.status === 'approved').length;
    const rejected = applications.filter(app => app.status === 'rejected').length;

    return { total, pending, approved, rejected };
  };

  const stats = getStatsData();

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Government Admin Portal</h2>
        <p className="text-gray-600">
          Manage and review PMUY applications for LPG connections.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Applications</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <Calendar className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending Review</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Approved</p>
              <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Rejected</p>
              <p className="text-2xl font-bold text-gray-900">{stats.rejected}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.includes('successfully') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          {message}
        </div>
      )}

      {/* Applications Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Applications List</h3>
        </div>

        {applications.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No applications found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aadhar Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Income
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.map((application) => (
                  <tr key={application.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {application.applicantName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {application.phoneNumber}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatAadhar(application.aadharNumber)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{application.income.toLocaleString('en-IN')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(application.appliedDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={application.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setSelectedApplication(application)}
                        className="text-indigo-600 hover:text-indigo-900 flex items-center space-x-1"
                      >
                        <Eye className="h-4 w-4" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Application Detail Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Application Details</h3>
              <button
                onClick={() => setSelectedApplication(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <StatusBadge status={selectedApplication.status} />
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Applicant Name</p>
                    <p className="font-medium">{selectedApplication.applicantName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Aadhar Number</p>
                    <p className="font-medium">{formatAadhar(selectedApplication.aadharNumber)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="font-medium">{selectedApplication.phoneNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Annual Income</p>
                    <p className="font-medium">₹{selectedApplication.income.toLocaleString('en-IN')}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">{selectedApplication.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Applied Date</p>
                    <p className="font-medium">{formatDate(selectedApplication.appliedDate)}</p>
                  </div>
                  {selectedApplication.reviewedDate && (
                    <div>
                      <p className="text-sm text-gray-500">Reviewed Date</p>
                      <p className="font-medium">{formatDate(selectedApplication.reviewedDate)}</p>
                    </div>
                  )}
                </div>
              </div>

              {selectedApplication.status === 'pending' && (
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Review Application</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rejection Reason (if rejecting)
                      </label>
                      <textarea
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Enter reason for rejection..."
                      />
                    </div>

                    <div className="flex space-x-4">
                      <button
                        onClick={() => handleApprove(selectedApplication.id)}
                        className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                      >
                        <CheckCircle className="h-5 w-5" />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => handleReject(selectedApplication.id)}
                        className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                      >
                        <XCircle className="h-5 w-5" />
                        <span>Reject</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {selectedApplication.status === 'approved' && (
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Approval Details</h4>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedApplication.expectedConnectionDate && (
                      <div>
                        <p className="text-sm text-gray-500">Expected Connection Date</p>
                        <p className="font-medium text-green-600">
                          {formatDate(selectedApplication.expectedConnectionDate)}
                        </p>
                      </div>
                    )}
                    
                    {selectedApplication.subsidyAmount && (
                      <div>
                        <p className="text-sm text-gray-500">Subsidy Amount</p>
                        <p className="font-medium text-green-600">
                          ₹{selectedApplication.subsidyAmount} ({selectedApplication.subsidyPercentage}% off)
                        </p>
                      </div>
                    )}
                  </div>

                  {selectedApplication.concernedOfficer && (
                    <div className="mt-4 p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-500 mb-2">Concerned Officer</p>
                      <p className="font-medium text-green-900">{selectedApplication.concernedOfficer.name}</p>
                      <p className="text-green-700">{selectedApplication.concernedOfficer.designation}</p>
                      <p className="text-green-600">Contact: {selectedApplication.concernedOfficer.contactNumber}</p>
                    </div>
                  )}
                </div>
              )}

              {selectedApplication.status === 'rejected' && selectedApplication.rejectionReason && (
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Rejection Details</h4>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-red-800">{selectedApplication.rejectionReason}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPortal;