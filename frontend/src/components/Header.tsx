import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
const Header = ({ onOpen }: { onOpen: () => void }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
    navigate("/register");
  };
  return (
    <div className="flex w-full items-center justify-between gap-4 border-b border-sage bg-white px-4 py-4 sm:px-6 sm:py-5">
      <h1 className="font-display text-3xl text-deep-forest sm:text-4xl lg:text-5xl">
        Hunter.
      </h1>
      <button
        onClick={onOpen}
        className="flex shrink-0 cursor-pointer items-center gap-2 rounded-lg bg-forest px-3 py-2 text-sm text-white transition hover:bg-deep-forest sm:px-4 sm:py-2.5"
      >
        <FontAwesomeIcon icon={faPlus} className="text-xs sm:text-sm" />
        <span className="hidden sm:inline"> New Application </span>
        <span className="sm:hidden"> New </span>
      </button>
      <button onClick={handleLogout} >Logout</button>
    </div>
  );
};

export default Header;
