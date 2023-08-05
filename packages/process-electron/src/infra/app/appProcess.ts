import { BrowserWindow, app } from "electron";
import { AppChannelWrapper } from "./appChannelWrapper";
import config from "../config";
import { AppWindowWrapper} from "./appWindowWrapper";


export class AppProcess{

  private readonly channelWrapper: AppChannelWrapper
  private readonly appWindowsWrapper: AppWindowWrapper
  constructor(){
    this.channelWrapper = new AppChannelWrapper();
    this.appWindowsWrapper = new AppWindowWrapper();
  }

  public init() {

    // init window
    this.appWindowsWrapper.init();

    // init channel
    this.channelWrapper.init();
  }

}