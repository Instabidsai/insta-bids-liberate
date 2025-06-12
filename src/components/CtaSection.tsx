
import { useState } from "react";
import Button from "./Button";

const CtaSection = () => {
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState<"contractor" | "homeowner" | null>(
    null
  );
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send data to a backend
    // For now, just simulate success
    setSubmitted(true);
  };

  return (
    <section className="bg-gradient-to-b from-instabids-darkBlue to-instabids-dark py-20">
      <div className="section-container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-6">
            Join the <span className="text-gradient">Economic Revival</span>
          </h2>
          <p className="text-xl text-instabids-lightGray mb-12">
            We're not just building a platform—we're fueling an economic revival
            that puts prosperity back within reach for everyday Americans.
          </p>

          {!submitted ? (
            <div className="bg-instabids-darkBlue/50 backdrop-blur-sm border border-instabids-teal/20 rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-heading mb-6">
                Be part of the revolution
              </h3>
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="mb-6">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="w-full bg-instabids-dark border border-instabids-teal/30 rounded-md px-4 py-3 text-white placeholder-instabids-gray focus:outline-none focus:ring-2 focus:ring-instabids-teal"
                  />
                </div>

                <div className="mb-8">
                  <div className="text-left mb-2 text-instabids-lightGray">
                    I am a:
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      className={`py-3 px-4 border rounded-md transition-all ${
                        userType === "contractor"
                          ? "bg-instabids-teal text-white border-instabids-teal"
                          : "bg-transparent text-instabids-lightGray border-instabids-teal/30 hover:border-instabids-teal/60"
                      }`}
                      onClick={() => setUserType("contractor")}
                    >
                      Contractor
                    </button>
                    <button
                      type="button"
                      className={`py-3 px-4 border rounded-md transition-all ${
                        userType === "homeowner"
                          ? "bg-instabids-teal text-white border-instabids-teal"
                          : "bg-transparent text-instabids-lightGray border-instabids-teal/30 hover:border-instabids-teal/60"
                      }`}
                      onClick={() => setUserType("homeowner")}
                    >
                      Homeowner
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  fullWidth
                  disabled={!email || !userType}
                >
                  Join Now
                </Button>

                <p className="mt-4 text-sm text-instabids-gray">
                  By joining, you agree to receive updates about InstaBids. We
                  respect your privacy and will never share your information.
                </p>
              </form>
            </div>
          ) : (
            <div className="bg-instabids-darkBlue/50 backdrop-blur-sm border border-instabids-teal/20 rounded-xl p-8 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-instabids-teal mx-auto mb-6"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <h3 className="text-2xl font-heading mb-4">Thank you!</h3>
              <p className="text-lg text-instabids-lightGray mb-8">
                You're now part of the economic revolution. We'll keep you
                updated on our launch and how you can get involved.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSubmitted(false);
                  setEmail("");
                  setUserType(null);
                }}
              >
                Sign up another account
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
