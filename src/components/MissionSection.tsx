
import { useEffect, useRef } from "react";
import Button from "./Button";

const MissionSection = () => {
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
    <section
      id="mission"
      ref={sectionRef}
      className="bg-instabids-darkBlue py-24 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute w-96 h-96 bg-instabids-teal/10 rounded-full blur-3xl -top-24 -right-24"></div>
      <div className="absolute w-96 h-96 bg-instabids-turquoise/10 rounded-full blur-3xl -bottom-24 -left-24"></div>

      <div className="section-container relative z-10">
        <div
          ref={(el) => (elementsRef.current[0] = el)}
          className="animate-on-scroll text-center mb-16"
        >
          <h2 className="mb-6">
            <span className="text-gradient">Reclaiming</span> the American Dream
          </h2>
        </div>

        <div
          ref={(el) => (elementsRef.current[1] = el)}
          className="animate-on-scroll max-w-4xl mx-auto bg-instabids-dark/50 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-instabids-teal/20 shadow-xl"
        >
          <p className="text-lg md:text-xl text-instabids-lightGray leading-relaxed mb-6">
            InstaBids is leveraging cutting-edge technology to return power to
            Americans—not to replace them. We're collapsing the barrier to entry
            for small business ownership to nearly zero.
          </p>

          <p className="text-lg md:text-xl text-instabids-lightGray leading-relaxed mb-6">
            With InstaBids, contractors land their first jobs with just a small
            connection fee paid only after a homeowner has selected their bid. We
            believe homeowners shouldn't unknowingly subsidize excessive customer
            acquisition costs.
          </p>

          <p className="text-lg md:text-xl text-instabids-lightGray leading-relaxed mb-8">
            We believe contractors should be contractors—focused on their craft
            rather than becoming unwilling digital marketers. We believe that
            local dollars should stay in local communities.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="text-center p-6 bg-instabids-darkBlue/50 rounded-xl border border-instabids-teal/30">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-instabids-teal/20 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-instabids-teal"
                >
                  <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                </svg>
              </div>
              <h4 className="text-xl font-heading mb-2">Community First</h4>
              <p className="text-instabids-lightGray">
                Keeping dollars in your local economy
              </p>
            </div>
            
            <div className="text-center p-6 bg-instabids-darkBlue/50 rounded-xl border border-instabids-teal/30">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-instabids-teal/20 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-instabids-teal"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M12 8v8" />
                  <path d="M8 12h8" />
                </svg>
              </div>
              <h4 className="text-xl font-heading mb-2">Zero Upfront Cost</h4>
              <p className="text-instabids-lightGray">
                No fees until a homeowner selects your bid
              </p>
            </div>
            
            <div className="text-center p-6 bg-instabids-darkBlue/50 rounded-xl border border-instabids-teal/30">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-instabids-teal/20 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-instabids-teal"
                >
                  <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                  <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                </svg>
              </div>
              <h4 className="text-xl font-heading mb-2">Direct Connections</h4>
              <p className="text-instabids-lightGray">
                No corporate platforms between you and customers
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg">Join Our Mission</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
