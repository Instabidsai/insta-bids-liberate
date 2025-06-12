
import { useEffect, useRef } from "react";

const ProblemSection = () => {
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = elementsRef.current;
    elements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      elements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section id="problem" className="bg-instabids-dark py-20">
      <div className="section-container">
        <div
          ref={(el) => (elementsRef.current[0] = el)}
          className="animate-on-scroll text-center mb-16 opacity-0 transform translate-y-4"
        >
          <h2 className="mb-6">
            <span className="text-gradient">Corporate America</span> Has
            Strangled Small Business
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg md:text-xl text-white leading-relaxed">
              Today's reality: starting a contracting business requires mastering
              marketing skills that even business school graduates struggle
              with—let alone skilled tradespeople who excel at their craft.
            </p>
            <div className="mt-6 bg-instabids-darkBlue/50 border border-red-500/30 p-6 rounded-lg">
              <p className="text-2xl md:text-3xl font-bold text-red-400 mb-3">
                Corporations have extracted $375 billion
              </p>
              <p className="text-lg text-white">
                last year from local economies to simply connect buyers and sellers
              </p>
            </div>
          </div>
        </div>

        <div
          ref={(el) => (elementsRef.current[1] = el)}
          className="animate-on-scroll opacity-0 transform translate-y-4"
        >
          <div className="relative max-w-4xl mx-auto">
            {/* Money Flow Diagram */}
            <div className="grid md:grid-cols-3 gap-6 items-center">
              {/* Local Community */}
              <div className="bg-instabids-darkBlue/70 rounded-lg p-6 text-center border border-instabids-teal/20 transition-transform duration-300 hover:transform hover:-translate-y-2">
                <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center bg-instabids-dark/50 rounded-full border border-instabids-teal/30">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </div>
                <h4 className="font-heading text-xl mb-2 text-white">Local Communities</h4>
                <p className="text-white">
                  Homeowners pay higher prices
                </p>
              </div>

              {/* Arrows */}
              <div className="flex justify-center items-center">
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="30"
                    viewBox="0 0 100 30"
                    className="text-instabids-teal"
                  >
                    <path
                      d="M0 15 L90 15 L80 5 L90 15 L80 25 Z"
                      fill="currentColor"
                      className="animate-pulse"
                    />
                  </svg>
                  <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 text-center w-[200px]">
                    <p className="text-2xl md:text-3xl font-bold text-red-400">
                      $300-$3,000 per job
                    </p>
                    <p className="text-sm text-white">
                      The average cost contractors pay to simply meet a neighbor
                    </p>
                    <p className="text-sm font-bold text-instabids-teal mt-1">
                      This ends today with you
                    </p>
                  </div>
                </div>
              </div>

              {/* Corporate Platforms */}
              <div className="bg-instabids-darkBlue/70 rounded-lg p-6 text-center border border-red-500/30 transition-transform duration-300 hover:transform hover:-translate-y-2">
                <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center bg-instabids-dark/50 rounded-full border border-red-500/30">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-red-500"
                  >
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                </div>
                <h4 className="font-heading text-xl mb-2 text-white">Corporate Platforms</h4>
                <p className="text-white">
                  Extracting wealth from communities
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="bg-instabids-darkBlue/40 border border-instabids-teal/20 p-4 rounded-lg text-center transition-transform duration-300 hover:transform hover:-translate-y-2">
                <p className="text-4xl font-bold text-instabids-teal mb-2">90%</p>
                <p className="text-white text-sm">
                  Reducing Customer Acquisition Cost
                </p>
              </div>
              <div className="bg-instabids-darkBlue/40 border border-instabids-teal/20 p-4 rounded-lg text-center transition-transform duration-300 hover:transform hover:-translate-y-2">
                <p className="text-4xl font-bold text-instabids-teal mb-2">$3K</p>
                <p className="text-white text-sm">
                  Max Customer Acquisition Cost
                </p>
              </div>
              <div className="bg-instabids-darkBlue/40 border border-instabids-teal/20 p-4 rounded-lg text-center transition-transform duration-300 hover:transform hover:-translate-y-2">
                <p className="text-4xl font-bold text-instabids-teal mb-2">10-20%</p>
                <p className="text-white text-sm">
                  Price Inflation for Homeowners
                </p>
              </div>
              <div className="bg-instabids-darkBlue/40 border border-instabids-teal/20 p-4 rounded-lg text-center transition-transform duration-300 hover:transform hover:-translate-y-2">
                <p className="text-4xl font-bold text-instabids-teal mb-2">0%</p>
                <p className="text-white text-sm">
                  Value Added by Middlemen
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
