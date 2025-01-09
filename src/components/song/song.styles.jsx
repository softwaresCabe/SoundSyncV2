import styled from "styled-components";

export const SongContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

export const AlbumImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 4px;
`;

export const SongInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SongTitle = styled.h3`
  font-size: 16px;
  margin: 0;
`;

export const ArtistNames = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

export const AlbumName = styled.p`
  font-size: 14px;
  color: #888;
  margin: 0;
`;

export const Duration = styled.p`
  font-size: 14px;
  color: #aaa;
  margin: 0;
`;

export const SpotifyLink = styled.a`
  font-size: 14px;
  color: #1db954;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
