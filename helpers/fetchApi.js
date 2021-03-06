export const fetchQuizApi = async (setIsShowingSpinner, formData) => {
  setIsShowingSpinner(true);
  const { amount, category, difficulty, type } = formData;
  const data = await fetch(
    `/api/quiz?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
  );
  const jsonData = await data.json();
  setIsShowingSpinner(false);
  return jsonData;
};
