import { BrowserWindow, app } from "electron";
import { AppChannelWrapper } from "./appChannelWrapper";
import config from "../config";
import { appWindowWrapper } from "./appWindowWrapper";


export class AppProcessWrapper{

  constructor(
    private readonly channelWrapper: AppChannelWrapper,
    private readonly appWindowsWrapper: appWindowWrapper
  ){}

  public init() {
  }


  private startChannel() {
    
  }

  private startWindow() {

  }

}