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
