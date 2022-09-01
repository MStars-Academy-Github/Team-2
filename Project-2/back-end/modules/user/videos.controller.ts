import { Request, Response } from "express";
import * as userService from "./user.services";

export const getVideos = async (req: Request, res: Response) => {
  const videos = await userService.getVideos();
  res.send(videos);
};
