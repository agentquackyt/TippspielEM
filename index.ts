import {server, app} from "./res/server/misc/server";

// routes
import {static_route} from "./res/server/routes/static.route";
import {Logger} from "./res/server/misc/logging";

Logger.info("Server started on port " + server.port + "\n");

app.use(static_route);