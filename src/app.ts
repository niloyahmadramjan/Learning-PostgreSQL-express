import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { userRoute } from "./modules/users/user.routes";
import { userProfile } from "./modules/profile/profile.route";
import { authRouter } from "./modules/auth/auth.route";
import { logstracker } from "./middleware/log.middleware";
import cookieParser from "cookie-parser";
import auth from "./middleware/auth";
import { USER_ROLE } from "./types/role";
import cors from "cors";
import globalErrorHandler from "./middleware/globalerrorhandler";

const app: Application = express();
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:8000",
  }),
);

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use(logstracker);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Express Server",
    author: "Next Level",
  });
});

app.use("/api/users", userRoute);
app.use(
  "/api/profile",
  auth(USER_ROLE.user, USER_ROLE.admin, USER_ROLE.agent),
  userProfile,
);
app.use("/api/auth", authRouter);

app.use(globalErrorHandler);


export default app;
