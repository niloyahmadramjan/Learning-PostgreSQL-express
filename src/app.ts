import express, {
  type Application,
  type Request,
  type Response,
} from "express";
const app: Application = express();
import userRouter from "./modules/users/user.routes";

// middleware
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: true,
    message: "server is running....",
  });
});

app.use("/api/users", userRouter);

export default app;
