import Maximize from "./icons/maximize-icon.svg";
import Minus from "./icons/minus-icon.svg";
import Close from "./icons/close-icon.svg";

export const LayoutHeaderDesktop = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="text-gray-400 px-4 text-sm">
        Simple money manager v0.0.12
      </div>
      <div className="flex">
        <div className="p-3 px-4 text-gray-600 hover:text-white hover:bg-gray-400">
          <Minus className=" w-3 h-3" />
        </div>
        <div className="p-3 px-4 text-gray-600 hover:text-white hover:bg-gray-400">
          <Maximize className=" w-3 h-3" />
        </div>
        <div className="p-3 px-4 text-gray-600 hover:text-white hover:bg-red-800">
          <Close className=" w-3 h-3" />
        </div>
      </div>
    </div>
  );
};
