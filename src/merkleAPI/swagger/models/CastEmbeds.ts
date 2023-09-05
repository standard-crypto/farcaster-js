export interface CastEmbeds {
  images: CastEmbedImage[];
  urls: CastEmbedUrl[];
  unknowns: any[];
  processedCastText: string;
}

export interface CastEmbedImage {
  type: "image";
  url: string;
  sourceUrl: string;
  alt: string;
}

export interface CastEmbedUrl {
  type: "url";
  openGraph: {
    url: string;
    sourceUrl: string;
    title: string;
    description: string;
    domain: string;
    image: string;
    logo: string;
    useLargeImage: boolean;
  };
}
