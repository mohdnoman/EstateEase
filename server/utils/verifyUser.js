import { errorHandler } from "./error.js"
import jwt from "jsonwebtoken"


export const VerifyUser = (req, _, next) => {
    const token = req.cookies.access_token

    if (!token) next(errorHandler(401, "unauthorized"))

    jwt.verify(token, process.env.JWT_KEY, (error, user) => {
        if (error) next(errorHandler(403, "forbidden"))

        req.user = user
        next()
    })
}