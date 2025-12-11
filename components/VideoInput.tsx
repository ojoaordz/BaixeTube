import React, { useState } from 'react';
import { Search, Link, Youtube } from 'lucide-react';
import { VideoDetails } from '../types';

interface VideoInputProps {
  onVideoFound: (details: VideoDetails) => void;
}

export const VideoInput: React.FC<VideoInputProps> = ({ onVideoFound }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const extractVideoId = (inputUrl: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = inputUrl.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const videoId = extractVideoId(url);

    if (videoId) {
      onVideoFound({
        id: videoId,
        url: url,
        thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
      });
    } else {
      setError('Invalid YouTube URL. Please check the link and try again.');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-12">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Link className="h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
        </div>
        <input
          type="text"
          className="block w-full pl-12 pr-32 py-4 bg-[#1f1f1f] border border-[#3f3f3f] rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all shadow-lg"
          placeholder="Paste YouTube URL here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-2 top-2 bottom-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl px-6 transition-colors flex items-center gap-2"
        >
          <Search className="w-4 h-4" />
          <span>Analyze</span>
        </button>
      </form>
      {error && (
        <p className="mt-3 text-red-400 text-sm flex items-center gap-2 animate-pulse">
          <Youtube className="w-4 h-4" />
          {error}
        </p>
      )}
    </div>
  );
};