import { NextFunction, Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

interface TokenData {
  token: string;
  expiresIn: number;
}

interface DataStoredInToken {
  email: string;
  name: string;
}

class Authentication {
  public authenticateToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization;
      if (token) {
        jwt.verify(token, 'secret', (err, decoded) => {
          if (err) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
              status: HttpStatus.UNAUTHORIZED,
              message: 'Unauthorized',
              payload: {}
            });
          }
          req['decoded'] = decoded;
          next();
        });
      } else {
        return res.status(HttpStatus.FORBIDDEN).json({
          status: HttpStatus.FORBIDDEN,
          message: 'Token required',
          payload: {}
        });
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @param data
   */
  public createToken(data): TokenData {
    try {
      const expiresIn = 60 * 60; // an hour
      const secret = 'secret';
      const dataStoredInToken: DataStoredInToken = {
        email: data.email,
        name: data.name
      };
      return jwt.sign(dataStoredInToken, secret, { expiresIn });
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @param token
   */
  public decodeToken(token: string) {
    const data = jwt.decode(token, { complete: true });
    return data;
  }
}

export default new Authentication();
