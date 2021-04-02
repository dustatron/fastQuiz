export const advanceSlide = (gameData, gameRef) => {
  const nextSlide = gameData.gameCurrentSlide + 1;
  if (nextSlide >= gameData.gamePlayable.length) {
    return gameRef.set({ ...gameData, gameEnd: true });
  }
  return gameRef.set({ ...gameData, gameCurrentSlide: nextSlide });
};

export const backSlide = async (gameData, gameRef) => {
  const backSlide = gameData.gameCurrentSlide - 1;
  if (backSlide > 0) {
    return await gameRef
      .set({ ...gameData, gameCurrentSlide: backSlide })
      .then(() => {
        console.log("Back slide");
      });
  }
};
