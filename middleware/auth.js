import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.SECRET_TOKEN);

      req.userId = decodedData?.id;
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Token has been expired" });
  }
};

export default auth;
