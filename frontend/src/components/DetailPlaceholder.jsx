const DetailPlaceholder = () => {
  return (
    <div className="flex items-center justify-center py-3 px-3 w-full animate-pulse">
      <div className="w-full p-4 md:p-8 shadow-2xl  bg-gradient-to-b from-blue-200 to-blue-100 rounded-md mt-12">
        <section className="md:py-20 overflow-hidden rounded p-8 bg-white flex flex-wrap justify-between">
          <div className="flex flex-col w-1/2">
            <div className="w-1/4 h-8 rounded bg-slate-400"></div>
            <div className="w-1/2 h-6 mt-2 rounded bg-slate-400"></div>
            <div className="w-1/2 h-6 mt-2 rounded bg-slate-400"></div>
            <div className="w-1/2 h-6 mt-2 rounded bg-slate-400"></div>
            <div className="w-72 h-72 rounded mt-12 bg-slate-400"></div>
          </div>
          <div className="flex flex-col w-1/2">
            <div className="w-full h-72 rounded bg-slate-400"></div>
            <div className="flex mt-8">
              <div className="w-24 mx-2 h-24 mt-2 rounded bg-slate-400"></div>
              <div className="w-24 mx-2 h-24 mt-2 rounded bg-slate-400"></div>
              <div className="w-24 mx-2 h-24 mt-2 rounded bg-slate-400"></div>
              <div className="w-24 mx-2 h-24 mt-2 rounded bg-slate-400"></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DetailPlaceholder;
