const newLinkSubscribe = (parent, args, context, info) => {
  return context.pubsub.asyncIterator("NEW_LINK");
}

const newVoteSubscription = (parent, args, context, info) => {
   return context.pubsub.asyncIterator("NEW_VOTE");
}

const newLink = {
  subscribe: newLinkSubscribe,
  resolve: (payload) => {
    return payload;
  },
};

const newVote = {
  subscribe: newVoteSubscription,
  resolve: (payload) => {
    return payload;
  },
};

module.exports = {
  newLink,
  newVote,
}