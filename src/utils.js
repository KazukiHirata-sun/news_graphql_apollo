const jwt = require("jsonwebtoken");

APP_SECRET = "Graphql"

const getTokenPayload = (token) => {
  return jwt.verify(token, APP_SECRET);
}

const getUserId = (req, authToken) => {
  if (req) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.replace("Bearer","");

      if (!token) {
        throw new Error("トークンが見つかりません")
      }
      const {userId} = getTokenPayload(token)
      return userId
    }
  } else if (authToken) {
    const {userId} = getTokenPayload(authToken)
    return userId
  } 
  throw new Error("認証情報がありません")
}

module.exports = {
  APP_SECRET,
  getUserId,
}