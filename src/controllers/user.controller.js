import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { userModel } from "../models/user.model.js"
import { userDTO } from "../dtos/user.dto.js"


class UserControllers {

    async registerUser(req, res) {
        const { userName, password } = req.body
        try {
            const userExists = await userModel.findOne({ userName })
            if (userExists) return res.status(400).json({ message: "User name already exists" })
            const hashPass = await bcrypt.hash(password, 10)
            const userData = await userModel.create({ userName, password: hashPass })
            const userDto = userDTO(userData)

            res.status(201).json(userDto)
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message })
        }
    }

    async loginUser(req, res) {
        const { userName, password } = req.body
        try {
            const userData = await userModel.findOne({ userName })
            if (!userData) return res.status(404).json({ message: "User name not fount" })

            const isMatch = await bcrypt.compare(password, userData.password)
            if (!isMatch) return res.status(400).json({ message: "Invalid password" })
                
            const token = jwt.sign({ id: userData._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" })

            const userDto = userDTO(userData)
            res.json({ user: userDto, token })
        } catch (error) {
            res.status(500).json({ message: "Server error:" })
        }
    }
}

export default new UserControllers