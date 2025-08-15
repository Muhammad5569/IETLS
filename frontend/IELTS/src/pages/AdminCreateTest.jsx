import { useState } from "react";

// Mock API for demonstration
const API = {
  post: async (url, data) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("API call:", url, data);
    return { success: true };
  }
};

export default function AdminCreateTest() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [version, setVersion] = useState("");
  const [duration, setDuration] = useState(60);
  const [selectedSections, setSelectedSections] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sectionOptions = ['Listening', 'Reading', 'Writing', 'Speaking'];

  const handleSectionToggle = (section) => {
    setSelectedSections(prev => 
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handleSubmit = async () => {
    if (!title || !version) {
      alert("Please fill in all required fields");
      return;
    }

    if (selectedSections.length === 0) {
      alert("Please select at least one section");
      return;
    }

    setIsSubmitting(true);
    
    try {
      await API.post("/tests", { 
        title, 
        description, 
        version, 
        duration,
        sections: selectedSections // This would be handled differently in real implementation with ObjectIds
      });
      alert("Test created successfully!");
      setTitle(""); 
      setDescription(""); 
      setVersion("");
      setDuration(60);
      setSelectedSections([]);
    } catch (err) {
      alert("Error creating test");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Create New Test</h1>
          <p className="text-gray-600">Fill in the details to create a new test</p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          
          {/* Title Field */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Title *
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
              placeholder="Enter test title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Description
            </label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 resize-none"
              placeholder="Enter test description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Version and Duration Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Version *
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                placeholder="e.g., 1.0"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Duration (minutes)
              </label>
              <input
                type="number"
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value) || 60)}
              />
            </div>
          </div>

          {/* Sections */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Sections *
            </label>
            <p className="text-sm text-gray-600 mb-3">Select the sections to include in this test</p>
            <div className="grid grid-cols-2 gap-3">
              {sectionOptions.map((section) => (
                <div key={section} className="flex items-center">
                  <input
                    type="checkbox"
                    id={section}
                    className="w-4 h-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
                    checked={selectedSections.includes(section)}
                    onChange={() => handleSectionToggle(section)}
                  />
                  <label htmlFor={section} className="ml-2 text-sm text-gray-900">
                    {section}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                isSubmitting 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-gray-900 text-white hover:bg-gray-800 active:bg-gray-700'
              }`}
            >
              {isSubmitting ? 'Creating...' : 'Create Test'}
            </button>
          </div>

          {/* Footer Note */}
          <div className="text-center pt-2">
            <p className="text-xs text-gray-500">
              * Required fields
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}