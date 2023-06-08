import app from "./app";
import { appConfig } from "./config/app.config";

app.listen(appConfig.port, () => {
  console.log(`Server is up on port ${appConfig.port}`);
});
