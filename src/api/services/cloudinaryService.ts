import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import crypto from 'react-native-quick-crypto';
import base64 from 'base-64';

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
  existingPublicId?: string | null,
): Promise<string> => {
  if (existingPublicId) {
    await deleteFromCloudinary(existingPublicId);
  }

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
    return response.data.secure_url;
  } catch (error: any) {
    console.error('Upload error:', error.message);
    throw new Error(`Upload failed: ${error.message || 'Unknown error'}`);
  }
};

export const deleteFromCloudinary = async (publicId: string | null) => {
  if (!publicId) {
    throw new Error('No public ID provided');
  }

  const timestamp = Math.round(new Date().getTime() / 1000).toString();
  const signatureString = `public_id=${publicId}&timestamp=${timestamp}${Config.CLOUDINARY_API_SECRET}`;
  const signature = crypto
    .createHash('sha1')
    .update(signatureString)
    .digest('hex');

  try {
    await axios.post(
      `https://api.cloudinary.com/v1_1/${config.cloudName}/image/destroy`,
      {
        public_id: publicId,
        api_key: Config.CLOUDINARY_API_KEY,
        signature,
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

export const deleteFolderAssets = async (folderPrefix: string) => {
  const timestamp = Math.round(new Date().getTime() / 1000).toString();
  const signatureString = `prefix=${folderPrefix}timestamp=${timestamp}${Config.CLOUDINARY_API_SECRET}`;
  const signature = crypto
    .createHash('sha1')
    .update(signatureString)
    .digest('hex');

  const encodedAuth = base64.encode(
    `${Config.CLOUDINARY_API_KEY}:${Config.CLOUDINARY_API_SECRET}`,
  );

  // Log everything for debugging
  console.log('Request Details:');
  console.log('Cloud Name:', config.cloudName);
  console.log('API Key:', Config.CLOUDINARY_API_KEY);
  console.log('API Secret:', Config.CLOUDINARY_API_SECRET); // Be careful logging this in production
  console.log('Prefix:', folderPrefix);
  console.log('Timestamp:', timestamp);
  console.log('Signature String:', signatureString);
  console.log('Signature:', signature);

  try {
    const response = await axios.delete(
      `https://api.cloudinary.com/v1_1/${config.cloudName}/resources/image/upload`,
      {
        params: {
          prefix: folderPrefix,
          api_key: Config.CLOUDINARY_API_KEY,
          timestamp,
          signature,
        },
        headers: {
          Authorization: `Basic ${encodedAuth}`,
        },
      },
    );
    console.log(`Deleted assets under prefix: ${folderPrefix}`, response.data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error('Error deleting assets:', {
      message: axiosError.message,
      status: axiosError.response?.status,
      data: axiosError.response?.data,
    });
    throw new Error(
      `Asset deletion failed: ${axiosError.message || 'Unknown error'}`,
    );
  }
};

export const deleteFolder = async (folderPath: string) => {
  const encodedAuth = base64.encode(
    `${Config.CLOUDINARY_API_KEY}:${Config.CLOUDINARY_API_SECRET}`,
  );

  try {
    const response = await axios.delete(
      `https://api.cloudinary.com/v1_1/${config.cloudName}/folders/${folderPath}`,
      {
        headers: {
          Authorization: `Basic ${encodedAuth}`,
        },
      },
    );
    console.log(`Deleted folder: ${folderPath}`, response.data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error('Error deleting folder:', {
      message: axiosError.message,
      status: axiosError.response?.status,
      data: axiosError.response?.data,
    });
    throw new Error(
      `Folder deletion failed: ${axiosError.message || 'Unknown error'}`,
    );
  }
};

export const deleteUserFolder = async (userFolder: string) => {
  try {
    await deleteFolderAssets(userFolder);
    await deleteFolder(userFolder);
    console.log(
      `Successfully deleted user folder and its contents: ${userFolder}`,
    );
  } catch (error) {
    console.error('Failed to delete user folder:', (error as Error).message);
    throw error;
  }
};
