import React from 'react';
import { Download, Film, ShieldAlert } from 'lucide-react';
import { VideoFormat } from '../types';

const MOCK_FORMATS: VideoFormat[] = [
  { quality: '1080p (Full HD)', format: 'mp4', size: '145.2 MB' },
  { quality: '720p (HD)', format: 'mp4', size: '78.5 MB' },
  { quality: '480p', format: 'mp4', size: '42.1 MB' },
  { quality: '360p', format: 'mp4', size: '25.8 MB' },
];

export const FormatSelector: React.FC = () => {
  const handleDownload = (format: VideoFormat) => {
    // In a real browser-only app, we cannot download YouTube videos directly due to CORS.
    // This is a simulation of the UI/UX.
    const dummyContent = `This is a placeholder for the downloaded video file.\nQuality: ${format.quality}\nFormat: ${format.format}`;
    const blob = new Blob([dummyContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `video_download_${format.quality.split(' ')[0]}.mp4.dummy`; // Intentionally .dummy to indicate simulation
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert(`Starting simulated download for ${format.quality}...`);
  };

  return (
    <div className="bg-[#1f1f1f] rounded-2xl p-6 border border-[#3f3f3f]">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-red-500/10 rounded-xl">
          <Film className="w-6 h-6 text-red-500" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Download Video</h3>
          <p className="text-gray-400 text-sm">Select your preferred quality</p>
        </div>
      </div>

      <div className="space-y-3">
        {MOCK_FORMATS.map((format, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-4 bg-[#2a2a2a] rounded-xl hover:bg-[#333] transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-400 group-hover:bg-red-500 group-hover:text-white transition-colors">
                MP4
              </div>
              <div>
                <p className="font-semibold text-white">{format.quality}</p>
                <p className="text-xs text-gray-500">{format.size}</p>
              </div>
            </div>
            <button 
              onClick={() => handleDownload(format)}
              className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-4 flex items-start gap-2 text-xs text-gray-500 bg-black/20 p-3 rounded-lg">
        <ShieldAlert className="w-4 h-4 shrink-0" />
        <p>
          Note: Direct browser-side YouTube downloading is restricted by browser security policies (CORS). 
          This demo simulates the UI. The subtitle generation below is fully functional using Gemini AI.
        </p>
      </div>
    </div>
  );
};