const API_BASE_URL = "https://localhost:7064";

export const buildImageUrl = (imageUrl) => {

    if (!imageUrl) {
        return null;
    }

    if (imageUrl.startsWith("http")) {
        return imageUrl;
    }

    return `${API_BASE_URL}${imageUrl}`;
};