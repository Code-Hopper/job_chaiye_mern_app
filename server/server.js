import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import "./database/conn.js"

import { userRouter } from "./routers/userRouter.js"
import { jobRouter } from "./routers/jobRouter.js"
// import { companyRouter } from "./routers/companyRouter.js"
// import { adminRouter } from "./routers/adminRouter.js"

dotenv.config({ path: "./config.env" })

const app = express()

let port = process.env.PORT || 5012

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const corsOptions = {
  origin: "*",
  methods: "*",
};

app.use(cors(corsOptions))

// routers

app.use("/user", userRouter)

app.use("/job", jobRouter)

// app.use("/company", companyRouter)

// app.use("/admin", adminRouter)

// handle 404 route
app.use((req, res) => {
  console.log("user trying to access invalid route !")
  res.status(404).json({ message: "content/route not found !" })
})

app.listen(port, () => {
  console.log(`server is running on port ${port} !`)
})