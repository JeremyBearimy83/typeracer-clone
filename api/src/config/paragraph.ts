import axios from "axios";

export default async () => {
  const { data } = await axios("http://metaphorpsum.com/paragraphs/1/4");
  return data;
};
