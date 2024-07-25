// const jwt = require('jsonwebtoken');

//library untuk membuat jwt
import jwt from 'jsonwebtoken';

//untuk menverifikasi jwt
const secretKey = process.env.JWT_SECRET || 'your-secret-key';

//memverivikasi token jwt yang dikirim lewat header 'Authorization'
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (token) {
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

export default authenticateJWT;

// req.headers.authorization: Mengambil header Authorization dari request.
// req.headers.authorization.split(' ')[1]: Memisahkan string header Authorization dengan spasi dan
// mengambil elemen kedua (token). Header Authorization dikirim dalam format Bearer <token>,
//  sehingga pemisahan ini mengambil token yang sebenarnya.

// req.user = user: Menyimpan payload token yang didekode ke dalam request object untuk digunakan
//  di route berikutnya.
// next(): Melanjutkan ke middleware atau route berikutnya jika token valid.