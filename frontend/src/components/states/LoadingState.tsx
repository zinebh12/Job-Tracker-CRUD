import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
const LoadingState = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-sage-light font-manrope">
      <div className="flex items-center gap-3 text-forest">
        <FontAwesomeIcon icon={faSpinner} className="animate-spin text-lg" />
        <span className="text-sm font-medium">Loading applications...</span>
      </div>
    </div>
  );
};

export default LoadingState;
