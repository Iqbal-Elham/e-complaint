// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// // import { createComplaint } from "../context2/features/complainSlice";
// import { useTranslation } from "react-i18next";

// const Form = () => {
//   const [images, setImages] = useState([]);
//   const [isUploadContainerVisible, setUploadContainerVisible] = useState(true);

//   const { t } = useTranslation()

//   const handleSubmit = (e) => {
//     e.preventDefault();
// const formData = new FormData(e.target);
// images.forEach((image) => {
//   formData.append("attachments", image);
// });
// formData.delete("file");
// dispatch(createComplaint(formData));
//   };

//   const handleFileUpload = (e) => {
//     const selectedFile = e.target.files[0];

//     if (selectedFile && images.length < 4) {
//       setImages([...images, selectedFile]);
//       if (images.length === 3) {
//         setUploadContainerVisible(false);
//       }
//     }
//   };

//   const handleDeleteImage = (index) => {
//     const updatedImages = [...images];
//     updatedImages.splice(index, 1);
//     setImages(updatedImages);
//     setUploadContainerVisible(true);
//   };

//   return (
//     <div className="flex items-center justify-center py-10 px-3 w-full">
//       <div className="container rounded-xl bg-gradient-to-b from-blue-400 to-blue-50 p-8 shadow-2xl">
//         <h2 className="text-4xl">{t('newComplaint')}</h2>
//         <p className="text-md mb-8">
//           {t('form_description')}
//         </p>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4 items-center md:flex">
//             <label
//               className="mb-2 block w-32 text-sm font-bold text-gray-700"
//               htmlFor="title"
//             >
//               {t('title')}
//             </label>
//             <textarea
//               className="w-full rounded border p-2"
//               id="title"
//               name="title"
//               placeholder={t('placeholder_title')}
//               rows="2"
//             />
{
  /* <p>{errors ? errors["title"] : ""}</p> */
}

{
  /* </div>
          <div className="mb-4 items-center md:flex">
            <label
              className="mb-2 block w-32 text-sm font-bold text-gray-700"
              htmlFor="address"
            >
              {t('address')}
            </label>
            <textarea
              className="w-full rounded border p-2"
              id="address"
              name="address"
              placeholder={t('placeholder_address')}
              rows="2"
            /> */
}
{
  /* <p>{errors ? errors["address"] : ""}</p> */
}
{
  /* </div>
          <div className="mb-4 items-center md:flex">
            <label
              className="mb-2 block w-32 text-sm font-bold text-gray-700"
              htmlFor="province"
            >
              {t('province')}
            </label>
            <select
              name="province"
              id="province"
              className="block w-40 rounded-md border border-gray-300 bg-blue-300 px-1 text-xl text-gray-900 focus:border-blue-500 focus:ring-blue-500 " */
}
// >
{
  /* {provinces.map((province) => (
                <option key={province} value={province}>
                  {t(`provinces.${province}`)}
                </option>
              ))} */
}
{
  /* </select> */
}
{
  /* <p>{errors ? errors["province"] : ""}</p> */
}
{
  /* </div>
          <div className="mb-4 items-center md:flex">
            <label
              className="mb-2 block w-32 text-sm font-bold text-gray-700"
              htmlFor="complaint_type"
            >
              {t('category')}
            </label>
            <select
              name="complaint_type"
              id="complaint_type"
              className="block w-40 rounded-md border border-gray-300 bg-blue-300 px-1 text-xl text-gray-900 focus:border-blue-500 focus:ring-blue-500" */
}
//   >
{
  /* {complaint_types.map((complaint) => (
                <option key={complaint} value={complaint}>
                  {t(`complaint_types.${complaint}`)}
                </option>
              ))} */
}
{
  /* </select> */
}
{
  /* <p>{errors ? errors["complaint_type"] : ""}</p> */
}
{
  /* </div>
          <div className="mb-4 items-center md:flex">
            <label
              className="mb-2 block w-32 text-sm font-bold text-gray-700"
              htmlFor="description"
            >
              {t('description')}
            </label>
            <textarea
              className="w-full rounded border p-2"
              id="description"
              name="description"
              placeholder={t('placeholder_description')}

              rows="3"
            />
          </div>
          {isUploadContainerVisible && (
            <div className="mb-4 flex flex-col md:flex-row md:items-center">
              <label className="mb-2 block w-32 text-sm font-bold text-gray-700">
                {t('upload_file')}
              </label>
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
          <div className="my-4 flex w-full flex-col items-center justify-between gap-2 md:flex-row">
            {images.map((image, index) => (
              <div
                key={index}
                className="mb-2 flex w-1/2 items-center justify-between rounded-xl border border-blue-400 p-2"
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Image ${index + 1}`}
                  className="mr-2 block h-16 w-16 rounded-md"
                />
                <button
                  onClick={() => handleDeleteImage(index)}
                  className="block text-xl text-red-500"
                >
                  برداشتن
                </button>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button
              className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
              type="submit"
            >
              ثبت شکایت
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; */
}

// export default Form;

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { createComplaint } from "../context2/features/complainSlice";
import { useTranslation } from "react-i18next";

const Form = () => {
  const [images, setImages] = useState([]);
  const [isUploadContainerVisible, setUploadContainerVisible] = useState(true);

  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    // const formData = new FormData(e.target);
    // images.forEach((image) => {
    //   formData.append("attachments", image);
    // });
    // formData.delete("file");
    // dispatch(createComplaint(formData));
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
    <div className="flex items-center justify-center py-10 px-3 w-full">
      <div className="w-full p-8 shadow-2xl">
        <h2 className="text-4xl">{t("newComplaint")}</h2>
        <p className="text-md mb-8">{t("form_description")}</p>

        <form className="px-7 justify-center bg-slate-300 rounded p-3 w-full">
          <div className="grid gap-6 ">
            <div className="w-full flex gap-3">
              <input
                className="capitalize shadow-2xl p-3 ex w-full outline-none focus:border-solid focus:border-[1px] border-[#035ec5] placeholder:text-black"
                type="text"
                placeholder={t("placeholder_title")}
                id="First-Name"
                name="First-Name"
                required=""
              />
              <input
                className="p-3 shadow-2xl   glass w-full text-black outline-none focus:border-solid focus:border-[1px]border-[#035ec5]"
                type="date"
                required=""
              />
            </div>
            
            <div className="grid gap-6 w-full">
              <textarea
                className="p-3 shadow-2xl  glass w-full placeholder:text-black outline-none focus:border-solid border-[#035ec5] focus:border-[1px]"
                id="address"
                name="address"
                placeholder={t("placeholder_address")}
                rows="2"
              />
            </div>
            <div className="grid gap-6 w-full">
              <textarea
                className="p-3 shadow-2xl  glass w-full placeholder:text-black outline-none focus:border-solid border-[#035ec5] focus:border-[1px]"
                id="address"
                name="address"
                placeholder={t("description")}
                rows="2"
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
                className="mb-2 flex w-1/2 items-center justify-between rounded-xl border border-blue-400 p-2"
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Image ${index + 1}`}
                  className="mr-2 block h-16 w-16 rounded-md"
                />
                <button
                  onClick={() => handleDeleteImage(index)}
                  className="block text-xl text-red-500"
                >
                  برداشتن
                </button>
              </div>
            ))}
          </div>
            <button
              className="outline-none glass shadow-2xl  w-full p-3  bg-[#ffffff42] hover:border-[#035ec5] hover:border-solid hover:border-[1px]  hover:text-[#035ec5] font-bold"
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
