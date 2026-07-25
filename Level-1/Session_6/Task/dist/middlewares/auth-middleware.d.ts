import type { NextFunction, Request, Response } from 'express';
export declare const validateToken: (req: Request, res: Response, next: NextFunction) => void;
export declare const validateAdminOnly: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=auth-middleware.d.ts.map