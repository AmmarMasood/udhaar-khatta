import cookie from "cookie";

export default async (req, res) => {
  if (req.method === "GET") {
    //   check if cookie exist
    if (!req.method === "GET") {
      res.status(403).json({ message: "Not Authorized" });
      return;
    }
    try {
      const { token } = cookie.parse(req.headers.cookie);
      const backendRes = await fetch(
        `${process.env.NEXT_PUBLIC_MAIN_BACKEND_API}/user/profile`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const user = await backendRes.json();
      if (user.status && user.status >= 400) {
        res.status(400).json(user);
      } else {
        res.status(200).json({ user: user });
      }
      console.log("asd", user);
    } catch (err) {
      res.status(400).json(err);
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
