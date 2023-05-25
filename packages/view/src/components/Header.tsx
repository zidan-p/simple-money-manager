import { FC } from "react";
import Maximize from "./../icons/maximize-icon.svg";
import Minimize from "./../icons/minus-icon.svg";
import Close from "./../icons/close-icon.svg";






export const Header : FC = () => {

    return(
        <div className="flex justify-end">
            <div className="flex">
                <div className="">
                    <Maximize />
                </div>
                <div className="">
                    <Maximize />
                </div>
                <div className="">
                    <Maximize />
                </div>
            </div>
        </div>
    )
}

