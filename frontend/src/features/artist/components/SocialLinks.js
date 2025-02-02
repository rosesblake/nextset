import { CircleAlert } from "lucide-react";
import { Link } from "react-router-dom";
import React, { useEffect, useState, useMemo } from "react";

function SocialLinks({ artist, preview }) {
  const [isHovered, setIsHovered] = useState(false);
  const [missingSocials, setMissingSocials] = useState([]);

  // Required social media links
  const requiredSocials = useMemo(
    () => [
      "instagram_handle",
      "tiktok",
      "x_handle",
      "facebook_url",
      "spotify_url",
      "soundcloud",
      "live_show_url",
    ],
    []
  );

  // Check if any social links are missing
  useEffect(() => {
    const missing = requiredSocials.filter((key) => !artist[key]);
    setMissingSocials(missing);
  }, [artist, requiredSocials]);

  return (
    <div className="mt-4 flex flex-wrap justify-center gap-4">
      {artist.instagram_handle && (
        <a
          href={artist.instagram_handle}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/images/instagram_icon.svg"
            alt="Instagram"
            className="w-8 h-8"
          />
        </a>
      )}
      {artist.tiktok && (
        <a href={artist.tiktok} target="_blank" rel="noopener noreferrer">
          <img src="/images/tiktok_icon.png" alt="Tiktok" className="w-8 h-8" />
        </a>
      )}
      {artist.x_handle && (
        <a href={artist.x_handle} target="_blank" rel="noopener noreferrer">
          <img
            src="/images/twitter_icon.png"
            alt="Twitter/X"
            className="w-8 h-8"
          />
        </a>
      )}
      {artist.facebook_url && (
        <a href={artist.facebook_url} target="_blank" rel="noopener noreferrer">
          <img
            src="/images/facebook_icon.png"
            alt="Facebook"
            className="w-8 h-8"
          />
        </a>
      )}
      {artist.spotify_url && (
        <a href={artist.spotify_url} target="_blank" rel="noopener noreferrer">
          <img
            src="/images/spotify_icon.svg"
            alt="Spotify"
            className="w-8 h-8"
          />
        </a>
      )}
      {artist.live_show_url && (
        <a
          href={artist.live_show_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/images/youtube_icon.png"
            alt="YouTube"
            className="w-8 h-8"
          />
        </a>
      )}
      {artist.soundcloud && (
        <a href={artist.soundcloud} target="_blank" rel="noopener noreferrer">
          <img
            src="/images/soundcloud_icon.png"
            alt="Soundcloud"
            className="w-8 h-8"
          />
        </a>
      )}

      {missingSocials.length > 0 && preview && (
        <div
          className="relative flex items-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Link to={`/artist/profile`} className="flex items-center">
            <CircleAlert size={30} className="text-red-500" />
          </Link>
          {isHovered && (
            <div className="absolute bottom-full ml-2 bg-gray-900 text-white text-xs p-2 rounded-md shadow-lg whitespace-nowrap">
              <span>Update Socials</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export { SocialLinks };
