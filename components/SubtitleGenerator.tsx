import React, { useState } from 'react';
import { FileText, Languages, Sparkles, Download, Copy, Check } from 'lucide-react';
import { Language, SubtitleState } from '../types';
import { generateSubtitles } from '../services/geminiService';

export const SubtitleGenerator: React.FC = () => {
  const [context, setContext] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(Language.PORTUGUESE);
  const [state, setState] = useState<SubtitleState>({
    isGenerating: false,
    content: null,
    error: null
  });
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!context.trim()) return;

    setState({ isGenerating: true, content: null, error: null });

    try {
      const srtContent = await generateSubtitles(context, selectedLanguage);
      setState({ isGenerating: false, content: srtContent, error: null });
    } catch (err: any) {
      setState({ 
        isGenerating: false, 
        content: null, 
        error: err.message || 'An unexpected error occurred.' 
      });
    }
  };

  const handleDownload = () => {
    if (!state.content) return;
    const blob = new Blob([state.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subtitles_${selectedLanguage}.srt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    if (state.content) {
      navigator.clipboard.writeText(state.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-[#1f1f1f] rounded-2xl p-6 border border-[#3f3f3f] h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-500/10 rounded-xl">
          <Sparkles className="w-6 h-6 text-blue-500" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">AI Subtitles</h3>
          <p className="text-gray-400 text-sm">Generate & translate using Gemini</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 flex-grow">
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
            Step 1: Video Context / Transcript
          </label>
          <textarea
            className="w-full h-32 bg-[#2a2a2a] border border-[#3f3f3f] rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none text-sm"
            placeholder="Paste the video transcript here, or describe the video topic (e.g., 'A cooking tutorial about making Brazilian Feijoada'). Gemini will generate the subtitles."
            value={context}
            onChange={(e) => setContext(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
            Step 2: Target Language
          </label>
          <div className="relative">
            <Languages className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value as Language)}
              className="w-full bg-[#2a2a2a] border border-[#3f3f3f] rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer"
            >
              {Object.values(Language).map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={!context.trim() || state.isGenerating}
          className={`mt-2 w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
            !context.trim() || state.isGenerating
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20'
          }`}
        >
          {state.isGenerating ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <FileText className="w-5 h-5" />
              Generate Subtitles
            </>
          )}
        </button>

        {state.error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            {state.error}
          </div>
        )}

        {state.content && (
          <div className="mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500 flex-grow flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-green-400">Preview (SRT)</span>
              <div className="flex gap-2">
                 <button 
                  onClick={handleCopy}
                  className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                  title="Copy to clipboard"
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
                <button 
                  onClick={handleDownload}
                  className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                  title="Download .SRT file"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
            <pre className="w-full flex-grow h-48 bg-black/30 rounded-xl p-4 text-xs font-mono text-gray-300 overflow-y-auto border border-[#3f3f3f] custom-scrollbar whitespace-pre-wrap">
              {state.content}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};