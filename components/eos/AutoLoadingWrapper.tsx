import { ReactNode, useState } from "react";
import Spinner from "../spinners/Spinner";

type AutoLoadingWrapperProps = {
    children: (setLoading: (val: boolean) => void) => ReactNode;
};

export const AutoLoadingWrapper = ({ children }: AutoLoadingWrapperProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative">
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          isLoading ? "opacity-100" : "opacity-0"
        }`}
      >
        <Spinner />
      </div>
      {children(setIsLoading)}
    </div>
  );
};