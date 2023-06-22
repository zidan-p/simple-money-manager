import { AppChannelWrapper } from "./infra/app/appChannelWrapper";
import { AppProcessWrapper } from "./infra/app/appProcessWrapper";


const appChannel = new AppChannelWrapper();
const appProcess = new AppProcessWrapper(appChannel);

appProcess.init();