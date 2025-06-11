import React from 'react';
import { useSelector } from 'react-redux';
import PrescriptionUploadComponent from '../components/PrescriptionUploadComponent';
import { FilePlus } from 'lucide-react'; // Optional icon library like lucide-react

const UploadPrescriptionScreen = () => {
  const { userInfo } = useSelector((state) => state.auth); // get user info from redux store

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-10 px-4 flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-xl w-full space-y-6">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <FilePlus className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Upload Your Prescription</h2>
          <p className="text-gray-600 mt-2">Let us find the right medicines for you.</p>
        </div>

        {/* Upload Component */}
        <PrescriptionUploadComponent userId={userInfo?._id} />

        <div className="text-sm text-gray-500 text-center pt-4 border-t">
          Accepted formats: <strong>.jpg</strong>, <strong>.png</strong>, <strong>.jpeg</strong>
        </div>
      </div>
    </div>
  );
};

export default UploadPrescriptionScreen;
