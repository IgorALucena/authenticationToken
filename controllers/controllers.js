let { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

let profileController = async (req, res) => {
    try {
        let id = req.params.id;
        id = Number(id);
        let profile = await prisma.user.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
                email: true
            }
        })
        if (!profile) {
            return res.status(404).json({ erro: "Profile not found." });
        }
        res.status(200).json({
            status: 'Welcome your profile.',
            data: profile
        })

    } catch (err) {
        res.status(500).json({ erro: "Internal server error." });

    }

};

let signInController = async (req, res) => {
    try {
        let { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ msg: "E-mail and password are mandatory." })
        }
        let consulta = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        if (!consulta) {
            return res.status(404).json({ msg: "User does not exist." });
        }
        const passwordCheck = await bcrypt.compare(password, consulta.password);
        if (!passwordCheck) {
            return res.status(401).json({ msg: "Invalid password." });
        }
        else {
            let secret = process.env.SECRET;
            let token = jwt.sign({ id: consulta.id }, secret);
            res.status(200).json({ msg: "Authentication completed successfully.", token });
        }

    } catch (err) {
        res.status(500).json({ msg: "Internal server error." });
    }
};

let signUpController = async (req, res) => {
    try {
        let { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ msg: "Email and password are mandatory." })
        }
        let consulta = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        if (consulta) {
            return res.status(409).json({ msg: "User already exists." });
        }
        let salt = await bcrypt.genSalt(12);
        let passwordCrypt = await bcrypt.hash(password, salt);
        let cadastro = await prisma.user.create({
            data: {
                email: email,
                password: passwordCrypt
            }
        });
        res.status(201).json({
            status: `User ${cadastro.email} created`
        })
    } catch (err) {
        res.status(500).json({ msg: "Internal server error." });
    }

};

module.exports = { profileController, signInController, signUpController };