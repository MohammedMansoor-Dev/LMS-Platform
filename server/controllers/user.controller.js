import { User } from "../models/user.model.js"
import bcrypt from 'bcrypt'
import { generateToken } from "../utils/generateToken.js"
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js"

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All Fields are required.'
            })
        }

        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                success: false,
                message: 'User Already exists with this email'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        await User.create({
            name,
            email,
            password: hashedPassword
        })
        return res.status(201).json({
            success: true,
            message: 'Signup Successfull'
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Failed to Register'
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                success: true,
                message: 'All Fields are required'
            })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Incorrect email or password'
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: 'Incorrect email or password'
            })
        }

        generateToken(res, user, `Welcome Back ${user.name}`)
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to Login'
        })
    }
}

export const logout = async (_, res) => {
    try {
        return res.status(200).cookie('token', '', { maxAge: 0 }).json({
            message: 'Logged Out Successfully.',
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to Login'
        })
    }
}

export const getUserProfile = async (req, res) => {
    try {
        const userId = req.id
        const user = await User.findById(userId).select('-password').populate('enrolledCourses')
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Profile not found'
            })
        }
        return res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to Login'
        })
    }
}

export const updateProfile = async (req, res) => {
    try {
        const userId = req.id
        const { name } = req.body
        const profilePhoto = req.file

        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not Found'
            })
        }

        if (user.photoUrl) {
            const publicId = user.photoUrl.split('/').pop().split('.')[0]
            deleteMediaFromCloudinary(publicId)
        }

        const cloudResponse = await uploadMedia(profilePhoto?.path)
        // const { secure_url: photoUrl } = cloudResponse
        const photoUrl = cloudResponse.secure_url

        const updatedData = { name, photoUrl }
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true }).select('-password')

        return res.status(200).json({
            success: true,
            user: updatedUser,
            message: 'Profile updated Successfully.'
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to Update Profile'
        })
    }
}