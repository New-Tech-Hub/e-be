import { ImgHTMLAttributes, useState } from 'react';

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  priority?: boolean;
  sizes?: string;
}

const OptimizedImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  priority = false, 
  sizes,
  className,
  ...props 
}: OptimizedImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  // Generate responsive srcset for local images
  const generateSrcSet = (originalSrc: string) => {
    // For external images (Supabase, Unsplash), return null to use original
    if (originalSrc.includes('supabase.co') || originalSrc.includes('unsplash.com')) {
      return null;
    }
    
    // For local images, generate responsive sizes
    if (originalSrc.startsWith('/assets/') || originalSrc.includes('/assets/')) {
      // Hero images need larger sizes
      if (originalSrc.includes('hero-')) {
        return `${originalSrc}?w=640&format=webp 640w, ${originalSrc}?w=1024&format=webp 1024w, ${originalSrc}?w=1920&format=webp 1920w`;
      }
      // Category images need medium sizes
      if (originalSrc.includes('category')) {
        return `${originalSrc}?w=400&format=webp 400w, ${originalSrc}?w=800&format=webp 800w`;
      }
      // Product thumbnails and logos need small sizes
      if (originalSrc.includes('products/') || originalSrc.includes('logo')) {
        return `${originalSrc}?w=200&format=webp 200w, ${originalSrc}?w=400&format=webp 400w`;
      }
    }
    return null;
  };

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(src);
    }
  };

  const srcSet = generateSrcSet(src);

  return (
    <img
      src={imgSrc}
      srcSet={srcSet || undefined}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      width={width}
      height={height}
      sizes={sizes}
      onError={handleError}
      fetchPriority={priority ? "high" : "auto"}
      {...props}
    />
  );
};

export default OptimizedImage;