const links = (parent, args, context) => {
  const links = context.prisma.user.findUnique({where: {id: parent.id},}).links()
  return links
}


module.exports = {
  links,
};