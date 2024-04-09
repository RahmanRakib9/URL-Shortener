import { NextFunction, Request, Response } from 'express';
import { urlServices } from '../services/url.service';

async function handleCreateNewShortURL(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const redirectURL = req.body.redirectURL;

    // if (!redirectURL) {
    //   TODO: handle api error
    // }

    const shortURL = await urlServices.createShortURL(redirectURL);
    res.json({
      success: true,
      message: 'Successfully generated short url',
      payload: shortURL,
    });
  } catch (error) {
    next(error);
  }
}

async function handleGetShortURLs(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const urls = await urlServices.getShortURLs();
    res.status(201).json({
      success: true,
      message: 'successfully retrieved urls',
      payload: urls,
    });
  } catch (error) {
    next(error);
  }
}

async function handleRedirectUserToGivenURL(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const shortId = req.params.shortId;
    const result = await urlServices.redirectUserToGivenURL(shortId);

    // if(!result)
    //   {
    //   TODO: handle api error
    //   }

    res.redirect(result?.redirectUrl as string);
  } catch (error) {
    next(error);
  }
}

async function handleGetAnalytics(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const shortId = req.params.shortId;
    const result = await urlServices.getAnalytics(shortId);

    res.status(200).json({
      totalClicks: result?.visitHistory.length,
      payload: result?.visitHistory,
    });
  } catch (error) {
    next(error);
  }
}

export const urlControllers = {
  handleCreateNewShortURL,
  handleRedirectUserToGivenURL,
  handleGetShortURLs,
  handleGetAnalytics,
};
