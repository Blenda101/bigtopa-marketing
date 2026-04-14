import React, { useState } from 'react';
import { X, Copy, Check, ExternalLink } from 'lucide-react';

interface EmbedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmbedModal: React.FC<EmbedModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [config, setConfig] = useState({
    width: '100%',
    height: '800',
    theme: 'light',
    defaultView: 'yearly'
  });

  if (!isOpen) return null;

  const embedCode = `<iframe
  src="${window.location.origin}?theme=${config.theme}&view=${config.defaultView}"
  width="${config.width}"
  height="${config.height}"
  style="border: none; border-radius: 12px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);"
  title="BigTopa Value Calculator"
></iframe>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">Embed Calculator</h3>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Width
              </label>
              <input
                type="text"
                value={config.width}
                onChange={(e) => setConfig(prev => ({ ...prev, width: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="e.g. 100% or 600px"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Height
              </label>
              <input
                type="text"
                value={config.height}
                onChange={(e) => setConfig(prev => ({ ...prev, height: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="e.g. 800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Theme
              </label>
              <select
                value={config.theme}
                onChange={(e) => setConfig(prev => ({ ...prev, theme: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Default View
              </label>
              <select
                value={config.defaultView}
                onChange={(e) => setConfig(prev => ({ ...prev, defaultView: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
              >
                <option value="yearly">Yearly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-start mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Embed Code
              </label>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-sm text-[#FD5108] hover:text-[#E84A00]"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy code'}
              </button>
            </div>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-md text-sm overflow-x-auto">
              {embedCode}
            </pre>
          </div>

          <div className="bg-blue-50 text-blue-800 p-4 rounded-lg flex items-start gap-3">
            <ExternalLink size={20} className="flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium mb-1">Preview the embed</h4>
              <p className="text-sm">
                Open the calculator in a new tab to see how it will look when embedded.
                Adjust the configuration options above to customize the appearance.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
          <a
            href={`${window.location.origin}?theme=${config.theme}&view=${config.defaultView}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#FD5108] hover:bg-[#E84A00] text-white rounded-md"
          >
            Preview in New Tab
          </a>
        </div>
      </div>
    </div>
  );
};

export default EmbedModal;