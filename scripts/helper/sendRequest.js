import getToken from "../../getToken.js";
import { API_URL } from "../const.js";

export default async function sendRequest(type, link) {
  try {
    const token = await getToken("token");
    console.log(`Token: ${token}`);
    const response = await fetch(`${API_URL}/content`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        link,
        title: "",
        type,
        tags: [],
        token,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return { success: true };
    return data;
  } catch (error) {
    console.error("Error sending request:", error);
    throw error;
  }
}
