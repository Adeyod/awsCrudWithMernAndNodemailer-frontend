import { useState } from 'react';
import { toast } from 'react-toastify';

const usePreviewImg = () => {
  // const [imgUrl, setImgUrl] = useState(null);
  const [fileData, setFileData] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setFileData(file);
    } else {
      toast.error('Invalid file type. Please select an image file');
      setFileData(null);
    }
  };
  return { fileData, handleImageChange };
};

export default usePreviewImg;
