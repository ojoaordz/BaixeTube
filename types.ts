export interface VideoDetails {
  id: string;
  url: string;
  thumbnail: string;
}

export interface VideoFormat {
  quality: string;
  format: 'mp4';
  size: string;
}

export enum Language {
  PORTUGUESE = 'Portuguese',
  ENGLISH = 'English',
  SPANISH = 'Spanish',
  FRENCH = 'French',
  GERMAN = 'German',
  JAPANESE = 'Japanese',
  KOREAN = 'Korean'
}

export interface SubtitleState {
  isGenerating: boolean;
  content: string | null;
  error: string | null;
}