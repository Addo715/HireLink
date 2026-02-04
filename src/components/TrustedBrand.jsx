const TrustedBrand = () => {
    const companyLogos = ["slack", "framer", "netflix", "google", "linkedin", "instagram", "facebook"];

    return (
        <>
            <style>{`
                .marquee-inner {
                    animation: marqueeScroll linear infinite;
                }

                @keyframes marqueeScroll {
                    0% {
                        transform: translateX(0%);
                    }

                    100% {
                        transform: translateX(-50%);
                    }
                }
            `}</style>

              
              {/* <div> */}
                <h3 className="text-base text-center text-slate-400 pb-14 font-medium">
                Trusting by leading brands, including 
            </h3>
              {/* </div> */}
            <div className="overflow-hidden w-full relative max-w-5xl mx-auto select-none mb-10">
                <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-linear-to-r from-white to-transparent" />
                <div className="marquee-inner flex will-change-transform min-w-[200%]" style={{ animationDuration: "15s" }}>
                    <div className="flex">
                        {[...companyLogos, ...companyLogos].map((company, index) => (
                            <img key={index} src={`https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/${company}.svg`}
                                alt={company} className="w-full h-full object-cover mx-6" draggable={false} />
                        ))}
                    </div>
                </div>
                <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-linear-to-l from-white to-transparent" />
            </div>
        </>
    );
}

export default TrustedBrand