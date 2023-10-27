import { BsImageFill } from 'react-icons/bs';

const PlaceHolder = () => {
  return (
    <div className="animate-pulse">
      <div className="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-2xl my-9">
        <div className="relative mx-4 -mt-6 h-40 bg-slate-400 rounded-xl shadow-lg flex items-center justify-center shadow-blue-gray-500/40">
          <BsImageFill size={78} className="text-slate-100" />
        </div>
        <div className="p-6">
          <p className="w-20 rounded-md h-6 bg-slate-400"></p>
          <p className="block w-90 h-32 mt-4 rounded-md bg-slate-400"></p>
        </div>
        <div className="p-6 pt-0">
          <div className="bg-slate-400 rounded-md w-fit px-10 py-5"></div>
        </div>
      </div>
    </div>
  );
};

export default PlaceHolder;
