import axios from "axios";
import cookie from "cookie";

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const data = await axios.post(
        `${"http://localhost:5001"}/auth/login`,
        req.body
      );
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", data.data.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60 * 24 * 7,
          sameSite: "strict",
          path: "/",
        })
      );

      res.status(200).json(data.data);
      console.log("login", data);
    } catch (err) {
      console.log("login", err);
      res.status(400).json({ err });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
