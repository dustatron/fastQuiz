// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  console.log("body", req.body); // The request body
  console.log("amount", req.body); // The request body
  console.log(req.query); // The url query string
  console.log(req.cookies); // The passed cookies
  res.status(200).json({ name: "hello" });
};
