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

  // Try to use WebP format if supported
  const getOptimizedSrc = (originalSrc: string) => {
    if (hasError) return originalSrc;
    
    // If it's a URL with query params, try WebP
    if (originalSrc.includes('unsplash.com')) {
      return `${originalSrc}${originalSrc.includes('?') ? '&' : '?'}fm=webp&q=80`;
    }
    
    return originalSrc;
  };

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(src); // Fallback to original
    }
  };

  return (
    <img
      src={getOptimizedSrc(imgSrc)}
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