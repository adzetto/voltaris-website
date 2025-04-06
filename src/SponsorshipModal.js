import React from 'react';
import { X } from 'lucide-react';

// Sponsorship Modal Component
const SponsorshipModal = ({ isOpen, onClose, currentTier }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-gray-900 w-full max-w-2xl rounded-lg shadow-xl border border-gray-800 relative">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
        
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-red-500">
            {currentTier === 'platinum' ? 'Platinum Sponsorluk' : 
             currentTier === 'gold' ? 'Altın Sponsorluk' : 
             currentTier === 'silver' ? 'Gümüş Sponsorluk' : 
             'Bronz Sponsorluk'}
          </h2>
          
          <div className="mb-6 text-gray-300">
            <p>Voltaris projemize verdiğiniz destek için teşekkür ederiz. Sponsorluk detayları için lütfen iletişim formunu doldurunuz.</p>
          </div>
          
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-sm mb-1">Adınız Soyadınız</label>
                <input 
                  type="text" 
                  className="w-full bg-black/50 border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">Şirket</label>
                <input 
                  type="text" 
                  className="w-full bg-black/50 border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-400 text-sm mb-1">E-posta</label>
              <input 
                type="email" 
                className="w-full bg-black/50 border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-gray-400 text-sm mb-1">Telefon</label>
              <input 
                type="tel" 
                className="w-full bg-black/50 border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-gray-400 text-sm mb-1">Mesajınız</label>
              <textarea 
                rows="4" 
                className="w-full bg-black/50 border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:border-red-500 transition-colors"
              ></textarea>
            </div>
            
            <div className="flex justify-end">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                }}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg mr-2 hover:bg-gray-700 transition-colors"
              >
                İptal
              </button>
              <button 
                type="submit" 
                className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white px-6 py-2 rounded-lg flex items-center justify-center font-medium transition-colors shadow-lg shadow-red-900/20"
              >
                Gönder
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SponsorshipModal;