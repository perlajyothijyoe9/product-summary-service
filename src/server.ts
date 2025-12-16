
import dotenv from "dotenv";
dotenv.config();
import { app } from "./app";

app.listen(process.env.PORT || 3000, () => {
  console.log("Service running on port", process.env.PORT || 3000);
});
