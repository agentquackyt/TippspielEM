import {server, app} from "./res/server/misc/server";
import {Logger} from "./res/server/misc/logging";

// routes
import {static_route} from "./res/server/routes/static.route";
import {html_api_router} from "./res/server/routes/htmlApi.route";


Logger.info("Server started on port " + server.port + "\n");

app.use(static_route);
app.use(html_api_router);