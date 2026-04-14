import React, { useState } from 'react';
import { useValueCalculator } from '../../context/ValueCalculatorContext';
import AppSelector from './AppSelector';
import CompanySize from './CompanySize';
import Results from './Results';
import AdminPanel from '../Admin/AdminPanel';
import EmbedModal from './EmbedModal';
import { ArrowLeft, Settings, MoreVertical, Copy, ArrowRight } from 'lucide-react';

const Calculator: React.FC = () => {
  const { state, toggleAdminMode } = useValueCalculator();
  const { isAdminMode } = state;
  const [isYearly, setIsYearly] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [showEmbedModal, setShowEmbedModal] = useState(false);

  return (
    <div className="w-full max-w-6xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
      <div className="bg-gradient-to-r from-[#FD5108] to-[#FF7A41] p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-10">
              <svg width="42" height="42" viewBox="0 0 171 103" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M82.8 32.5C82.8 32.5 69.4 58.9 47.6 76.5C18.8 99.7 0 103 0 103L52.2 101.3C52.2 101.3 72.9 71.1 82.8 32.5Z" fill="white"/>
                <path d="M88.1 31.7998C88.1 31.7998 101.6 58.0997 123.4 75.6997C152.2 98.8997 171 102.2 171 102.2L118.8 100.6C118.8 100.6 98.1 70.3998 88.1 31.7998Z" fill="white"/>
                <path d="M85.8 32.6001L67.9 101H102L85.8 32.6001Z" fill="white"/>
                <path d="M90.3 21.3999C90.2901 22.2757 90.022 23.1291 89.5293 23.8532C89.0365 24.5773 88.341 25.1399 87.53 25.4705C86.7189 25.8011 85.8283 25.885 84.9698 25.7117C84.1113 25.5384 83.323 25.1156 82.7037 24.4963C82.0844 23.8769 81.6616 23.0887 81.4883 22.2301C81.315 21.3716 81.3989 20.481 81.7295 19.67C82.0601 18.8589 82.6227 18.1634 83.3468 17.6707C84.0709 17.1779 84.9242 16.9098 85.8 16.8999C86.3917 16.8974 86.9779 17.0121 87.525 17.2373C88.0721 17.4626 88.5693 17.794 88.9876 18.2123C89.406 18.6307 89.7374 19.1277 89.9626 19.6748C90.1879 20.2219 90.3025 20.8083 90.3 21.3999Z" fill="white"/>
                <path d="M87.1 38.2H84.1V0H87.1V38.2Z" fill="white"/>
                <path d="M85.3 6.59998L87.1 0H108.2L101.6 6.90002L106.7 12.2L86.3 12.7L85.3 6.59998Z" fill="white"/>
              </svg>
            </div>
            <div className="h-8 w-px bg-white/30" />
            <div className="flex flex-col">
              <h2 className="text-white text-xl font-bold">BigTopa</h2>
              <h3 className="text-white/90 text-sm">Value Calculator</h3>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {isAdminMode && (
              <button
                onClick={toggleAdminMode}
                className="flex items-center gap-2 text-white hover:bg-white/10 px-4 py-2 rounded-md transition-all"
              >
                <ArrowLeft size={18} />
                <span>Back to Calculator</span>
              </button>
            )}
            
            {!isAdminMode && (
              <div className="bg-white/10 rounded-lg p-1 flex">
                <button
                  onClick={() => setIsYearly(true)}
                  className={`px-4 py-1 rounded-md text-sm transition-all ${
                    isYearly 
                      ? 'bg-white text-[#FD5108]' 
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  Yearly
                </button>
                <button
                  onClick={() => setIsYearly(false)}
                  className={`px-4 py-1 rounded-md text-sm transition-all ${
                    !isYearly 
                      ? 'bg-white text-[#FD5108]' 
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  Monthly
                </button>
              </div>
            )}
            
            <div className="relative">
              <button 
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <MoreVertical size={20} className="text-white" />
              </button>
              
              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <button
                    onClick={() => {
                      toggleAdminMode();
                      setShowMenu(false);
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    <Settings size={16} />
                    Admin Panel
                  </button>
                  <button
                    onClick={() => {
                      setShowEmbedModal(true);
                      setShowMenu(false);
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    <Copy size={16} />
                    Embed Calculator
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isAdminMode ? (
        <AdminPanel />
      ) : (
        <div className="p-6 grid md:grid-cols-2 gap-6">
          <div>
            <AppSelector />
          </div>
          <div className="flex flex-col gap-6">
            <CompanySize />
            <Results isYearly={isYearly} />
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Collaborate and save with BigTopa Today!</h3>
              <a 
                href="https://www.bigtopa.com/pricing.html"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#FD5108] hover:bg-[#E84A00] transition-all duration-300 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2"
              >
                Start Your Free Trial
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      )}

      <EmbedModal 
        isOpen={showEmbedModal}
        onClose={() => setShowEmbedModal(false)}
      />
    </div>
  );
};

export default Calculator;