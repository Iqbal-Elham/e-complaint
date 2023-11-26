import React from 'react';
import bribe from '../assets/Bribe.jpg';
import { useTranslation } from 'react-i18next';

const AboutUs = () => {
  const {t} = useTranslation();
  const language = localStorage.getItem('selectedLanguage');
  const content = {
    fa: `این برنامه مبتنی بر وب به طور خاص طراحی شده است تا بستری ناشناس و
    راحت برای گزارش افراد فاسد را در اختیار افراد قرار دهد. هدف آن
    مبارزه با فساد از طریق توانمندسازی شهروندان برای افشای چنین فعالیت
    هایی بدون ترس از انتقام است. این برنامه به دو زبان رایج در کشور،
    یعنی پشتو و دری، برای اطمینان از دسترسی و فراگیری موجود است. یکی از
    ویژگی‌های کلیدی این وب‌سایت کاربرپسند، سادگی آن است که حتی برای
    افرادی با تحصیلات یا مهارت‌های فنی محدود قابل دسترسی است. رابط
    کاربری با دقت طراحی شده است تا بصری و آسان برای پیمایش باشد، و
    اطمینان حاصل شود که کاربران می توانند گزارش های خود را بدون زحمت
    ارسال کنند. هنگام استفاده از این برنامه مبتنی بر وب، کاربران این
    گزینه را دارند که گزارشی در مورد فردی که مظنون به درگیر شدن در
    فعالیت های فاسد است، ارسال کنند. علاوه بر این، آنها می‌توانند انواع
    مختلفی از فایل‌ها را برای حمایت از ادعاهای خود، مانند فیلم‌ها،
    ضبط‌های صوتی، یا تصاویر، که به عنوان شواهد ملموسی مبنی بر دخالت فرد
    در اعمال فاسد یا پذیرش رشوه عمل می‌کنند، ضمیمه کنند. هدف اصلی توسعه
    این وب‌سایت، ادغام فناوری در زندگی روزمره افراد است و به آن‌ها اجازه
    می‌دهد در دنیای مدرن که به سرعت در حال تحول است، آگاه و به‌روز
    بمانند.`,
    ps: `دا ویب-مبنی پروګرام په خاص ډول داسې ډیزاین شوی دی چې د یوې ناشناسه او آرام بستر په توګه د فاسدو کسانو راپور ورکولو لپاره خلکو ته وړاندې شي. دا هدف د فساد سره مبارزه دی له لارې د شهریانو وړتیا ورکول چې د داسې فعالیتونو په افشا کې بې وېرې وي. دا پروګرام په هېواد کې د دوو عامو ژبو، پشتو او دري، کې شتون لري ترڅو د لاسرسي او عمومیت ډاډمن کړي. د دې ویب‌پاڼې یوه کلیدي ځانګړتیا د دې سادګی دی چې حتی د محدود تعلیم یا تخنیکي مهارتونو لرونکو کسانو لپاره هم لاسرسی دی. د کاروونکي انٹرفیس په دقت سره ډیزاین شوی دی ترڅو بصري او د نیویګیشن لپاره آسان وي، او ډاډمن شي چې کاروونکي کولی شي خپل راپورونه پرته له ستونزې ولېږي. دا ویب-مبنی پروګرام کاروونکي کولی شي داسې کس په اړه راپور ورکړي چې په فاسد فعالیتونو کې د ښکېل کېدو په شک کې وي. علاوه پر دې، دوی کولی شي د خپلو دعواوو ملاتړ لپاره بېلابېل ډوله فایلونه ضمیمه کړي، لکه ویډیوګانې، آډیو ثبتونه، یا عکسونه، چې د فرد په فاسد عملونو یا رشوت ورکولو کې د لاس لرلو په توګه کار کوي. د دې ویب‌پاڼې پراختیا اصلي موخه د فناورۍ په ورځني ژوند کې د خلکو د ادغام کول دي او هغوی ته اجازه ورکوي چې په دې په سرعت بدلون کوونکي نړۍ کې خبر او تازه وساتي.`,
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] bg-gray-100 p-10">
      <div className="flex flex-col lg:flex-row justify-center items-center max-w-screen-xl bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          className="w-full h-72 xl:h-96 md:w-auto rounded-tl-xl rounded-bl-xl"
          src={bribe}
          alt="About Us"
        />
        <div className="p-8 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-semibold text-gray-800 w-3/4">
            {t('about')}
          </h2>
          <p className="mt-2 text-gray-600 w-3/4 text-justify">{content[language]?? content["fa"]}</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
