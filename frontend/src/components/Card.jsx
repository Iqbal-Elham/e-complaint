/* eslint-disable react/prop-types */
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineFileText } from 'react-icons/ai';
import { FaMusic } from 'react-icons/fa';
import AudioBars from './AudioBars';
import { BsFillEyeFill } from 'react-icons/bs'


const Card = ({ complaint }) => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef();

  const first_attachment = complaint.attachments[0]?.file.split('.').pop();

  let type = null;

  if (first_attachment) {
    if (['jpg', 'png', 'webp', 'gif', 'jpeg'].indexOf(first_attachment) !== -1)
      type = 'image';
    else if (['mp4', 'mov', 'mkv', 'avi'].indexOf(first_attachment) !== -1)
      type = 'video';
    else if (['mp3', 'ogg', 'wav'].indexOf(first_attachment) !== -1)
      type = 'audio';
    else type = 'file';
  }

  return (
    <div className="relative flex w-96 md:w-full flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-2xl my-6">
      <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg flex items-center justify-center shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
        {type === 'image' && (
          <img
            src={complaint.attachments[0].file}
            alt="image"
            className="h-full"
          />
        )}
        {type === 'video' && (
          <video width="400" controls>
            <source src={complaint.attachments[0].file} type="video/mp4" />
            Your browser does not support HTML video.
          </video>
        )}
        {type === 'audio' && (
          <>
            <div className="flex h-full flex-col pt-8 justify-between items-center">
              {playing ? <AudioBars /> : <FaMusic size={60} />}
              <audio
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                ref={audioRef}
                controls
                src={complaint.attachments[0].file}
              />
            </div>
          </>
        )}
        {type === 'file' && <AiOutlineFileText size={78} />}
      </div>
      <div className="p-6">
        <h5 className="mb-2 block text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
          {complaint?.name ? complaint.name : 'بدون هویت'}
        </h5>
        <p className="block text-base font-light min-h-[8rem] max-h-32 truncate leading-relaxed text-inherit antialiased">
          {complaint?.description}
        </p>
      </div>
      <div className="p-6 pt-0 flex justify-between items-center">
        <Link
          data-ripple-light="true"
          to={`/complaint/${complaint?.id}`}
          className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          نمایش
        </Link>
        <p className="flex gap-2 items-center text-lg font-bold"><BsFillEyeFill /> {complaint?.views/2}</p>
      </div>
    </div>
  );
};

export default Card;
