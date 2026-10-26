import React from 'react';
import { toYouTubeEmbedUrl } from '../utils/youtube';
import { Play, VideoOff, BarChart3, ExternalLink } from 'lucide-react';

interface VideoPlayerProps {
  youtubeUrl: string;
  thumbnail: string;
  title: string;
}

export default function VideoPlayer({ youtubeUrl, thumbnail, title }: VideoPlayerProps) {
  const embedUrl = toYouTubeEmbedUrl(youtubeUrl);

  if (embedUrl) {
    return (
      <div className="flex flex-col gap-2">
        <div
          className="relative w-full overflow-hidden rounded-2xl border"
          style={{
            paddingTop: '56.25%',
            background: '#0B1F3A',
            borderColor: 'var(--c-border)',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <iframe
            src={embedUrl}
            title={title}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
        <div className="flex items-center justify-between px-1 text-xs text-[var(--c-text-muted)]">
          <span>YouTube Laboratory Tutorial</span>
          {youtubeUrl && (
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#0EA5A8] hover:text-[#0c8c8f] hover:underline transition-colors font-medium"
            >
              Watch on YouTube
              <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>
    );
  }

  if (thumbnail) {
    return (
      <div className="relative w-full overflow-hidden rounded-xl bg-[#0B1F3A]" style={{ paddingTop: '56.25%' }}>
        <img
          src={thumbnail}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2"
          style={{ background: 'rgba(11, 31, 58, 0.55)' }}>
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
            <VideoOff size={22} className="text-white/70" />
          </div>
          <p className="text-white/70 text-sm font-medium">Video unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full rounded-xl flex flex-col items-center justify-center gap-4"
      style={{ paddingTop: '56.25%', position: 'relative', background: 'linear-gradient(135deg, #0B1F3A 0%, #163B63 100%)' }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
          <BarChart3 size={28} className="text-[#0EA5A8]" />
        </div>
        <p className="text-white/60 text-sm font-medium">No video available</p>
        <p className="text-white/40 text-xs">Add a YouTube URL to embed a video</p>
      </div>
    </div>
  );
}
