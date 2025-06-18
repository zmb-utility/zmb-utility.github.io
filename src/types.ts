export interface Map {
  name: string;
  image: string;
}

export interface Utility {
  id: string;
  name: string;
  description: string; // Description to appear at the bottom of a UtilityTile
  thumbnail?: string; // Optional thumbnail image path
  media?: {
    type: "mp4" | "streamable"; // mp4 for video loaded from assets. Streamable for an embedded video from Streamable
    src: string; // file path to mp4 or embedded link from Streamable
  };
  instructions?: string; // Instructions for a piece of utility or can be used as a clip description
}
