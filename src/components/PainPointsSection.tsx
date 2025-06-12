
import { useEffect, useRef } from "react";

const PainPointsSection = () => {
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
    <section className="bg-gradient-to-b from-instabids-dark to-instabids-darkBlue py-20">
      <div className="section-container">
        <div className="grid md:grid-cols-2 gap-12 items-stretch">
          {/* Contractors Pain Points */}
          <div
            ref={(el) => (elementsRef.current[0] = el)}
            className="animate-on-scroll bg-instabids-darkBlue/40 backdrop-blur p-8 rounded-2xl border border-instabids-teal/20 shadow-lg"
          >
            <h3 className="mb-6 text-center">
              <span className="text-gradient">Contractors:</span> Cornered,
              Extracted, and Underpaid
            </h3>
            <ul className="space-y-4">
              {[
                "Platforms extract maximum value while providing low-quality leads",
                "CAC often exceeds profit margins",
                "Small contractors can't afford sales reps, CRMs, or ad spend",
                "Forced into a race-to-the-bottom on pricing",
              ].map((point, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 p-3 bg-instabids-dark/40 rounded-lg"
                >
                  <div className="mt-0.5 bg-red-500/20 p-1 rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-red-500"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </div>
                  <span className="text-white">{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 p-4 bg-instabids-dark/60 rounded-lg border border-instabids-teal/10">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full bg-instabids-dark flex items-center justify-center border border-instabids-teal/30">
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
                    <path d="M20 7h-9" />
                    <path d="M14 17H5" />
                    <circle cx="17" cy="17" r="3" />
                    <circle cx="7" cy="7" r="3" />
                  </svg>
                </div>
                <h4 className="font-heading text-lg text-white">Contractor Testimony</h4>
              </div>
              <p className="italic text-white">
                "I spent over $2,000 on leads last month and only converted one
                job. These platforms take advantage of small businesses like
                mine, but I can't compete without them."
              </p>
            </div>
          </div>

          {/* Homeowners Pain Points */}
          <div
            ref={(el) => (elementsRef.current[1] = el)}
            className="animate-on-scroll bg-instabids-darkBlue/40 backdrop-blur p-8 rounded-2xl border border-instabids-teal/20 shadow-lg"
          >
            <h3 className="mb-6 text-center">
              <span className="text-gradient">Homeowners:</span> Overwhelmed,
              Confused, and Overcharged
            </h3>
            <ul className="space-y-4">
              {[
                "Unknowingly paying contractors' $300–$3,000 acquisition costs",
                "Flooded with unsolicited calls after requesting a single quote",
                "No transparent trust layer—reviews feel gamed",
                "Paying corporate America just to make introductions",
              ].map((point, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 p-3 bg-instabids-dark/40 rounded-lg"
                >
                  <div className="mt-0.5 bg-red-500/20 p-1 rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-red-500"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </div>
                  <span className="text-white">{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 p-4 bg-instabids-dark/60 rounded-lg border border-instabids-teal/10">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full bg-instabids-dark flex items-center justify-center border border-instabids-teal/30">
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
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
                <h4 className="font-heading text-lg text-white">Homeowner Testimony</h4>
              </div>
              <p className="italic text-white">
                "After requesting a quote online, I received over 20 calls in
                three days. Half the contractors seemed unprofessional, and the
                pricing was all over the place. It felt like a scam."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PainPointsSection;
