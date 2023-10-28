/* eslint-disable react/prop-types */
import { useTranslation } from 'react-i18next';
import { useRef, useState } from 'react';
import AudioBars from './AudioBars';
import { FaFile, FaMusic, FaVideo } from 'react-icons/fa';
import { AiOutlineFileText } from 'react-icons/ai';

const Complaint = ({ complaint }) => {
  const { t } = useTranslation();

  const [playing, setPlaying] = useState(false);
  const audioRef = useRef();
  const [selectedFile, setSelectedFile] = useState(
    complaint?.attachments[0].file
  );

  const get_type = (name) => {
    const extension = name.split('.').pop();
    let type = null;

    if (extension) {
      if (['jpg', 'png', 'webp', 'gif', 'jpeg'].indexOf(extension) !== -1)
        type = 'image';
      else if (['mp4', 'mov', 'mkv', 'avi'].indexOf(extension) !== -1)
        type = 'video';
      else if (['mp3', 'ogg', 'wav'].indexOf(extension) !== -1) type = 'audio';
      else type = 'file';
    }
    return type;
  };

  const type = get_type(selectedFile);

  return (
    <div className="flex items-center justify-center py-3 px-3 w-full">
      <div className="w-full p-4 md:p-8 shadow-2xl  bg-gradient-to-b from-blue-200 to-blue-100 rounded-md mt-12">
        <section className="md:py-20 overflow-hidden rounded bg-white">
          <div className="flex justify-between flex-wrap px-4 py-4 mx-auto lg:py-8">
            <div className="md:p-12 p-2 mb-8 border-b border-gray-200">
              <h2 className="max-w-xl mt-2 mb-2 text-xl font-bold md:text-4xl">
                {t('complaint_number')}
                {complaint?.id}
              </h2>
              <p className="text-xl font-medium text-rose-500 mb-6">
                {t(complaint?.complaint_type)}
              </p>
              <h3 className="text-xl">{t('complaint_desc')}:</h3>
              <p className="max-w-md mb-8 text-gray-700">
                {complaint?.description}
              </p>
              <div>
                <p>
                  <span className="font-bold">
                    {t('complainer_name')}: &nbsp;
                  </span>{' '}
                  {complaint?.name ? complaint.name : t('unknown')}
                </p>
                <p>
                  <span className="font-bold">
                    {t('complainer_phone')}: &nbsp;
                  </span>{' '}
                  {complaint?.phone_number ? complaint.name : t('unknown')}
                </p>
                <p>
                  <span className="font-bold">
                    {t('complainer_email')}: &nbsp;
                  </span>{' '}
                  {complaint?.email ? complaint.name : t('unknown')}
                </p>
              </div>
            </div>

            <div className="w-full px-4 md:w-1/2">
              <div className="z-50 overflow-hidden ">
                <div className="relative mb-2 lg:mb-7 h-auto">
                  {type === 'image' && (
                    <img src={selectedFile} alt="image" className="h-full" />
                  )}
                  {type === 'video' && (
                    <video width="100%" controls>
                      <source src={selectedFile} type="video/mp4" />
                      Your browser does not support HTML video.
                    </video>
                  )}
                  {type === 'audio' && (
                    <>
                      <div className="flex w-full min-h-[250px] md:min-h-[300px] bg-blue-400 flex-col pt-16 rounded justify-between items-center">
                        {playing ? (
                          <AudioBars />
                        ) : (
                          <FaMusic color="white" size={78} />
                        )}
                        <audio
                          onPlay={() => setPlaying(true)}
                          onPause={() => setPlaying(false)}
                          ref={audioRef}
                          controls
                          className="w-full px-2 pb-2"
                          src={selectedFile}
                        />
                      </div>
                    </>
                  )}
                  {type === 'file' && (
                    <a href={selectedFile} download>
                      <AiOutlineFileText size={78} />
                    </a>
                  )}
                </div>
                <div className="flex justify-center mt-4 items-center">
                  {complaint.attachments.map((attachment) => (
                    <div
                      key={attachment.id}
                      onClick={() => setSelectedFile(attachment.file)}
                      className="p-2 w-24 h-24 md:w-32 md:h-32 mx-1 bg-blue-500 rounded overflow-hidden flex flex-col justify-center items-center"
                    >
                      {get_type(attachment.file) === 'image' && (
                        <img
                          src={attachment.file}
                          alt="attachment"
                          className="w-full "
                        />
                      )}
                      {get_type(attachment.file) === 'video' && (
                        <FaVideo className="text-white text-3xl md:text-6xl" />
                      )}
                      {get_type(attachment.file) === 'audio' && (
                        <FaMusic
                          className="text-white text-3xl md:text-6xl"
                          file={attachment.file}
                        />
                      )}
                      {get_type(attachment.file) === 'file' && (
                        <FaFile
                          className="text-white text-3xl md:text-6xl"
                          file={attachment.file}
                        />
                      )}
                      <p className="truncate text-xs md:text-sm text-white ">
                        {attachment.file.split('/').pop()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Complaint;
