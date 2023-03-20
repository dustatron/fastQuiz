export default async (req, res) => {
  if (req.method === "GET") {
    const { amount, category, difficulty, type } = req.query;
    const data = await fetch(
      `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
    );
    const jsonData = await data.json();
    res.status(200).send(jsonData);
  }
};

/* pattern needed for OpenTDB */
//?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
