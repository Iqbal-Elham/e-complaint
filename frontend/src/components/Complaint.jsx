/* eslint-disable react/prop-types */
import { useTranslation } from 'react-i18next';
import bribe1 from '../assets/bribe.jpg';
import bribe2 from '../assets/bribe2.jpg';
import bribe3 from '../assets/Bribes.gif';

const Complaint = ({ complaint }) => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-center py-3 px-3 w-full">
      <div className="w-full p-4 md:p-8 shadow-2xl  bg-gradient-to-b from-blue-200 to-blue-100 rounded-md mt-12">
        <section className="py-20 overflow-hidden bg-white">
          <div className="flex justify-between px-4 py-4 mx-auto lg:py-8">
            <div className="flex flex-wrap justify-around">
              <div className="pb-6 mb-8 border-b border-gray-200">
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
                    {complaint?.name}
                  </p>
                  <p>
                    <span className="font-bold">
                      {t('complainer_phone')}: &nbsp;
                    </span>{' '}
                    {complaint?.phone_number}
                  </p>
                  <p>
                    <span className="font-bold">
                      {t('complainer_email')}: &nbsp;
                    </span>{' '}
                    {complaint?.email}
                  </p>
                </div>
              </div>

              <div className="w-full px-4 md:w-1/2">
                <div className="sticky top-0 z-50 overflow-hidden ">
                  <div className="relative mb-2 lg:mb-7 h-[450px]">
                    <img
                      src={bribe1}
                      alt=""
                      className="object-contain w-full h-full "
                    />
                  </div>
                  <div className="flex-wrap flex flex-col md:flex-row justify-center items-center">
                    <div className="w-1/2 p-2 sm:w-1/4">
                      <a
                        href="#"
                        className="block border border-blue-100 hover:border-blue-300 "
                      >
                        <img
                          src={bribe1}
                          alt=""
                          className="object-cover w-full lg:h-32"
                        />
                      </a>
                    </div>
                    <div className="w-1/2 p-2 sm:w-1/4">
                      <a
                        href="#"
                        className="block border border-blue-100 hover:border-blue-300"
                      >
                        <img
                          src={bribe2}
                          alt=""
                          className="object-cover w-full lg:h-32"
                        />
                      </a>
                    </div>
                    <div className="w-1/2 p-2 sm:w-1/4">
                      <a
                        href="#"
                        className="block border border-blue-100 hover:border-blue-300"
                      >
                        <img
                          src={bribe3}
                          alt=""
                          className="object-cover w-full lg:h-32"
                        />
                      </a>
                    </div>
                  </div>
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
