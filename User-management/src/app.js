import express from "express"
import userRoutes from "./routes/user.routes.js"
const app=express()
app.use(express.json()); //app level middleware
app.use("/user" , userRoutes);
export default app;


