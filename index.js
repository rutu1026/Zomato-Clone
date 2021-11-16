require("dotenv").config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";

// config
import googleAuthConfig from "./config/google.config";

// API
import Auth from "./API/Auth";
import Restaurant from "./API/Restaurant/index";
import Menu from "./API/Menu/index";
import Image from "./API/Image/index";
import Review from "./API/Reviews/index";
import Order from "./API/orders/index";
import Food from "./API/Food/index";
// database connection
import ConnectDB from "./database/connection";
// confi passport
googleAuthConfig(passport);

const zomato = express();

zomato.use(express.json());
zomato.use(express.urlencoded({ extended: false }));
zomato.use(helmet());
zomato.use(cors());
zomato.use(passport.initialize());
zomato.use(passport.session());

// for app route
zomato.use("/auth", Auth);

zomato.use("/restaurant", Restaurant);

zomato.use("/menu", Menu);

zomato.use("/image", Image);

zomato.use("/food", Food);

zomato.use("/review", Review);

zomato.use("/order", Order);

zomato.get("/", (req, res) => res.json({ message: "success" }));

zomato.listen(4000, () =>
  ConnectDB()
    .then(() => console.log("server is up"))
    .catch(() => console.log("Db connection failed"))
);
