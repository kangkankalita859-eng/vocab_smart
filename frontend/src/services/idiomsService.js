const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const fetchIdioms = async (start = 0, limit = null) => {
  try {
    const params = new URLSearchParams();
    params.append("start", start.toString());
    if (limit !== null) {
      params.append("limit", limit.toString());
    }
    params.append("_t", Date.now()); // Cache-busting

    const response = await fetch(`${API_BASE_URL}/api/idioms?${params}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching idioms:", error);
    throw error;
  }
};

export const fetchIdiomById = async (idiomId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/idioms/${idiomId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching idiom by ID:", error);
    throw error;
  }
};
