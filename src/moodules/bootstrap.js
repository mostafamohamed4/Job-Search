import { main } from "../../database/dbConnection.js"
import { globalError } from "../../middleware/globalError.js"
import { CompanyRouter } from "./Company/Company.routers.js"
import { JobRouter } from "./Job/Job.routers.js"
import { pageError } from "./Units/pageError.js"
import { UserRouter } from "./Users/Users.routers.js"

export const bootstrap = (app) => {
    main()
    app.use('/User', UserRouter)
    app.use('/Company', CompanyRouter)
    app.use('/Job', JobRouter)
    app.use('*', pageError)
    app.use(globalError)
}