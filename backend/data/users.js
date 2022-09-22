import bcrypt from "bcryptjs";

const users = [
    {
        name: "Admin 1",
        email: "admin@test.com",
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: "user 1",
        email: "user1@test.com",
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: "user 2",
        email: "user2@test.com",
        password: bcrypt.hashSync('123456', 10),
    },
]

export default users