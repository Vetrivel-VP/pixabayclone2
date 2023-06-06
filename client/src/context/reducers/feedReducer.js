const feedReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_FEED":
      return action.feeds;

    case "GET_FEED":
      return state;

    case "SET_FEED_NULL":
      return action.feeds;

    default:
      return state;
  }
};

export default feedReducer;
