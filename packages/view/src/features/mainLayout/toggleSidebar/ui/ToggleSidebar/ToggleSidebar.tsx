import SideButton from "./sidebar-icon.svg";
import { useAppDispatch} from "@s-m-n/view/shared/hooks/reduxHook";
import { toggle } from "@s-m-n/view/entities/mainLayout";

export const ToggleSidebar = () => {

  const dispatch = useAppDispatch();

  return(
    <button 
      onClick={()=>dispatch(toggle())}
      className="hover:bg-gray-800 active:bg-gray-700 px-1 rounded"
    >
      <SideButton className="h-7 w-5 text-gray-600 hover:text-white" />
    </button>
  )
}