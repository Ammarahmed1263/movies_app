import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';

export interface CloudinaryConfig {
  cloudName: string;
  uploadPreset: string;
}

interface ImageFile {
  uri: string;
  type: string;
  fileName: string;
}

const config: CloudinaryConfig = {
  cloudName: 'moviecorn-co',
  uploadPreset: 'app_img',
};

export const uploadToCloudinary = async (
  file: ImageFile,
  folderPath: string,
): Promise<string> => {
  const formData = new FormData();
  formData.append('file', {
    uri: file.uri,
    type: file.type,
    name: file.fileName,
  });
  formData.append('upload_preset', config.uploadPreset);
  formData.append('cloud_name', config.cloudName);
  formData.append('folder', folderPath);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${config.cloudName}/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    const data = response.data;
    return response.data.secure_url;
  } catch (error: any) {
    console.error('Upload error:', error.message);
    throw new Error(`Upload failed: ${error.message || 'Unknown error'}`);
  }
};

export const deleteFromCloudinary = async (publicId: string) => {
  const timestamp = Math.round(new Date().getTime() / 1000).toString();
  // const signature = require('crypto')
  //   .createHash('sha1')
  //   .update(
  //     `public_id=${publicId}&timestamp=${timestamp}${Config.CLOUDINARY_API_SECRET}`,
  //   )
  //   .digest('hex');

  try {
    await axios.post(
      `https://api.cloudinary.com/v1_1/${config.cloudName}/image/destroy`,
      {
        public_id: publicId,
        api_key: Config.CLOUDINARY_API_KEY,
        // signature,
        timestamp,
      },
      {
        headers: {'Content-Type': 'application/json'},
      },
    );
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Deletion failed: ${axiosError.message || 'Unknown error'}`,
    );
  }
};
