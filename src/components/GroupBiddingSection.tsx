
import React, { useEffect, useRef } from "react";

const GroupBiddingSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
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
    <section id="group-bidding" className="bg-gradient-to-b from-instabids-darkBlue to-instabids-dark py-20 relative overflow-hidden">
      <div className="section-container">
        <div
          ref={(el) => (elementsRef.current[0] = el)}
          className="animate-on-scroll text-center mb-12"
        >
          <h2 className="text-gradient mb-6">Group Bidding Revolution</h2>
          <p className="text-white text-lg md:text-xl max-w-3xl mx-auto">
            Homeowners can now leverage collective buying power by grouping similar jobs together,
            driving costs down through efficiency while contractors gain access to multiple projects at once.
          </p>
        </div>

        <div
          ref={(el) => (elementsRef.current[1] = el)}
          className="animate-on-scroll grid md:grid-cols-3 gap-8 mt-12"
        >
          <div className="bg-instabids-darkBlue/70 backdrop-blur p-6 rounded-lg border border-instabids-teal/20 shadow-lg">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-instabids-dark/50 rounded-full border border-instabids-teal/30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-instabids-teal"
              >
                <path d="M7 21h10" />
                <rect x="1" y="3" width="22" height="14" rx="6" />
                <circle cx="9" cy="10" r="2" />
                <circle cx="15" cy="10" r="2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">Reduce Costs by 90%</h3>
            <p className="text-white">
              Cut customer acquisition costs dramatically by eliminating expensive middlemen and marketing campaigns
            </p>
          </div>

          <div className="bg-instabids-darkBlue/70 backdrop-blur p-6 rounded-lg border border-instabids-teal/20 shadow-lg">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-instabids-dark/50 rounded-full border border-instabids-teal/30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-instabids-teal"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">Single Meeting Efficiency</h3>
            <p className="text-white">
              Eliminate multiple sales meetings per project with our streamlined bidding process
            </p>
          </div>

          <div className="bg-instabids-darkBlue/70 backdrop-blur p-6 rounded-lg border border-instabids-teal/20 shadow-lg">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-instabids-dark/50 rounded-full border border-instabids-teal/30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-instabids-teal"
              >
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                <path d="M12 7v14" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">Neighborhood Grouping</h3>
            <p className="text-white">
              Group similar local projects together, allowing contractors to bid on multiple jobs at once
            </p>
          </div>
        </div>

        <div
          ref={(el) => (elementsRef.current[2] = el)}
          className="animate-on-scroll mt-12"
        >
          <div className="bg-instabids-darkBlue/40 border border-instabids-teal/30 rounded-lg p-6 max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-white text-center">How Group Bidding Works</h3>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-instabids-teal/20 border border-instabids-teal/40 flex items-center justify-center mx-auto mb-3">
                  <span className="text-instabids-teal font-bold text-xl">1</span>
                </div>
                <p className="text-white">Homeowners post similar projects in the same area</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-instabids-teal/20 border border-instabids-teal/40 flex items-center justify-center mx-auto mb-3">
                  <span className="text-instabids-teal font-bold text-xl">2</span>
                </div>
                <p className="text-white">InstaBids AI groups compatible projects together</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-instabids-teal/20 border border-instabids-teal/40 flex items-center justify-center mx-auto mb-3">
                  <span className="text-instabids-teal font-bold text-xl">3</span>
                </div>
                <p className="text-white">Contractors bid on multiple projects at once with volume discounts</p>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-instabids-teal font-semibold">
                Restart the American small business dream by unlocking unprecedented efficiency
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GroupBiddingSection;
