import { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqsData = [
    {
      question: "How does HireLink work?",
      answer:
        "HireLink connects job seekers with verified employers. Browse job listings, apply directly, and track your applications in one place.",
    },
    {
      question: "Is HireLink free for job seekers?",
      answer:
        "Yes. Creating a profile, browsing jobs, and applying for positions on HireLink is completely free for job seekers.",
    },
    {
      question: "Can I apply for multiple jobs?",
      answer:
        "Absolutely. You can apply to as many jobs as you like and manage all your applications from your dashboard.",
    },
    {
      question: "Are employers verified?",
      answer:
        "We review employer profiles to help ensure job listings are legitimate and trustworthy.",
    },
    {
      question: "Can I find remote jobs on HireLink?",
      answer:
        "Yes. HireLink features on-site, hybrid, and remote job opportunities across different industries.",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

        * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>

      <div className="bg-gray-100 pt-10 pb-10">
        <div className="flex flex-col items-center text-center text-slate-800 px-3">
          <p className="text-base font-medium text-slate-600">FAQ</p>

          <h1 className="text-3xl md:text-4xl font-semibold mt-2">
            Job Seeker Questions, Answered
          </h1>

          <p className="text-sm text-slate-500 mt-4 max-w-sm">
            Everything you need to know about finding and applying for jobs on
            HireLink.
          </p>

          <div className="max-w-xl w-full mt-6 flex flex-col gap-4 items-start text-left">
            {faqsData.map((faq, index) => (
              <div key={index} className="flex flex-col items-start w-full">
                <div
                  className="flex items-center justify-between w-full cursor-pointer bg-slate-50 border border-slate-200 p-4 rounded"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                >
                  <h2 className="text-sm">{faq.question}</h2>

                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`${openIndex === index ? "rotate-180" : ""} transition-all duration-500 ease-in-out`}
                  >
                    <path
                      d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2"
                      stroke="#1D293D"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <p
                  className={`text-sm text-slate-500 px-4 transition-all duration-500 ease-in-out ${
                    openIndex === index
                      ? "opacity-100 max-h-75 translate-y-0 pt-4"
                      : "opacity-0 max-h-0 -translate-y-2"
                  }`}
                >
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;
