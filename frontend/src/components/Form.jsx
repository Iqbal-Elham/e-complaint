import axios from 'axios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const [images, setImages] = useState([]);
  const [isUploadContainerVisible, setUploadContainerVisible] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    images.forEach((image) => {
      formData.append('attachments', image);
    });
    formData.delete('file');
    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_API_URL}complaints/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        if (!error.response) {
          setError('connection_error');
        } else {
          setError(error.response?.detail);
        }
        setLoading(false);
      });
  };

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile && images.length < 4) {
      setImages([...images, selectedFile]);
      if (images.length === 3) {
        setUploadContainerVisible(false);
      }
    }
  };

  const handleDeleteImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    setUploadContainerVisible(true);
  };

  return (
    <div className="flex items-center justify-center py-3 px-3 w-full">
      <div className="w-full p-4 md:p-8 shadow-2xl  bg-gradient-to-b from-blue-100 to-blue-50 rounded-sm mt-12">
        <h2 className="text-4xl">{t('newComplaint')}</h2>
        <p className="text-md mb-8">{t('form_description')}</p>

        <form
          onSubmit={handleSubmit}
          className="px-2 md:px-7 justify-center rounded p-3 w-full"
        >
          <div className="grid gap-6 ">
            <div className="w-full flex gap-3 flex-col md:flex-row">
              <input
                className="shadow-2xl p-3 w-full outline-none focus:border-solid focus:border-[1px] rounded-sm border-blue-900 placeholder:text-gray-500"
                type="text"
                placeholder={t('placeholder_name')}
                id="name"
                name="name"
              />
              <input
                className="shadow-2xl p-3 w-full outline-none focus:border-solid focus:border-[1px] rounded-sm border-blue-900 placeholder:text-gray-500"
                type="text"
                placeholder={t('placeholder_phoneNumber')}
                id="phone_number"
                name="phone_number"
              />
            </div>
            <div className="w-full flex gap-3 flex-col md:flex-row">
              <input
                className="shadow-2xl p-3 w-full outline-none focus:border-solid focus:border-[1px] rounded-sm border-blue-900 placeholder:text-gray-500"
                type="email"
                placeholder={t('placeholder_email')}
                id="email"
                name="email"
              />
              <select
                id="complaint_type"
                name="complaint_type"
                className="shadow-2xl p-3 w-full outline-none focus:border-solid focus:ring-blue-900 focus:border-[1px] rounded-sm border-blue-900 placeholder:text-gray-500"
              >
                <option disabled selected>
                  {t('complaint_type')}
                </option>
                <option value="bribe_given">{t('bribe_giver')}</option>
                <option value="bribe_taken">{t('bribe_getter')}</option>
              </select>
            </div>
            <div className="grid gap-6 w-full">
              <textarea
                className="p-3 resize-none shadow-2xl  w-full placeholder:text-gray-500 outline-none focus:border-solid border-blue-500 focus:border-[1px]"
                id="description"
                name="description"
                placeholder={t('description')}
                rows="3"
              />
            </div>
            {isUploadContainerVisible && (
              <div className="mb-4 flex flex-col md:flex-row md:items-center">
                {/* <label className="mb-2 block w-32 text-sm font-bold text-gray-700">
                {t("upload_file")}
              </label> */}
                <label
                  className="w-full cursor-pointer border-2 border-dashed border-gray-600 p-4 text-center text-gray-400"
                  htmlFor="fileInput"
                >
                  <div className="text-3xl">➕</div>
                  <input
                    type="file"
                    id="fileInput"
                    name="file"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>
            )}
            <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="mb-2 flex w-full md:w-1/2 items-center justify-between rounded-md bg-white border shadow-xl p-2"
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Image ${index + 1}`}
                    className="mr-2 block h-16 w-16 rounded-md"
                  />

                  <p
                    onClick={() => handleDeleteImage(index)}
                    className="flex justify-center items-center gap-2 w-14 h-10 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#fb7185] via-[#e11d48] to-[#be123c] hover:shadow-md hover:shadow-red-500 hover:scale-105 duration-300 hover:from-[#be123c] hover:to-[#fb7185]"
                  >
                    <svg viewBox="0 0 15 15" className="w-5 fill-white">
                      <svg
                        className="w-6 h-6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                        ></path>
                      </svg>
                      Button
                    </svg>
                  </p>
                </div>
              ))}
            </div>
            <button
              className="outline-none shadow-2xl  w-1/2 text-center mx-auto p-3  bg-blue-400 text-white rounded-md hover:bg-blue-500 font-bold"
              type="submit"
            >
              ثبت شکایت
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
