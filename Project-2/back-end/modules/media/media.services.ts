import { IMediaDoc } from "./media.interfaces";
import Media from "./media.model";

export const getMedia = async () => {
  return Media.find();
};
