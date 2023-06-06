import { v4 as uuidv4 } from "uuid";
import {
  FaCamera,
  FaFire,
  FaHome,
  FaPaintBrush,
  FaVideo,
} from "react-icons/fa";

export const mainMenu = [
  { id: uuidv4(), name: "My media", slug: "my-media" },
  { id: uuidv4(), name: "Upload", slug: "upload" },
  { id: uuidv4(), name: "Statistics", slug: "statistics" },
  { id: uuidv4(), name: "Collections", slug: "collections" },
  { id: uuidv4(), name: "Profile", slug: "profile" },
];

export const subMenu = [
  { id: uuidv4(), name: "My media", slug: "my-media" },
  { id: uuidv4(), name: "Upload", slug: "upload" },
  { id: uuidv4(), name: "Statistics", slug: "statistics" },
  { id: uuidv4(), name: "Collections", slug: "collections" },
  { id: uuidv4(), name: "Following", slug: "following" },
  { id: uuidv4(), name: "Messages", slug: "messages" },
];

export const categoriesList = [
  { id: uuidv4(), name: "nature" },
  { id: uuidv4(), name: "photos" },
  { id: uuidv4(), name: "illustration" },
  { id: uuidv4(), name: "musics" },
  { id: uuidv4(), name: "videos" },
  { id: uuidv4(), name: "gifs" },
  { id: uuidv4(), name: "anime" },
  { id: uuidv4(), name: "background" },
  { id: uuidv4(), name: "sky" },
  { id: uuidv4(), name: "money" },
  { id: uuidv4(), name: "water" },
  { id: uuidv4(), name: "cat" },
  { id: uuidv4(), name: "baby" },
  { id: uuidv4(), name: "dog" },
  { id: uuidv4(), name: "food" },
  { id: uuidv4(), name: "car" },
  { id: uuidv4(), name: "flower" },
  { id: uuidv4(), name: "artifacts" },
  { id: uuidv4(), name: "4k Wallpaper" },
  { id: uuidv4(), name: "wallpaper" },
];

export const fetchQuery = `*[_type == 'post'] | order(_createdAt desc)  {
  _id,
  title,
  keywords,
  categories,
  otherMedia {
    asset -> {
      url
    }
  },
  mainImage {
    asset -> {
      url
    }
  },
  description,
  _createdAt,
  users -> {
    _id,
    displayName,
    photoURL
  },
  collections[] -> {
    _id,
    displayName,
    photoURL
  },
  comments[] -> {
    _id,
    comment,
    _createdAt,
    users -> {
    _id,
    displayName,
    photoURL
  }
  }
}`;

export const fetchDetailQuery = (feedId) => {
  const query = `*[_type == 'post' && _id == '${feedId}']   {
    _id,
    title,
    keywords,
    categories,
    otherMedia {
      asset -> {
        url
      }
    },
    mainImage {
      asset -> {
        url
      }
    },
    description,
    _createdAt,
    users -> {
      _id,
      displayName,
      photoURL
    },
    collections[] -> {
      _id,
      displayName,
      photoURL
    },
    comments[] -> {
      _id,
      comment,
      _createdAt,
      users -> {
      _id,
      displayName,
      photoURL
    }
    }
  }`;

  return query;
};

export const filerMenu = [
  { id: uuidv4(), to: "/", label: "Home", icon: FaHome },
  { id: uuidv4(), to: "/search/photos", label: "Photos", icon: FaCamera },
  {
    id: uuidv4(),
    to: "/search/illustration",
    label: "Illustration",
    icon: FaPaintBrush,
  },
  { id: uuidv4(), to: "/search/videos", label: "videos", icon: FaVideo },
  { id: uuidv4(), to: "/search/gifs", label: "Gifs", icon: FaFire },
];

export const searchQuery = (searchTerm) => {
  const query = `*[_type == 'post' && title match '${searchTerm}*' 
  || categories match '${searchTerm}*' 
  || keywords match '${searchTerm}*']{
    _id,
    title,
    categories,
    otherMedia{
      asset -> {
        url
      }
    },
    mainImage {
      asset -> {
        url
      }
    },
    keywords,
    description,
    _createdAt,
    users->{
      _id,
      displayName,
      photoURL
    },
    collections[]->{
    _id,
    displayName,
    photoURL
    },
    comments[]->{
      _id,
      comment,
      _createdAt,
      users->{
        _id,
        displayName,
        photoURL
      }
    }
  }`;
  return query;
};
