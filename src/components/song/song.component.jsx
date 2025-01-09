import React from "react";
import {
  SongContainer,
  AlbumImage,
  SongInfo,
  SongTitle,
  ArtistNames,
  AlbumName,
  Duration,
  SpotifyLink,
} from "./song.styles";

const Song = ({ song }) => {
  const { name, artists, album, duration_ms, external_urls } = song;

  // Convert milliseconds to minutes:seconds
  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <SongContainer>
      <AlbumImage src={album.images[0].url} alt={`${album.name} cover`} />
      <SongInfo>
        <SongTitle>{name}</SongTitle>
        <ArtistNames>{artists.map((artist) => artist.name).join(", ")}</ArtistNames>
        <AlbumName>{album.name}</AlbumName>
        <Duration>{formatDuration(duration_ms)}</Duration>
        <SpotifyLink href={external_urls.spotify} target="_blank" rel="noopener noreferrer">
          Listen on Spotify
        </SpotifyLink>
      </SongInfo>
    </SongContainer>
  );
};

export default Song;
