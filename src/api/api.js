import axios from "axios";

const API_URL = "https://mr-apis.com/api/ai/geminitext";

export const fetchNames = async (criteria) => {
    const { gender, origin, theme } = criteria;

    const prompt = `Generate a list of 20 person names with ${theme} elements in english for a ${gender} from ${origin} origin, in array format, with each name clearly separated by commas. Ensure there are spaces between first and last names.`;

    try {
        const response = await axios.get(API_URL, {
            params: { prompt },
        });

        const content = response.data.message;

        // Use a regular expression to extract the array-like content inside brackets "[ ]"
        const matches = content.match(/\[([\s\S]*?)\]/);

        if (matches && matches[1]) {
            // Split the names by commas and clean up only unwanted quotes, keeping spaces intact
            const names = matches[1]
                .split(',')
                .map((name) => name.replace(/(^["'\s]+|["'\s]+$)/g, '').trim()); // Remove surrounding quotes, keeping spaces

            return names;
        } else {
            throw new Error('No valid names found in the response.');
        }
    } catch (error) {
        console.error("Error fetching names:", error);
        return [];
    }
};
