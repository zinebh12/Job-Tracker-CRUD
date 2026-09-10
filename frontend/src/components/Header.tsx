import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import type { ToastState } from "@/types/applications";
const Header = ({
  onOpen,
  setToast,
}: {
  onOpen: () => void;
  setToast: React.Dispatch<React.SetStateAction<ToastState>>;
}) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
      setToast({
        type: "success",
        message: "Logged out successfully!",
      });
      navigate("/register");
    } catch (error) {
      setToast({
        type: "error",
        message: error instanceof Error ? error.message : "Failed to log out.",
      });
    }
  };
  return (
    <div className="flex w-full gap-4 border-b border-sage bg-white px-4 py-4 flex-row items-center justify-between sm:px-6 sm:py-5">
      <h1 className="font-display text-3xl text-deep-forest sm:text-4xl lg:text-5xl">
        Hunter.
      </h1>
      <div className="flex items-center gap-2 sm:w-auto">
        <button
          type="button"
          onClick={onOpen}
          className="flex min-w-0 cursor-pointer items-center justify-center gap-2 rounded-lg bg-forest px-3 py-3 text-sm text-white transition hover:bg-deep-forest active:scale-95 sm:flex-none sm:px-4 sm:py-2.5"
        >
          <FontAwesomeIcon icon={faPlus} className="text-xs sm:text-sm" />
          <span className="hidden sm:inline"> New Application </span>
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className="flex shrink-0 cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 hover:text-red-700 active:scale-95 sm:px-4 sm:py-2.5"
        >
          <FontAwesomeIcon
            icon={faRightFromBracket}
            className="text-xs sm:text-sm"
          />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Header;
