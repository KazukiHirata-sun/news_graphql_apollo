const feed = (parent, args, context) => {
  return context.prisma.link.findMany();
}

const users = (parent, args, context) => {
  return context.prisma.user.findMany();
}

module.exports = {
  feed,
  users,
};