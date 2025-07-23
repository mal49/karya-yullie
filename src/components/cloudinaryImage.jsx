import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';

// Configure Cloudinary instance
const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || import.meta.env.CLOUDINARY_CLOUD_NAME
  }
});

export default function CloudinaryImage({ 
  publicId, 
  alt, 
  className = '',
  width,
  height,
  useTransformation = false, // New prop
  quality: imgQuality = 'auto',
  ...props 
}) {
  let img = cld.image(publicId);
  
  // Only apply transformations when explicitly needed
  if (useTransformation) {
    img = img
      .delivery(format('auto'))
      .delivery(quality(imgQuality));
      
    if (width) {
      img = img.resize(auto().width(width));
    }
  }

  return (
    <AdvancedImage 
      cldImg={img} 
      alt={alt}
      className={className}
      loading="lazy"
      {...props}
    />
  );
}