// PYQ service - uses local data instead of backend API
export async function fetchPYQ(subject = null, topic = null, start = 0, limit = null) {
  try {
    let pyqPath;
    
    if (subject && topic) {
      // Look in subject/topic specific folder
      pyqPath = `/data/${subject.toLowerCase()}/${topic.toLowerCase().replace(" ", "_")}/pyq.json`;
    } else if (subject) {
      // Default to maths number_system data when only subject is provided
      pyqPath = `/data/maths/number_system/pyq.json`;
    } else {
      // Default fallback
      pyqPath = '/data/maths/number_system/pyq.json';
    }
    
    const response = await fetch(pyqPath);
    const pyqData = await response.json();
    
    // Filter by subject and topic if provided
    let filteredData = pyqData;
    if (subject) {
      filteredData = filteredData.filter(item => item.subject?.toLowerCase() === subject.toLowerCase());
    }
    if (topic) {
      filteredData = filteredData.filter(item => item.topic?.toLowerCase() === topic.toLowerCase());
    }
    
    // Apply pagination
    let totalCount = filteredData.length;
    let endIndex = limit ? start + limit : totalCount;
    let paginatedData = filteredData.slice(start, endIndex);
    
    return {
      status: "success",
      count: paginatedData.length,
      total: totalCount,
      start: start,
      limit: limit,
      subject: subject,
      topic: topic,
      data: paginatedData
    };
  } catch (error) {
    return {
      status: "error",
      message: `Failed to load PYQ data: ${error.message}`
    };
  }
}

export async function fetchPYQById(questionId) {
  try {
    // Try maths first, then reasoning
    const paths = ['/data/maths/number-system/pyq.json', '/data/reasoning/logical-reasoning/pyq.json'];
    
    for (const path of paths) {
      try {
        const response = await fetch(path);
        const pyqData = await response.json();
        
        const question = pyqData.find(item => item.id === questionId);
        
        if (question) {
          return {
            status: "success",
            data: question
          };
        }
      } catch (e) {
        // Continue to next path
        continue;
      }
    }
    
    return {
      status: "error",
      message: `Question with ID ${questionId} not found`
    };
  } catch (error) {
    return {
      status: "error",
      message: `Failed to load PYQ data: ${error.message}`
    };
  }
}
