import React from "react";
import Song from "../song/song.component";
import { PlaylistContainer, PlaylistTitle, SongsWrapper } from "./playlist.styles";

// Mock song data simulating Spotify API response
const mockSongs = [
  {
    id: "1",
    name: "Shape of You",
    artists: [{ name: "Ed Sheeran" }],
    album: { name: "Divide", images: [{ url: "https://via.placeholder.com/50" }] },
    duration_ms: 233712,
    external_urls: { spotify: "https://open.spotify.com/track/1" },
  },
  {
    id: "2",
    name: "Blinding Lights",
    artists: [{ name: "The Weeknd" }],
    album: { name: "After Hours", images: [{ url: "https://via.placeholder.com/50" }] },
    duration_ms: 200040,
    external_urls: { spotify: "https://open.spotify.com/track/2" },
  },
];

const Playlist = () => {
  return (
    <PlaylistContainer>
      <PlaylistTitle>Your Playlist</PlaylistTitle>
      <SongsWrapper>
        {mockSongs.map((song) => (
          <Song key={song.id} song={song} />
        ))}
      </SongsWrapper>
    </PlaylistContainer>
  );
};

export default Playlist;
