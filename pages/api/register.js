import axios from "axios";

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const data = await axios.post(
        `${process.env.NEXT_PUBLIC_MAIN_BACKEND_API}/auth/signup`,
        req.body
      );
      res.status(200).json("Success");
      console.log("ehm ehm", data);
    } catch (err) {
      console.log(err);
      res.status(400).json({
        err: err.response ? err.response.data.errors[0] : "Unable to register",
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
