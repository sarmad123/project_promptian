import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "../../../../utils/database";
import User from "@models/user";
import bcrypt from "bcrypt";
import { z } from "zod";

// Validation schema for user input
const userSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: '', //process.env.GOOGLE_ID,
            clientSecret: '', //process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    const parsedData = userSchema.safeParse(credentials);
                    if (!parsedData.success) {
                        throw new Error(parsedData.error.errors.map(e => e.message).join(", "));
                    }

                    await connectToDb();
                    const user = await User.findOne({ email: credentials.email });
                    if (!user) {
                        throw new Error("No user found with this email");
                    }
                    const isValidPassword = await bcrypt.compare(credentials.password, user.password);
                    if (!isValidPassword) {
                        throw new Error("Invalid password");
                    }
                    return user;
                } catch (error) {
                    console.error(error.message);
                    throw new Error(error.message);
                }
            },
        }),
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({ email: session.user.email });
            if (sessionUser) {
                session.user.id = sessionUser._id.toString();
                session.user.role = sessionUser.role; // Example of custom field
                session.user.name = sessionUser.username;
            }
            return session;
        },
        async signIn({ user, account, profile }) {
            try {
                await connectToDb();

                // Handle Google sign-in
                if (account.provider === "google") {
                    const existingUser = await User.findOne({ email: profile.email });
                    if (!existingUser) {
                        await User.create({
                            email: profile.email,
                            username: profile.name.replace(" ", "").toLowerCase(),
                            image: profile.picture,
                        });
                    }
                }

                return true;
            } catch (error) {
                console.error(error);
                return false;
            }
        },
    },
    secret: process.env.NEXTAUTH_SECRET, // Ensure this is set for session security
    session: {
        jwt: true, // Using JWT for session handling
    },
});

export { handler as GET, handler as POST };
