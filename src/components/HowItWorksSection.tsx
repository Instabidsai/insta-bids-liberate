
import { useEffect, useRef } from "react";

const HowItWorksSection = () => {
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

  const steps = [
    {
      title: "Post Your Project",
      description:
        "Homeowners describe their project and InstaBids AI helps classify and detail it correctly",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-instabids-teal"
        >
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="12" x2="12" y1="18" y2="12" />
          <line x1="9" x2="15" y1="15" y2="15" />
        </svg>
      ),
    },
    {
      title: "Receive Multiple Bids",
      description:
        "Qualified local contractors submit transparent bids for your project",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-instabids-teal"
        >
          <path d="M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" />
          <path d="M9 22h9a2 2 0 0 0 2-2v-7" />
          <path d="M13 6v4" />
          <path d="M17 6v4" />
          <circle cx="17" cy="15" r="3" />
          <path d="m21 19-4.5-4.5" />
        </svg>
      ),
    },
    {
      title: "Select and Connect",
      description:
        "Choose the best contractor for your project and connect directly",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-instabids-teal"
        >
          <path d="M17 6.1H3" />
          <path d="M21 12.1H3" />
          <path d="M15.1 18H3" />
          <path d="m20 18-3-3 3-3" />
        </svg>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="bg-instabids-dark py-20 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 bg-hero-pattern"></div>

      <div className="section-container relative z-10">
        <div
          ref={(el) => (elementsRef.current[0] = el)}
          className="animate-on-scroll text-center mb-16"
        >
          <h2 className="mb-6">
            How <span className="text-gradient">InstaBids</span> Works
          </h2>
          <p className="text-xl text-instabids-lightGray max-w-3xl mx-auto">
            A simple, straightforward process that puts power back in the hands
            of homeowners and contractors
          </p>
        </div>

        <div
          ref={(el) => (elementsRef.current[1] = el)}
          className="animate-on-scroll"
        >
          {/* Process steps */}
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-instabids-darkBlue/50 backdrop-blur-sm border border-instabids-teal/20 rounded-xl p-8 text-center relative"
              >
                {/* Step number */}
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-r from-instabids-teal to-instabids-turquoise flex items-center justify-center">
                  <span className="font-bold text-white">{index + 1}</span>
                </div>

                {/* Step icon */}
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-instabids-dark/60 border border-instabids-teal/30 flex items-center justify-center">
                  {step.icon}
                </div>

                <h3 className="text-2xl font-heading mb-4">{step.title}</h3>
                <p className="text-instabids-lightGray">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Connector lines between steps (visible on desktop) */}
          <div className="hidden md:block">
            {/* First connector */}
            <div className="absolute top-1/2 left-1/3 transform -translate-y-1/2 -translate-x-12 w-24 h-px bg-instabids-teal/30"></div>
            
            {/* Second connector */}
            <div className="absolute top-1/2 left-2/3 transform -translate-y-1/2 -translate-x-12 w-24 h-px bg-instabids-teal/30"></div>
          </div>

          {/* Technology Statement */}
          <div
            ref={(el) => (elementsRef.current[2] = el)}
            className="animate-on-scroll mt-20 max-w-3xl mx-auto bg-instabids-darkBlue/40 border border-instabids-teal/20 p-8 rounded-xl"
          >
            <h3 className="text-2xl md:text-3xl font-heading text-center mb-6">
              <span className="text-gradient">It's 2025.</span> The Technology
              Exists.
            </h3>
            <p className="text-instabids-lightGray mb-8">
              Our AI technology performs functions that previously required
              entire corporations, but without the markup. We're using advanced
              AI agents to directly connect homeowners and contractors,
              eliminating the need for expensive marketing campaigns,
              lead-generation services, and corporate platforms that extract up
              to 90% in fees.
            </p>

            {/* Technology diagram */}
            <div className="bg-instabids-dark/60 rounded-xl p-6 border border-instabids-teal/10">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto rounded-full bg-instabids-dark border border-instabids-teal/30 flex items-center justify-center mb-3">
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
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                  </div>
                  <p className="font-medium">Homeowners</p>
                </div>

                <div className="hidden md:block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="60"
                    height="24"
                    viewBox="0 0 60 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-instabids-teal"
                  >
                    <line x1="5" y1="12" x2="55" y2="12"></line>
                    <polyline points="45 5 55 12 45 19"></polyline>
                  </svg>
                </div>

                <div className="text-center">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-instabids-teal to-instabids-turquoise flex items-center justify-center mb-3">
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
                      className="text-white"
                    >
                      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"></path>
                      <path d="M12 8v4"></path>
                      <path d="M12 16h.01"></path>
                    </svg>
                  </div>
                  <p className="font-medium">InstaBids AI</p>
                </div>

                <div className="hidden md:block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="60"
                    height="24"
                    viewBox="0 0 60 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-instabids-teal"
                  >
                    <line x1="5" y1="12" x2="55" y2="12"></line>
                    <polyline points="45 5 55 12 45 19"></polyline>
                  </svg>
                </div>

                <div className="text-center">
                  <div className="w-20 h-20 mx-auto rounded-full bg-instabids-dark border border-instabids-teal/30 flex items-center justify-center mb-3">
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
                      <rect width="8" height="8" x="8" y="8" rx="2"></rect>
                      <path d="M12 2v6"></path>
                      <path d="M12 16v6"></path>
                      <path d="M2 12h6"></path>
                      <path d="M16 12h6"></path>
                    </svg>
                  </div>
                  <p className="font-medium">Contractors</p>
                </div>
              </div>

              <p className="text-center text-instabids-gray mt-6">
                No corporate middlemen. No excessive fees. Just Americans helping
                Americans.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
