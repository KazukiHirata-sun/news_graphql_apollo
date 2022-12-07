const User = (parent, args, context) => {
  return context.prisma.link.findUnique({where: {id: parent.id},}).User();
} 

const votes = (parent, args, context) => {
  return context.prisma.link.findUnique({where: {id: parent.id},}).votes();
} 

module.exports = {
  User,
  votes,
};