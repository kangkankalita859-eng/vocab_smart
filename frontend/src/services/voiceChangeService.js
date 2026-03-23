export const fetchVoiceChange = async (start = 0, limit = 10) => {
  try {
    // Fetch the JSON files directly
    const [voiceChangeResponse, answersResponse, explanationsResponse] = await Promise.all([
      fetch('/data/english/voice_change.json'),
      fetch('/data/english/voice_change_answers.json'),
      fetch('/data/english/voice_change_explanations.json')
    ]);
    
    const voiceChangeDataParsed = await voiceChangeResponse.json();
    const answersDataParsed = await answersResponse.json();
    const explanationsDataParsed = await explanationsResponse.json();
    
    // Merge the data from all three files
    const mergedData = voiceChangeDataParsed.map(question => {
      const answer = answersDataParsed.find(a => a.id === question.id);
      const explanation = explanationsDataParsed.find(e => e.id === question.id);
      
      const merged = {
        ...question,
        // Convert book numbering (1-4) to array indexing (0-3)
        correct: answer ? answer.correct - 1 : 0,
        explanation: explanation ? explanation.explanation : ""
      };
      
      return merged;
    });

    return {
      data: mergedData.slice(start, limit),
      total: mergedData.length
    };
  } catch (error) {
    console.error("Error in fetchVoiceChange:", error);
    return {
      data: [],
      total: 0
    };
  }
};

export const fetchVoiceChangeById = async (id) => {
  try {
    // Fetch the JSON files directly
    const [voiceChangeResponse, answersResponse, explanationsResponse] = await Promise.all([
      fetch('/data/english/voice_change.json'),
      fetch('/data/english/voice_change_answers.json'),
      fetch('/data/english/voice_change_explanations.json')
    ]);
    
    const voiceChangeDataParsed = await voiceChangeResponse.json();
    const answersDataParsed = await answersResponse.json();
    const explanationsDataParsed = await explanationsResponse.json();
    
    const question = voiceChangeDataParsed.find(item => item.id === id);
    const answer = answersDataParsed.find(a => a.id === id);
    const explanation = explanationsDataParsed.find(e => e.id === id);
    
    if (question) {
      return {
        ...question,
        // Convert book numbering (1-4) to array indexing (0-3)
        correct: answer ? answer.correct - 1 : 0,
        explanation: explanation ? explanation.explanation : ""
      };
    }
    
    throw new Error('Question not found');
  } catch (error) {
    console.error("Error in fetchVoiceChangeById:", error);
    throw new Error('Failed to fetch question');
  }
};
