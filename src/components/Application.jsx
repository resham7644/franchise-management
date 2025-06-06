import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, User, MapPin, FileText, Phone, Mail, Building, Home } from 'lucide-react';

function Application() {
    const navigate = useNavigate();
    let [obj, setObj] = useState({
        name: "",
        email: "",
        cont: "",
        buisness: "",
        address: "",
        city: "",
        pincode: "",
        area: "",
        ownership: "",
        idProof: null,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    function doChange(event) {
        let { name, value } = event.target;
        setObj({ ...obj, [name]: value });
    }

    function updatePic(event) {
        setObj({ ...obj, ["idProof"]: event.target.files[0] });
    }

    async function doSaveApplication() {
        setIsSubmitting(true);
        console.log(obj);
        let url = "https://franchise-backend-jr02.onrender.com/form/saveapplication";
        let fd = new FormData();
        for (let prop in obj) {
            fd.append(prop, obj[prop]);
        }
        try {
            let resp = await fetch(url, {
                method: 'POST',
                body: fd
            });
            let data = await resp.json();
            console.log(data);
            if (data.status == true) {
                alert(data.msg);
            } else {
                alert(data.msg);
            }
        } catch (error) {
            alert("An error occurred while submitting the application.");
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleBack = () => {
         navigate("/");
    };

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50'>
            {/* Header with Back Button */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center py-4">
                        <button 
                            onClick={handleBack}
                            className="flex items-center text-gray-600 hover:text-blue-600 transition-colors mr-4"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            <span className="font-medium">Back</span>
                        </button>
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">FF</span>
                            </div>
                            <span className="text-2xl font-bold text-gray-900">Franchise Flow</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Franchise Application Form
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Take the first step towards joining our successful franchise network. 
                        Fill out the form below to get started.
                    </p>
                </div>

                {/* Application Form */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <form onSubmit={(e) => { e.preventDefault(); doSaveApplication(); }}>
                        
                        {/* Personal Information Section */}
                        <div className="p-8 sm:p-12">
                            <div className="flex items-center mb-8">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                                    <User className="w-6 h-6 text-blue-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                        First Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={obj.name}
                                        onChange={doChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="Enter your first name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="l-name" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="l-name"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="Enter your last name"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                        <Mail className="w-4 h-4 inline mr-1" />
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={obj.email}
                                        onChange={doChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="abc@example.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="cont" className="block text-sm font-semibold text-gray-700 mb-2">
                                        <Phone className="w-4 h-4 inline mr-1" />
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        id="cont"
                                        name="cont"
                                        value={obj.cont}
                                        onChange={doChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="+91 12345 67890"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label htmlFor="buisness" className="block text-sm font-semibold text-gray-700 mb-2">
                                    <Building className="w-4 h-4 inline mr-1" />
                                    Current Business (Optional)
                                </label>
                                <input
                                    type="text"
                                    id="buisness"
                                    name="buisness"
                                    value={obj.buisness}
                                    onChange={doChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Enter your current business (if any)"
                                />
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-200"></div>

                        {/* Site Information Section */}
                        <div className="p-8 sm:p-12">
                            <div className="flex items-center mb-8">
                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                                    <MapPin className="w-6 h-6 text-green-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Site Information</h2>
                            </div>

                            <div className="mb-6">
                                <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
                                    <Home className="w-4 h-4 inline mr-1" />
                                    Complete Address *
                                </label>
                                <textarea
                                    id="address"
                                    name="address"
                                    value={obj.address}
                                    onChange={doChange}
                                    rows="3"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                    placeholder="Enter complete site address"
                                    required
                                ></textarea>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
                                        City *
                                    </label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        value={obj.city}
                                        onChange={doChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="Enter city"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="pincode" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Pincode *
                                    </label>
                                    <input
                                        type="text"
                                        id="pincode"
                                        name="pincode"
                                        value={obj.pincode}
                                        onChange={doChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="Enter pincode"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label htmlFor="area" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Area (sq.ft.) *
                                    </label>
                                    <input
                                        type="number"
                                        id="area"
                                        name="area"
                                        value={obj.area}
                                        onChange={doChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="Enter area in sq.ft."
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Ownership Type *
                                    </label>
                                    <div className="flex space-x-6 mt-3">
                                        <label className="flex items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                name="ownership"
                                                value="owner"
                                                checked={obj.ownership === "owner"}
                                                onChange={doChange}
                                                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                            />
                                            <span className="ml-2 text-sm font-medium text-gray-700">Owner</span>
                                        </label>
                                        <label className="flex items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                name="ownership"
                                                value="rent"
                                                checked={obj.ownership === "rent"}
                                                onChange={doChange}
                                                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                            />
                                            <span className="ml-2 text-sm font-medium text-gray-700">On Rent</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-200"></div>

                        {/* ID Proof Section */}
                        <div className="p-8 sm:p-12">
                            <div className="flex items-center mb-8">
                                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                                    <FileText className="w-6 h-6 text-purple-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">ID Proof</h2>
                            </div>

                            <div className="mb-8">
                                <label htmlFor="idProof" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Upload ID Proof *
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <input
                                        type="file"
                                        name="idProof"
                                        id="idProof"
                                        onChange={updatePic}
                                        accept=".jpg,.jpeg,.png,.pdf"
                                        className="hidden"
                                        required
                                    />
                                    <label htmlFor="idProof" className="cursor-pointer">
                                        <span className="text-blue-600 font-semibold hover:text-blue-700">
                                            Click to upload
                                        </span>
                                        <span className="text-gray-500"> or drag and drop</span>
                                    </label>
                                    <p className="text-sm text-gray-500 mt-2">
                                        Supported formats: JPG, PNG, PDF (Max 5MB)
                                    </p>
                                    {obj.idProof && (
                                        <p className="text-sm text-green-600 mt-2 font-medium">
                                            Selected: {obj.idProof.name}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="button"
                                onClick={doSaveApplication}
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                                        Submitting Application...
                                    </div>
                                ) : (
                                    'Submit Application'
                                )}
                            </button>

                            <p className="text-center text-sm text-gray-500 mt-4">
                                By submitting this form, you agree to our terms and conditions and privacy policy.
                            </p>
                        </div>
                    </form>
                </div>

                {/* Additional Info */}
                <div className="mt-12 text-center">
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">What happens next?</h3>
                        <p className="text-gray-600">
                            Our team will review your application within 2-3 business days. 
                            You'll receive an email confirmation with next steps.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Application;