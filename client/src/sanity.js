import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { fetchDetailQuery, fetchQuery, searchQuery } from "./utils/supports";
import { v4 as uuidv4 } from "uuid";

const client = createClient({
  projectId: "eerlnuop",
  dataset: "production",
  apiVersion: "2023-05-23",
  useCdn: true,
  token: process.env.REACT_APP_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

export const createNewUser = async (data) => {
  const _doc = {
    _id: data.uid,
    _type: "users",
    uid: data.uid,
    displayName: data.displayName,
    email: data.email,
    phoneNumber: data.phoneNumber,
    photoURL: data.photoURL,
  };

  await client.createIfNotExists(_doc).then((res) => {
    return res;
  });
};

export const uploadAsset = async (asset) => {
  let data;
  if (
    ["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(asset.type)
  ) {
    data = await client.assets.upload("image", asset, {
      contentType: asset.type,
      filename: asset.name,
    });
    return data;
  } else {
    data = await client.assets.upload("file", asset, {
      contentType: asset.type,
      filename: asset.name,
    });
    return data;
  }
};

export const deleteUploadedAsset = async (id) => {
  let data = await client.delete(id);
  return data;
};

export const savePost = async (doc) => {
  await client.create(doc).then((res) => {
    console.log("Saved Doc :", res);
    return res;
  });
};

export const fetchFeeds = () => {
  let data = client.fetch(fetchQuery);
  return data;
};

export const deleteFeed = async (id) => {
  let data = await client.delete(id);
  return data;
};

export const addToCollection = async (id, uid) => {
  await client
    .patch(id)
    .setIfMissing({ collections: [] })
    .insert("after", "collections[-1]", [
      { _key: uuidv4(), _type: "reference", _ref: uid },
    ])
    .commit();
};

export const fetchFeedDetail = async (feedID) => {
  let query = fetchDetailQuery(feedID);
  if (query) {
    let data = await client.fetch(query);
    return data;
  }
};

export const addToComments = async (id, uid, comment) => {
  const doc = {
    _type: "comments",
    comment,
    users: {
      _type: "reference",
      _ref: uid,
    },
  };
  await client.create(doc).then((com) => {
    client
      .patch(id)
      .setIfMissing({ comments: [] })
      .insert("after", "comments[-1]", [
        {
          _key: uuidv4(),
          _type: "reference",
          _ref: com._id,
        },
      ])
      .commit()
      .then((res) => {
        console.log(res);
      });
  });
};

export const fetchSearchQuery = async (searchTerm) => {
  let query = searchQuery(searchTerm);
  if (query) {
    let data = await client.fetch(query);
    return data;
  }
};
