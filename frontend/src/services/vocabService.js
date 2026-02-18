// Vocabulary service - uses local data instead of backend API
export async function fetchVocab(start = 0, limit = null) {
  try {
    const response = await fetch('/data/english/vocab.json');
    const vocabData = await response.json();
    
    // Filter by ID instead of array slicing
    let filteredData = start > 0 
      ? vocabData.filter(item => item.id >= start)
      : vocabData;
    
    // Apply limit to filtered data
    let paginatedData = limit 
      ? filteredData.slice(0, limit)
      : filteredData;
    
    return {
      status: "success",
      count: paginatedData.length,
      total: vocabData.length,
      start: start,
      limit: limit,
      data: paginatedData
    };
  } catch (error) {
    return {
      status: "error",
      message: `Failed to load vocabulary data: ${error.message}`
    };
  }
}

export async function fetchVocabById(wordId) {
  try {
    const response = await fetch('/data/english/vocab.json');
    const vocabData = await response.json();
    
    const word = vocabData.find(item => item.id === wordId);
    
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
      message: `Failed to load vocabulary data: ${error.message}`
    };
  }
}
