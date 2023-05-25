import { FC } from "react";
import Maximize from "./../icons/maximize-icon.svg";
import Minus from "./../icons/minus-icon.svg";
import Close from "./../icons/close-icon.svg";






export const Header : FC = () => {

    return(
        <div className="flex justify-between items-center">
            <div className="text-gray-600 px-4">
                Simple money manager v0.0.12
            </div>
            <div className="flex">
                <div className="p-4 text-gray-400 hover:text-white hover:bg-gray-800">
                    <Minus className=" w-3 h-3" />
                </div>
                <div className="p-4 text-gray-400 hover:text-white hover:bg-gray-800">
                    <Maximize className=" w-3 h-3" />
                </div>
                <div className="p-4 text-gray-400 hover:text-white hover:bg-red-800">
                    <Close className=" w-3 h-3" />
                </div>
            </div>
        </div>
    )
}

