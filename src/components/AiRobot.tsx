
import { useEffect, useRef } from "react";

interface AiRobotProps {
  className?: string;
}

const AiRobot: React.FC<AiRobotProps> = ({ className = "" }) => {
  const robotRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    const robot = robotRef.current;
    if (!robot) return;
    
    // Simple animation effect
    const bounceInterval = setInterval(() => {
      robot.style.transform = "translateY(-3px)";
      setTimeout(() => {
        if (robot) robot.style.transform = "translateY(0)";
      }, 300);
    }, 2000);
    
    return () => clearInterval(bounceInterval);
  }, []);

  return (
    <svg
      ref={robotRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      className={`${className} transition-transform duration-300`}
    >
      {/* Robot head */}
      <rect x="16" y="8" width="32" height="24" rx="4" fill="#0EA5E9" />
      
      {/* Robot face */}
      <circle cx="24" cy="18" r="3" fill="#f8f8f8" />
      <circle cx="40" cy="18" r="3" fill="#f8f8f8" />
      <rect x="24" y="26" width="16" height="2" rx="1" fill="#f8f8f8" />
      
      {/* Robot body */}
      <rect x="20" y="32" width="24" height="18" rx="2" fill="#0EA5E9" opacity="0.8" />
      
      {/* Robot arms */}
      <rect x="8" y="34" width="12" height="4" rx="2" fill="#0EA5E9" opacity="0.7" />
      <rect x="44" y="34" width="12" height="4" rx="2" fill="#0EA5E9" opacity="0.7" />
      
      {/* Robot legs */}
      <rect x="24" y="50" width="6" height="10" rx="2" fill="#0EA5E9" opacity="0.9" />
      <rect x="34" y="50" width="6" height="10" rx="2" fill="#0EA5E9" opacity="0.9" />
      
      {/* Robot antenna */}
      <line x1="32" y1="4" x2="32" y2="8" stroke="#0EA5E9" strokeWidth="2" />
      <circle cx="32" cy="3" r="2" fill="#0FA0CE" />
    </svg>
  );
};

export default AiRobot;
