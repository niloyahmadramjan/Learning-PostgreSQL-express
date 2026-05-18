import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { userRoute } from "./modules/users/user.routes";
import { userProfile } from "./modules/profile/profile.route";

const app: Application = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Express Server",
    author: "Next Level",
  });
});

app.use("/api/users", userRoute);
app.use("/api/profile", userProfile)

export default app;
