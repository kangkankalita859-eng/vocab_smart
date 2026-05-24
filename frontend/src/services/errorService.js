export const fetchErrors = async (start = 0, limit = 10) => {
  try {
    const response = await fetch('/data/english/error.json');
    const errorData = await response.json();
    
    console.log("Error data loaded:", errorData.length, "entries");
    
    // Slice the data based on start and limit
    const slicedData = errorData.slice(start, start + limit);
    
    return slicedData;
  } catch (error) {
    console.error("Error in fetchErrors:", error);
    return [];
  }
};

export const fetchErrorById = async (id) => {
  try {
    const response = await fetch('/data/english/error.json');
    const errorData = await response.json();
    
    return errorData.find(item => item.id === id) || null;
  } catch (error) {
    console.error("Error in fetchErrorById:", error);
    return null;
  }
};

export const fetchAllErrors = async () => {
  try {
    const response = await fetch('/data/english/error.json');
    const errorData = await response.json();
    
    return errorData;
  } catch (error) {
    console.error("Error in fetchAllErrors:", error);
    return [];
  }
};

export const fetchErrorAnswers = async () => {
  try {
    const response = await fetch('/data/english/error_answer.json');
    const answerData = await response.json();
    return answerData;
  } catch (error) {
    console.error("Error in fetchErrorAnswers:", error);
    return [];
  }
};

export const fetchErrorExplanations = async () => {
  try {
    const response = await fetch('/data/english/error_explaination.json');
    const explanationData = await response.json();
    return explanationData;
  } catch (error) {
    console.error("Error in fetchErrorExplanations:", error);
    return [];
  }
};

export const getErrorAnswer = async (id) => {
  try {
    const answers = await fetchErrorAnswers();
    return answers.find(item => item.id === id)?.answer || null;
  } catch (error) {
    console.error("Error in getErrorAnswer:", error);
    return null;
  }
};

export const getErrorExplanation = async (id) => {
  try {
    const explanations = await fetchErrorExplanations();
    return explanations.find(item => item.id === id) || null;
  } catch (error) {
    console.error("Error in getErrorExplanation:", error);
    return null;
  }
};

export const validateErrorAnswer = async (id, selectedOption) => {
  try {
    const correctAnswer = await getErrorAnswer(id);
    const isCorrect = correctAnswer === selectedOption;
    const explanation = await getErrorExplanation(id);
    
    return {
      isCorrect,
      correctAnswer,
      explanation
    };
  } catch (error) {
    console.error("Error in validateErrorAnswer:", error);
    return { isCorrect: false, correctAnswer: null, explanation: null };
  }
};
