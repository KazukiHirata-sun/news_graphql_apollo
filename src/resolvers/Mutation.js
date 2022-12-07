const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { APP_SECRET } = require("../utils");


const signup = async (parent, args, context) => {
  const hashedPassword = await bcrypt.hash(args.password, 10);

  const user = await context.prisma.user.create({
    data: {
      name: args.name,
      email: args.email,
      hashedPassword,
    },
  });

  const token = jwt.sign({userId: user.id}, APP_SECRET);

  return {
    token,
    user,
  };
}

const login = async (parent, args, context) => {
    const user = await context.prisma.user.findUnique({
      where: {email: args.email},
    });

    if (!user) {
      throw new Error("そのようなユーザは存在しません")
    }
    const valid = await bcrypt.compare(args.password, user.hashedPassword)

    if (!valid) {
      throw new Error("無効なパスワードです")
    }

    const token = jwt.sign({userId: user.id}, APP_SECRET);

  return {
    token,
    user,
  };
}

const post = async (parent, args, context) => {
  const {userId} = context;
  const newLink = await context.prisma.link.create({
    data: {
      description: args.description,
      url: args.url,
      User: {connect: {id: userId}},
    },
  });
  context.pubsub.publish("NEW_LINK", newLink);

  return newLink;
}

const vote = async (parent, args, context) => {
  const userId = context.userId;
  const vote = await context.prisma.vote.findUnique({
    where: {
      linkId_userId: {
        linkId: Number(args.linkId),
        userId: userId,
      }
    }
  });
  if (Boolean(vote)) {
    throw new Error (`すでにその投稿には投票されています:${args.linkId}`)
  }

  const newVote = await context.prisma.vote.create({
    data: {
      user: {connect: {id: userId}},
      link: {connect: {id: Number(args.linkId)}},
    }
  })
  context.pubsub.publish("NEW_VOTE", newVote);

  return newVote;
}

module.exports = {
  signup,
  login,
  post,
  vote,
}
