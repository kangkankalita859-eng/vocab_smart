export const fetchVocabTest = async (start = 0, limit = 10) => {
  try {
    // Fetch the JSON files directly
    const [vocabTestResponse, answersResponse, explanationsResponse] = await Promise.all([
      fetch('/data/english/vocab_test.json'),
      fetch('/data/english/vocab_test_answers.json'),
      fetch('/data/english/vocab_test_explanations.json')
    ]);
    
    const vocabTestDataParsed = await vocabTestResponse.json();
    const answersDataParsed = await answersResponse.json();
    const explanationsDataParsed = await explanationsResponse.json();
    
    console.log("Vocab test data loaded:", vocabTestDataParsed.length, "entries");
    console.log("Answers data loaded:", answersDataParsed.length, "entries");
    console.log("Explanations data loaded:", explanationsDataParsed.length, "entries");
    
    // Merge the data from all three files
    const mergedData = vocabTestDataParsed.map(question => {
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

    console.log("Merged data:", mergedData.length, "entries");
    console.log("Returning data from", start, "to", limit);
    console.log("Slice result:", mergedData.slice(start, limit).length, "entries");

    return {
      data: mergedData.slice(start, limit),
      total: mergedData.length
    };
  } catch (error) {
    console.error("Error in fetchVocabTest:", error);
    return {
      data: [],
      total: 0
    };
  }
};

export const fetchVocabTestBySet = async (setNumber) => {
  try {
    // Fetch the JSON files directly
    const [vocabTestResponse, answersResponse, explanationsResponse] = await Promise.all([
      fetch('/data/english/vocab_test.json'),
      fetch('/data/english/vocab_test_answers.json'),
      fetch('/data/english/vocab_test_explanations.json')
    ]);
    
    const vocabTestDataParsed = await vocabTestResponse.json();
    const answersDataParsed = await answersResponse.json();
    const explanationsDataParsed = await explanationsResponse.json();
    
    // Get questions for a specific set
    const setData = vocabTestDataParsed.filter(q => q.set === setNumber);
    
    console.log("Set", setNumber, "questions found:", setData.length);
    
    // Merge the data for this set
    const mergedData = setData.map(question => {
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
      data: mergedData,
      total: mergedData.length
    };
  } catch (error) {
    console.error("Error in fetchVocabTestBySet:", error);
    return {
      data: [],
      total: 0
    };
  }
};

export const fetchVocabTestById = async (id) => {
  try {
    // Fetch the JSON files directly
    const [vocabTestResponse, answersResponse, explanationsResponse] = await Promise.all([
      fetch('/data/english/vocab_test.json'),
      fetch('/data/english/vocab_test_answers.json'),
      fetch('/data/english/vocab_test_explanations.json')
    ]);
    
    const vocabTestDataParsed = await vocabTestResponse.json();
    const answersDataParsed = await answersResponse.json();
    const explanationsDataParsed = await explanationsResponse.json();
    
    const question = vocabTestDataParsed.find(item => item.id === id);
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
    console.error("Error in fetchVocabTestById:", error);
    throw new Error('Failed to fetch question');
  }
};
