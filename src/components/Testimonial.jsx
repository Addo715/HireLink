const Testimonial = () => {
  const testimonials = [
    {
      image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
      name: "Briar Martin",
      role: "Frontend Developer",
      date: "April 20, 2025",
      message:
        "I landed my first remote developer role within two weeks. The job matches were incredibly accurate."
    },
    {
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
      name: "Avery Johnson",
      role: "Product Designer",
      date: "May 10, 2025",
      message:
        "This platform helped me discover companies I wouldn’t have found on traditional job boards."
    },
    {
      image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
      name: "Jordan Lee",
      role: "Data Analyst",
      date: "June 5, 2025",
      message:
        "Applying was straightforward and stress-free. I got interview calls faster than expected."
    },
    {
      image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60",
      name: "Sam Roberts",
      role: "Marketing Specialist",
      date: "June 18, 2025",
      message:
        "The platform focuses on quality roles, not spam listings. That made a huge difference."
    }
  ];

  const TestimonialCard = ({ item }) => (
    
    <div className="p-4 rounded-lg mx-4 shadow hover:shadow-lg transition-all duration-200 w-72 shrink-0 bg-white">
      <div className="flex gap-3 items-center">
        <img
          className="w-11 h-11 rounded-full object-cover"
          src={item.image}
          alt={item.name}
        />
        <div>
          <p className="font-medium text-gray-900">{item.name}</p>
          <span className="text-xs text-gray-500">{item.role}</span>
        </div>
      </div>

      <p className="text-sm py-4 text-gray-700 leading-relaxed">
        “{item.message}”
      </p>

      <p className="text-xs text-gray-400">{item.date}</p>
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        .marquee-inner {
          animation: marqueeScroll 25s linear infinite;
        }
      `}</style>
 <h1 className="text-center text-4xl font-bold text-gray-900 mt-5">Testimonials</h1>
            <p className="text-center text-gray-500 mt-1">
                We have collected some testimonials from our users. They are real people who have used our product.
            </p>
      <div className="w-full mx-auto max-w-5xl overflow-hidden relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-linear-to-r from-white to-transparent"></div>

        {/* Single scrolling row */}
        <div className="marquee-inner flex min-w-[200%] pt-10 pb-6">
          {[...testimonials, ...testimonials].map((item, index) => (
            <TestimonialCard key={index} item={item} />
          ))}
        </div>

        {/* Right fade */}
        <div className="absolute right-0 top-0 h-full w-20 z-10 pointer-events-none bg-linear-to-l from-white to-transparent"></div>
      </div>
    </>
  );
};

export default Testimonial;
