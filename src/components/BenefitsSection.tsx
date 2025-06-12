
import { useEffect, useRef } from "react";

const BenefitsSection = () => {
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

  const contractorBenefits = [
    {
      title: "Zero Upfront Cost",
      description:
        "Submit bids for free and only pay a small connection fee when you win the job.",
      icon: (
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
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
    },
    {
      title: "Focus on Craft",
      description:
        "Be a contractor, not a digital marketer. Focus on what you do best.",
      icon: (
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
          <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
    },
    {
      title: "Build Your Business",
      description:
        "Grow without crushing acquisition costs that eat away at your profits.",
      icon: (
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
          <path d="M2 20h.01" />
          <path d="M7 20v-4" />
          <path d="M12 20v-8" />
          <path d="M17 20V8" />
          <path d="M22 4v16" />
        </svg>
      ),
    },
    {
      title: "Handshake Economy",
      description:
        "Return to community-based business backed by modern technology.",
      icon: (
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
          <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
        </svg>
      ),
    },
  ];

  const homeownerBenefits = [
    {
      title: "Save 10-20%",
      description:
        "Eliminate the hidden markups from corporate middlemen on your projects.",
      icon: (
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
          <path d="M21 6H3" />
          <path d="M16 6V4c0-1-1-2-2-2h-4C9 2 8 3 8 4v2" />
          <path d="M10 16l2-2 2 2" />
          <path d="M12 14v6" />
          <path d="M8.2 9.3l2.8 3.2" />
          <path d="M15.8 9.3l-2.8 3.2" />
          <path d="M3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6" />
        </svg>
      ),
    },
    {
      title: "Keep Money Local",
      description:
        "Support local businesses instead of enriching distant corporations.",
      icon: (
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
          <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
          <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
          <path d="M12 3v6" />
        </svg>
      ),
    },
    {
      title: "Transparent Bids",
      description:
        "Get qualified bids without the spam or pressure tactics.",
      icon: (
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
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
    {
      title: "Support Small Business",
      description:
        "Enable local entrepreneurs to thrive without corporate exploitation.",
      icon: (
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
          <rect width="8" height="8" x="8" y="8" rx="2" />
          <path d="M12 2v6" />
          <path d="M12 16v6" />
          <path d="M2 12h6" />
          <path d="M16 12h6" />
        </svg>
      ),
    },
  ];

  return (
    <section id="benefits" className="bg-instabids-darkBlue py-20">
      <div className="section-container">
        <div
          ref={(el) => (elementsRef.current[0] = el)}
          className="animate-on-scroll text-center mb-16"
        >
          <h2 className="mb-6">
            <span className="text-gradient">Benefits</span> for Everyone
          </h2>
          <p className="text-xl text-instabids-lightGray max-w-3xl mx-auto">
            InstaBids creates a win-win ecosystem where both homeowners and
            contractors thrive without corporate interference
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contractor Benefits */}
          <div
            ref={(el) => (elementsRef.current[1] = el)}
            className="animate-on-scroll"
          >
            <div className="bg-instabids-dark/60 backdrop-blur-sm border border-instabids-teal/20 rounded-xl p-8">
              <h3 className="text-2xl font-heading mb-8 text-center">
                <span className="text-gradient">For Contractors</span>
              </h3>

              <div className="space-y-6">
                {contractorBenefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="benefit-card flex items-start gap-4"
                  >
                    <div className="p-2 bg-instabids-teal/10 rounded-lg mt-1">
                      {benefit.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-heading mb-2">
                        {benefit.title}
                      </h4>
                      <p className="text-instabids-lightGray">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-5 bg-instabids-darker/70 rounded-lg border border-instabids-teal/10">
                <p className="text-lg font-medium mb-2 text-white">
                  Ready to focus on your craft again?
                </p>
                <p className="text-instabids-lightGray">
                  Join InstaBids and build a sustainable contracting business
                  without the crushing burden of marketing costs.
                </p>
              </div>
            </div>
          </div>

          {/* Homeowner Benefits */}
          <div
            ref={(el) => (elementsRef.current[2] = el)}
            className="animate-on-scroll"
          >
            <div className="bg-instabids-dark/60 backdrop-blur-sm border border-instabids-teal/20 rounded-xl p-8">
              <h3 className="text-2xl font-heading mb-8 text-center">
                <span className="text-gradient">For Homeowners</span>
              </h3>

              <div className="space-y-6">
                {homeownerBenefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="benefit-card flex items-start gap-4"
                  >
                    <div className="p-2 bg-instabids-teal/10 rounded-lg mt-1">
                      {benefit.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-heading mb-2">
                        {benefit.title}
                      </h4>
                      <p className="text-instabids-lightGray">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-5 bg-instabids-darker/70 rounded-lg border border-instabids-teal/10">
                <p className="text-lg font-medium mb-2 text-white">
                  Stop overpaying for home services
                </p>
                <p className="text-instabids-lightGray">
                  With InstaBids, you'll save money while keeping your dollars in
                  your local community.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Economic Revolution Statement */}
        <div
          ref={(el) => (elementsRef.current[3] = el)}
          className="animate-on-scroll mt-16 max-w-4xl mx-auto bg-gradient-to-br from-instabids-darkBlue/90 to-instabids-dark/90 p-8 rounded-xl border border-instabids-teal/30 shadow-lg"
        >
          <h3 className="text-2xl md:text-3xl font-heading text-center mb-6">
            Our Stand
          </h3>
          <p className="text-lg text-instabids-lightGray leading-relaxed text-center">
            It's 2025. There is no justification for the corporate greed that
            has been choking out American entrepreneurship and taxing homeowners
            simply to make introductions. InstaBids stands for a return to
            community-centered commerce, where technology serves people rather
            than exploits them.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
