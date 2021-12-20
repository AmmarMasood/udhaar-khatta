import axios from "axios";

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const data = await axios.post(
        `${"http://localhost:5001"}/auth/signup`,
        req.body
      );
      res.status(200).json("Success");
      console.log("ehm ehm", data);
    } catch (err) {
      res.status(400).json({ err: err.response.data.errors[0] });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
