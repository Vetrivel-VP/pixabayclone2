export const SET_FEED = (feeds) => {
  return {
    type: "SET_FEED",
    feeds: feeds,
  };
};

export const GET_FEED = () => {
  return {
    type: "GET_FEED",
  };
};

export const SET_FEED_NULL = () => {
  return {
    type: "SET_FEED_NULL",
    feeds: null,
  };
};
