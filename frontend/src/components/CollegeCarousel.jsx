import React, { useRef, useEffect } from "react";

const CollegeCarousel = () => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
        if (
          carouselRef.current.scrollLeft + carouselRef.current.clientWidth >=
          carouselRef.current.scrollWidth
        ) {
          carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
    }, 3000); // Auto-scroll every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mt-6 w-full overflow-hidden">
      <div
        ref={carouselRef}
        className="flex space-x-4 p-4 overflow-x-scroll scrollbar-hide w-full"
      >
        <img src="/imag1.jpg" alt="Campus 1" className="w-[300px] h-40 object-cover rounded-lg" />
        <img src="/img2.jpg" alt="Campus 2" className="w-[300px] h-40 object-cover rounded-lg" />
        <img src="/img3.jpg" alt="Campus 3" className="w-[300px] h-40 object-cover rounded-lg" />
        <img src="/img4.jpg" alt="Campus 4" className="w-[300px] h-40 object-cover rounded-lg" />
        <img src="/img5.jpg" alt="Campus 5" className="w-[300px] h-40 object-cover rounded-lg" />
        <img src="/img6.jpg" alt="Campus 6" className="w-[300px] h-40 object-cover rounded-lg" />
        <img src="/img7.jpg" alt="Campus 7" className="w-[300px] h-40 object-cover rounded-lg" />
        <img src="/img8.jpg" alt="Campus 8" className="w-[300px] h-40 object-cover rounded-lg" />
      </div>
    </section>
  );
};

export default CollegeCarousel;
