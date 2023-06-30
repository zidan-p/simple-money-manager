import { AppChannelWrapper } from "./infra/app/appChannelWrapper";
import { AppProcessWrapper } from "./infra/app/appProcessWrapper";
import { DatabaseSMM } from "./infra/database";

// const appChannel = new AppChannelWrapper();
// const appProcess = new AppProcessWrapper(appChannel);

// appProcess.init();

const MainDB = new DatabaseSMM();