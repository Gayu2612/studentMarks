// /**
//  * @author Viveka S
//  * @date  16-04-2022
//  * @description Authentication Methods
//  */

// import * as auth from 'basic-auth';
// import { clientError } from '../helper/ErrorMessage';

// export let basicAuthUser = function (req, res, next) {
//     var credential = auth(req);
//     if (!credential || credential.name != process.env.basicAuthUser || credential.pass != process.env.basicAuthKey) {
//         return res.status(401).json({
//             success: false,
//             statusCode: 409,
//             message: clientError.token.unauthRoute
//         });
//     } else {
//         next();
//     }
// }