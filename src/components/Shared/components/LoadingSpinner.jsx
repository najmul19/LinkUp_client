import { Loader2 } from "lucide-react";

const LoadingSpinner = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-blue-600">
      <Loader2 className="h-10 w-10 animate-spin mb-3" />
      <p className="text-lg font-semibold">{text}</p>
    </div>
  );
};

export default LoadingSpinner;