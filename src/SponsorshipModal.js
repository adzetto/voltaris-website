import React, { useState, useEffect } from 'react';
import { X, Check, AlertCircle } from 'lucide-react';

// Sponsorship Modal Component
const SponsorshipModal = ({ isOpen, onClose, currentTier }) => {
  // Form data state - must be defined before any conditional returns
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });
  
  // Form status state - must be defined before any conditional returns
  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    success: false,
    error: null
  });
  
  // Reset form when the modal opens with a different tier
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: ''
      });
      
      setStatus({
        submitting: false,
        submitted: false,
        success: false,
        error: null
      });
    }
  }, [isOpen, currentTier]);
  
  // Don't render anything if not open - must be after hooks are defined
  if (!isOpen) return null;
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({
        submitting: false,
        submitted: true,
        success: false,
        error: 'Lütfen tüm gerekli alanları doldurun.'
      });
      return;
    }
    
    // Set submitting state
    setStatus({
      submitting: true,
      submitted: false,
      success: false,
      error: null
    });
    
    try {
      // EmailJS configuration
      const emailjsPublicKey = 'YVMxyzABCDEFGHIJKLMNOP'; // Replace with a real key
      const emailjsServiceId = 'service_voltaris';
      const emailjsTemplateId = 'template_sponsorship';
      
      // Format the tier name properly
      const tierName = {
        'platinum': 'Platinum',
        'gold': 'Altın',
        'silver': 'Gümüş',
        'bronze': 'Bronz',
        'supporter': 'Destekçi'
      }[currentTier] || 'Belirtilmedi';
      
      // Format date and time
      const now = new Date();
      const formattedDate = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
      
      // Prepare the template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company || 'Belirtilmedi',
        phone: formData.phone || 'Belirtilmedi',
        package: tierName,
        message: formData.message,
        date_time: formattedDate,
        subject: `Voltaris Sponsorluk: ${tierName} - ${formData.name}`,
        to_email: 'voltaris.official@gmail.com'
      };
      
      // Load EmailJS dynamically
      if (!window.emailjs) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
        script.async = true;
        document.body.appendChild(script);
        
        await new Promise((resolve) => {
          script.onload = resolve;
        });
        
        window.emailjs.init(emailjsPublicKey);
      } else if (!window.emailjs.init) {
        window.emailjs.init(emailjsPublicKey);
      }
      
      // Send the email
      const response = await window.emailjs.send(emailjsServiceId, emailjsTemplateId, templateParams);
      console.log('Modal sponsorship email sent successfully:', response);
      
      // Success state
      setStatus({
        submitting: false,
        submitted: true,
        success: true,
        error: null
      });
      
      // Close modal after success (with a delay to show success message)
      setTimeout(() => {
        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          message: ''
        });
        
        // Close modal
        onClose();
        
        // Reset status
        setStatus({
          submitting: false,
          submitted: false,
          success: false,
          error: null
        });
      }, 2500);
      
    } catch (error) {
      console.error('Modal sponsorship email sending failed:', error);
      
      // Error state
      setStatus({
        submitting: false,
        submitted: true,
        success: false,
        error: 'E-posta gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.'
      });
    }
  };
  
  // Format the title based on tier
  const getTierTitle = () => {
    switch(currentTier) {
      case 'platinum': return 'Platinum Sponsorluk';
      case 'gold': return 'Altın Sponsorluk';
      case 'silver': return 'Gümüş Sponsorluk';
      case 'bronze': return 'Bronz Sponsorluk';
      case 'supporter': return 'Destekçi Paketi';
      default: return 'Sponsorluk';
    }
  };
  
  // Get tier-specific color
  const getTierColor = () => {
    switch(currentTier) {
      case 'platinum': return 'text-[#e5e4e2] platinum-text';
      case 'gold': return 'text-yellow-500';
      case 'silver': return 'text-gray-400';
      case 'bronze': return 'text-amber-700';
      case 'supporter': return 'text-blue-500';
      default: return 'text-red-500';
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#1a1b1e] w-full max-w-2xl rounded-lg shadow-xl border border-gray-800 relative transition-all duration-300">
        {/* Special effect for platinum tier */}
        {currentTier === 'platinum' && (
          <div className="absolute inset-0 platinum-shimmer opacity-5 overflow-hidden rounded-lg"></div>
        )}
        
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
          aria-label="Close"
        >
          <X size={24} />
        </button>
        
        <div className="p-6 relative z-5">
          <h2 className={`text-2xl font-bold mb-4 ${getTierColor()}`}>
            {getTierTitle()}
          </h2>
          
          <div className="mb-6 text-gray-300">
            <p>Voltaris projemize verdiğiniz destek için teşekkür ederiz. Sponsorluk detayları için lütfen iletişim formunu doldurunuz.</p>
          </div>
          
          {status.success ? (
            <div className="bg-green-900/30 border border-green-700 rounded-lg p-4 flex items-center space-x-3 mb-4">
              <Check size={24} className="text-green-500 flex-shrink-0" />
              <p className="text-green-400">Sponsorluk talebiniz başarıyla alındı. En kısa sürede sizinle iletişime geçeceğiz.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Adınız Soyadınız <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:border-red-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Şirket</label>
                  <input 
                    type="text" 
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:border-red-500 transition-colors"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-1">E-posta <span className="text-red-500">*</span></label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:border-red-500 transition-colors"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-1">Telefon</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-1">Mesajınız <span className="text-red-500">*</span></label>
                <textarea 
                  rows="4" 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:border-red-500 transition-colors"
                  required
                ></textarea>
              </div>
              
              {/* Error message */}
              {status.error && (
                <div className="bg-red-900/30 border border-red-700 rounded-lg p-3 flex items-start space-x-2">
                  <AlertCircle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-red-400 text-sm">{status.error}</p>
                </div>
              )}
              
              <div className="flex justify-end pt-2">
                <button 
                  type="button"
                  onClick={onClose}
                  className="bg-gray-800 text-white px-4 py-2 rounded-lg mr-2 hover:bg-gray-700 transition-colors"
                  disabled={status.submitting}
                >
                  İptal
                </button>
                <button 
                  type="submit" 
                  className={`bg-gradient-to-r ${currentTier === 'platinum' ? 'from-[#babac0] via-[#e5e4e2] to-[#babac0] text-gray-900' : 
                    currentTier === 'gold' ? 'from-yellow-600 to-yellow-800 text-white' : 
                    currentTier === 'silver' ? 'from-gray-500 to-gray-700 text-white' : 
                    currentTier === 'bronze' ? 'from-amber-700 to-amber-900 text-white' :
                    'from-blue-600 to-blue-800 text-white'} 
                    px-6 py-2 rounded-lg flex items-center justify-center font-medium transition-all shadow-lg 
                    ${status.submitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-xl hover:-translate-y-0.5'}`}
                  disabled={status.submitting}
                >
                  {status.submitting ? 'Gönderiliyor...' : 'Gönder'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SponsorshipModal;