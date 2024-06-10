import Users from "../models/UserModels.js";
import News from "../models/NewsModels.js";

export async function createNews(data, userId) {
    try {
        // Find the user who is creating the news
        const user = await Users.findByPk(userId);

        if (!user) {
            throw new Error('User not found');
        }

        // Determine the author_id based on the user's role
        let authorId = null;
        if (user.role === 'author') {
            authorId = user.uuid;
        } else {
            // Handle other roles or set a default author
            authorId = user.uuid; // or another logic for different roles
        }

        // Create the news
        const news = await News.create({
            ...data,
            author_id: authorId,
            UserId: userId
        });

        return news;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
