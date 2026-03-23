export const fetchGeometryQuestions = async (start = 0, limit = 100) => {
  try {
    // Fetch the JSON file directly
    const response = await fetch('/data/maths/geometry/pyq.json');
    const geometryDataParsed = await response.json();
    
    // Filter questions based on start and limit
    const filteredData = geometryDataParsed.slice(start, start + limit);
    
    return {
      data: filteredData,
      total: geometryDataParsed.length
    };
  } catch (error) {
    console.error("Error in fetchGeometryQuestions:", error);
    return {
      data: [],
      total: 0
    };
  }
};

export const fetchGeometryById = async (id) => {
  try {
    // Fetch the JSON file directly
    const response = await fetch('/data/maths/geometry/pyq.json');
    const geometryDataParsed = await response.json();
    
    const question = geometryDataParsed.find(item => item.id === id);
    
    if (question) {
      return question;
    }
    
    throw new Error('Question not found');
  } catch (error) {
    console.error("Error in fetchGeometryById:", error);
    throw new Error('Failed to fetch question');
  }
};
