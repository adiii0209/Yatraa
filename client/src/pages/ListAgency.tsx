import { motion } from "framer-motion";
import { Building2, Upload, AlertCircle } from "lucide-react";
import { useState } from "react";

interface FormData {
  agencyName: string;
  ownerName: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  city: string;
  description: string;
  specialties: string[];
  license: File | null;
}

export default function ListAgency() {
  const [formData, setFormData] = useState<FormData>({
    agencyName: "",
    ownerName: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    city: "",
    description: "",
    specialties: [],
    license: null
  });

  const [specialtyInput, setSpecialtyInput] = useState("");

  const handleSpecialtyAdd = () => {
    if (specialtyInput.trim() && !formData.specialties.includes(specialtyInput.trim())) {
      setFormData(prev => ({
        ...prev,
        specialties: [...prev.specialties, specialtyInput.trim()]
      }));
      setSpecialtyInput("");
    }
  };

  const handleSpecialtyRemove = (specialty: string) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.filter(s => s !== specialty)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <div className="min-h-screen pt-4 pb-8 px-2 max-w-md mx-auto space-y-6 bg-gradient-to-b from-white to-blue-50/30">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2 py-4"
      >
        <div className="relative inline-block">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full blur"
          />
          <div className="p-2 bg-gradient-to-br from-primary/10 to-purple-500/10 backdrop-blur-sm rounded-full relative">
            <Building2 className="w-8 h-8 text-primary" />
          </div>
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          List Your Agency
        </h1>
        <p className="text-gray-600 text-base">Join our network of trusted travel partners</p>
      </motion.div>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
        onSubmit={handleSubmit}
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Agency Information</h2>
          <div className="grid grid-cols-1 gap-4">
            {/* All fields are now single column for mobile */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-700">Agency Name</label>
              <input
                type="text"
                required
                value={formData.agencyName}
                onChange={e => setFormData(prev => ({ ...prev, agencyName: e.target.value }))}
                className="w-full px-3 py-2 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-700">Owner Name</label>
              <input
                type="text"
                required
                value={formData.ownerName}
                onChange={e => setFormData(prev => ({ ...prev, ownerName: e.target.value }))}
                className="w-full px-3 py-2 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-700">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-3 py-2 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-700">Website (optional)</label>
              <input
                type="url"
                value={formData.website}
                onChange={e => setFormData(prev => ({ ...prev, website: e.target.value }))}
                className="w-full px-3 py-2 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-700">City</label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={e => setFormData(prev => ({ ...prev, city: e.target.value }))}
                className="w-full px-3 py-2 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-700">Address</label>
            <textarea
              required
              value={formData.address}
              onChange={e => setFormData(prev => ({ ...prev, address: e.target.value }))}
              className="w-full px-3 py-2 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm h-20 resize-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-700">Description</label>
            <textarea
              required
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm h-24 resize-none"
              placeholder="Tell us about your agency, services, and experience..."
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-700">Specialties</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={specialtyInput}
                onChange={e => setSpecialtyInput(e.target.value)}
                className="flex-1 px-3 py-2 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                placeholder="e.g., Heritage Tours"
              />
              <button
                type="button"
                onClick={handleSpecialtyAdd}
                className="px-3 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors text-sm"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {formData.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-primary/10 text-primary rounded-full flex items-center gap-1 text-xs"
                >
                  {specialty}
                  <button
                    type="button"
                    onClick={() => handleSpecialtyRemove(specialty)}
                    className="hover:text-primary/80"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-700">License Document</label>
            <div className="relative">
              <input
                type="file"
                required
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={e => setFormData(prev => ({ ...prev, license: e.target.files?.[0] || null }))}
                className="hidden"
                id="license-upload"
              />
              <label
                htmlFor="license-upload"
                className="flex items-center justify-center gap-2 px-3 py-6 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-primary/50 transition-colors text-sm"
              >
                <Upload className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600">
                  {formData.license ? formData.license.name : "Upload your business license"}
                </span>
              </label>
            </div>
            <p className="flex items-center gap-1 text-xs text-gray-500">
              <AlertCircle className="w-4 h-4" />
              Accepted formats: PDF, JPG, JPEG, PNG (max 5MB)
            </p>
          </div>
        </div>
        <motion.button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-primary to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl hover:opacity-90 transition-all duration-300 text-base"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Submit Application
        </motion.button>
      </motion.form>
    </div>
  );
}