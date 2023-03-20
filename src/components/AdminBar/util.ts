type UserDate = {
  Id: string,
  createdAt: number | string,
  docId: string
  name: string,
  photo: string,
  score: string
  theQuestion: string[]
  userAnswer: string[]
}

export const allPlayersHaveAnswered = (userData: UserDate[], currentSlide: number, currentQuestion: string) => {
  if (userData && userData.length) {
    const results = userData.map(data => ({ answered: data.theQuestion.includes(currentQuestion), name: data.name, photo: data.photo, id: data.Id }))
    return results
  }
  return false
}
