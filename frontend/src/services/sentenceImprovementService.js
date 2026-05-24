export const fetchSentenceImprovements = async (start = 0, limit = 10) => {
  try {
    const response = await fetch('/data/english/sentenceimprovement.json');
    const improvementData = await response.json();
    
    console.log("Sentence Improvement data loaded:", improvementData.length, "entries");
    
    // Slice the data based on start and limit
    const slicedData = improvementData.slice(start, start + limit);
    
    return slicedData;
  } catch (error) {
    console.error("Error in fetchSentenceImprovements:", error);
    return [];
  }
};

export const fetchSentenceImprovementById = async (id) => {
  try {
    const response = await fetch('/data/english/sentenceimprovement.json');
    const improvementData = await response.json();
    
    return improvementData.find(item => item.id === id) || null;
  } catch (error) {
    console.error("Error in fetchSentenceImprovementById:", error);
    return null;
  }
};

export const fetchAllSentenceImprovements = async () => {
  try {
    const response = await fetch('/data/english/sentenceimprovement.json');
    const improvementData = await response.json();
    
    return improvementData;
  } catch (error) {
    console.error("Error in fetchAllSentenceImprovements:", error);
    return [];
  }
};
