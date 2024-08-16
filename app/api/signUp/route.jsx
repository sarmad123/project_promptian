import { z } from 'zod';
import { connectToDb } from "@utils/database";
import User from '@models/user';
import bcrypt from 'bcrypt';

const userSchema = z.object({
    name: z.string().min(8, "User name must be at least 8 characters long"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    image: z.string().optional(),
});

export const POST = async (req, res) => {
    try {
        const parsedData = userSchema.safeParse(await(req.json()));
        if (!parsedData.success) {
            return new Response(JSON.stringify({status: false, errors: parsedData.error.errors}),{status:400})

        }

        const { name, email, password, image } = parsedData.data;
        await connectToDb();
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return new Response(JSON.stringify({status: false, message: 'User name or email already registered' }),{status:400})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const createUser = new User({
            username: name,
            email,
            password: hashedPassword,
            image
        });
        await createUser.save();
        return new Response(JSON.stringify({status: true, message: 'User created successfully'}),{status:201})

    } catch (error) {
        return new Response(JSON.stringify({ status: false, message: error.message, error: error }),{status:500})

    }
};
