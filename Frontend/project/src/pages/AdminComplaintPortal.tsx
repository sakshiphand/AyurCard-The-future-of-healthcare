import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle, Send, CheckCircle } from 'lucide-react';

type ComplaintType = 'service' | 'staff' | 'facility' | 'billing' | 'other';
type Priority = 'low' | 'medium' | 'high' | 'urgent';

interface ComplaintFormData {
  complaint_type: ComplaintType;
  patient_name: string;
  patient_id: string;
  department: string;
  subject: string;
  description: string;
  priority: Priority;
  contact_email: string;
  contact_phone: string;
}

export default function AdminComplaintPortal() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ComplaintFormData>({
    complaint_type: 'service',
    patient_name: '',
    patient_id: '',
    department: '',
    subject: '',
    description: '',
    priority: 'medium',
    contact_email: '',
    contact_phone: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setSubmitSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setSubmitSuccess(false);
    setFormData({
      complaint_type: 'service',
      patient_name: '',
      patient_id: '',
      department: '',
      subject: '',
      description: '',
      priority: 'medium',
      contact_email: '',
      contact_phone: '',
    });
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-xl text-center">
          <CheckCircle className="text-green-600 mx-auto mb-4" size={40} />

          <h2 className="text-xl font-bold">Complaint Submitted</h2>

          <button
            onClick={handleReset}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded"
          >
            Submit Another
          </button>

          <button
            onClick={() => navigate('/')}
            className="mt-2 block text-gray-500"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 mb-6"
      >
        <ArrowLeft /> Back
      </button>

      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">

        <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <AlertCircle /> Admin Complaint Portal
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Complaint Type */}
          <select
            name="complaint_type"
            value={formData.complaint_type}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          >
            <option value="service">Service</option>
            <option value="staff">Staff</option>
            <option value="facility">Facility</option>
            <option value="billing">Billing</option>
            <option value="other">Other</option>
          </select>

          <input
            name="patient_name"
            placeholder="Patient Name"
            value={formData.patient_name}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />

          <input
            name="patient_id"
            placeholder="Patient ID"
            value={formData.patient_id}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />

          <input
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />

          <input
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />

          <input
            name="contact_email"
            placeholder="Email"
            value={formData.contact_email}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />

          <input
            name="contact_phone"
            placeholder="Phone"
            value={formData.contact_phone}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white p-3 rounded flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              'Submitting...'
            ) : (
              <>
                <Send size={18} /> Submit Complaint
              </>
            )}
          </button>

        </form>
      </div>
    </div>
  );
}