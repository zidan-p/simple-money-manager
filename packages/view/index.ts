import { provide, inject } from "./src/Api";
import App from "./src/App/App";



export {
    /**
     * provide dependecy or function that will be used as API in view
     */
    provide, 

    /**
     * inject depency to view API
     */
    inject, 

    /**
     * The main react APP
     */
    App,

};
    
/**
 * alias resolve for child package.
 * this is only for information, there are no true application in this package.
 * because this only in browser environmet
 * 
 * TODO:
 * make webpack can accept .ts file so this alias can be used
 */
export const Alias = {
    aliasName : "@simple-money-manager",
    // path: resolve(__dirname, "src")
}