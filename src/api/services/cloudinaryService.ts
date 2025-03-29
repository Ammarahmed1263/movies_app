import axios from 'axios';

export interface CloudinaryConfig {
  cloudName: string;
  uploadPreset: string;
}

interface ImageFile {
  uri: string;
  type: string;
  fileName: string;
}

export const uploadToCloudinary = async (
  file: ImageFile,
  folderPath: string,
  config: CloudinaryConfig,
): Promise<string> => {
  console.log('before upload: ', file, folderPath, config);

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
    console.log('cloudinary response: ', data);
    return response.data.secure_url;
  } catch (error: any) {
    console.error('Upload error:', error.message);
    throw new Error(`Upload failed: ${error.message || 'Unknown error'}`);
  }
};
