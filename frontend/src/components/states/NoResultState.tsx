import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
export const NoResultState = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl bg-white px-6 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sage-light text-forest">
        <FontAwesomeIcon icon={faBriefcase} className="text-xl" />
      </div>

      <h2 className="text-lg font-semibold text-deep-forest">
        No applications found
      </h2>

      <p className="mt-1 max-w-sm text-sm text-forest/60">
        No applications match your current search or filters.
      </p>
    </div>
  );
};
