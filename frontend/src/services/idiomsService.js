// Idioms service - uses local data instead of backend API
export const fetchIdioms = async (start = 0, limit = null) => {
  try {
    const response = await fetch('/data/english/idioms.json');
    const idiomsData = await response.json();
    
    // Filter by ID instead of array slicing
    let filteredData = start > 0 
      ? idiomsData.filter(item => item.id >= start)
      : idiomsData;
    
    // Apply limit to filtered data
    let paginatedData = limit 
      ? filteredData.slice(0, limit)
      : filteredData;
    
    return {
      status: "success",
      count: paginatedData.length,
      total: idiomsData.length,
      start: start,
      limit: limit,
      data: paginatedData
    };
  } catch (error) {
    return {
      status: "error",
      message: `Failed to load idioms data: ${error.message}`
    };
  }
};

export const fetchIdiomById = async (idiomId) => {
  try {
    const response = await fetch('/data/english/idioms.json');
    const idiomsData = await response.json();
    
    const idiom = idiomsData.find(item => item.id === idiomId);
    
    if (idiom) {
      return {
        status: "success",
        data: idiom
      };
    } else {
      return {
        status: "error",
        message: `Idiom with ID ${idiomId} not found`
      };
    }
  } catch (error) {
    return {
      status: "error",
      message: `Failed to load idioms data: ${error.message}`
    };
  }
};
