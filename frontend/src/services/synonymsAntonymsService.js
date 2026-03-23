// Synonyms and Antonyms service - uses local data
export const synonymsAntonymsService = {
  // Get synonyms and antonyms with pagination
  async getSynonymsAntonyms(start = 0, limit = null) {
    try {
      const response = await fetch('/data/english/synonyms-antonyms.json');
      const data = await response.json();
      
      // Filter by ID instead of array slicing
      let filteredData = start > 0 
        ? data.filter(item => item.id >= start)
        : data;
      
      // Apply limit to filtered data
      let paginatedData = limit 
        ? filteredData.slice(0, limit)
        : filteredData;
      
      return {
        status: "success",
        count: paginatedData.length,
        total: data.length,
        start: start,
        limit: limit,
        data: paginatedData
      };
    } catch (error) {
      return {
        status: "error",
        message: `Failed to load synonyms and antonyms data: ${error.message}`
      };
    }
  },

  // Get synonyms and antonyms by ID
  async getSynonymsAntonymsById(wordId) {
    try {
      const response = await fetch('/data/english/synonyms-antonyms.json');
      const data = await response.json();
      
      const word = data.find(item => item.id === wordId);
      
      if (word) {
        return {
          status: "success",
          data: word
        };
      } else {
        return {
          status: "error",
          message: `Word with ID ${wordId} not found`
        };
      }
    } catch (error) {
      return {
        status: "error",
        message: `Failed to load synonyms and antonyms data: ${error.message}`
      };
    }
  }
};
