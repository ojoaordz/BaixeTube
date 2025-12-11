import React, { useState } from 'react';
import { Youtube, ArrowRight } from 'lucide-react';
import { VideoInput } from './components/VideoInput';
import { FormatSelector } from './components/FormatSelector';
import { SubtitleGenerator } from './components/SubtitleGenerator';
import { VideoDetails } from './types';

const App: React.FC = () => {
  const [video, setVideo] = useState<VideoDetails | null>(null);

  const handleVideoFound = (details: VideoDetails) => {
    setVideo(details);
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Navbar */}
      <nav className="border-b border-[#1f1f1f] bg-[#0f0f0f]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <Youtube className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">TubeGenius</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
            <span className="hover:text-white transition-colors cursor-pointer">How it works</span>
            <span className="hover:text-white transition-colors cursor-pointer">Features</span>
            <a href="#" className="text-white bg-[#2a2a2a] hover:bg-[#333] px-4 py-2 rounded-lg transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
            Download Videos & <br />
            <span className="text-red-500">Translate Subtitles</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            The advanced tool to process YouTube content. Save videos in MP4 and generate AI-powered subtitles in Portuguese and other languages instantly.
          </p>
          
          <VideoInput onVideoFound={handleVideoFound} />
        </div>

        {/* Results Section */}
        {video && (
          <div className="animate-in fade-in slide-in-from-bottom-10 duration-700">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Video Preview & Download */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-[#1f1f1f] rounded-2xl overflow-hidden border border-[#3f3f3f] shadow-2xl">
                  <div className="aspect-video relative group cursor-pointer">
                    <img 
                      src={video.thumbnail} 
                      alt="Video thumbnail" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                         <Youtube className="w-8 h-8 text-white fill-current" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h2 className="font-semibold text-lg line-clamp-2 mb-2 text-white">
                      Detected Video Content
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span className="px-2 py-0.5 bg-[#2a2a2a] rounded text-xs border border-[#3f3f3f]">ID: {video.id}</span>
                      <span>•</span>
                      <span className="text-green-400">Ready to process</span>
                    </div>
                  </div>
                </div>

                <FormatSelector />
              </div>

              {/* Right Column: AI Subtitles */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-4 mb-6 lg:hidden">
                  <div className="h-px bg-[#3f3f3f] flex-grow"></div>
                  <ArrowRight className="text-gray-500 transform rotate-90" />
                  <div className="h-px bg-[#3f3f3f] flex-grow"></div>
                </div>
                <SubtitleGenerator />
              </div>
            </div>
          </div>
        )}

        {/* Features Grid (Bottom filler) */}
        {!video && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
            {[
              { title: "MP4 Downloads", desc: "High quality video extraction up to 1080p." },
              { title: "AI Translation", desc: "Powered by Gemini for accurate context-aware subtitles." },
              { title: "Multi-Language", desc: "Support for Portuguese, Spanish, English, and more." }
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#1f1f1f] border border-[#2a2a2a]">
                <h3 className="font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;