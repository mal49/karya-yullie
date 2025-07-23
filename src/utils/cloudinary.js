import { Cloudinary } from '@cloudinary/url-gen';

// Configure Cloudinary instance
const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  }
});

// For server-side operations (this still requires API secret)
const cloudinaryConfig = {
  cloud_name: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  api_key: import.meta.env.VITE_CLOUDINARY_API_KEY,
  api_secret: import.meta.env.VITE_CLOUDINARY_API_SECRET
};

export { cld, cloudinaryConfig };

// Function to fetch images using Cloudflare Worker
export const fetchCloudinaryImages = async (folder = '') => {
  try {
    const workerURL = 'https://karya-yullie-worker.ikhmalhanif60.workers.dev';
    const response = await fetch(`${workerURL}?folder=${folder}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Worker API error: ${response.status}`);
    }

    const data = await response.json();
    // Sort images by name
    const sortedImages = data.images?.slice().sort((a, b) => {
      if (!a.name || !b.name) return 0;
      return a.name.localeCompare(b.name);
    });
    return sortedImages;
  } catch (error) {
    console.error('Error fetching images from Cloudflare Worker:', error);
    throw error;
  }
};