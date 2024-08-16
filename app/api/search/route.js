import { connectToDb } from "@utils/database";
import Prompt from "@models/prompt";
import User from "../../../models/user";

export const GET = async (request, res) => {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('searchString');
    try {
        await connectToDb();

        // Search for users with matching username
        const users = await User.find({ username: query });
        let prompts = [];

        if (users.length > 0) {
            const user = users[0];
            const userId = user._id;
            prompts = await Prompt.find({ creator: userId }).populate('creator');
        }

        // If no prompts found by user or no user found, search by tags or content
        if (prompts.length === 0) {
            prompts = await Prompt.find({
                $or: [
                    { tag: query },
                    { prompt: { $regex: query, $options: 'i' } }
                ]
            }).populate('creator');
        }

        return new Response(JSON.stringify(prompts), { status: 200 });

    } catch (error) {
        return new Response('Failed to fetch all prompts', { status: 500 });
    }
};
