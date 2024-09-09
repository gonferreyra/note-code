export function corsHandler(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.header('origin'));
  res.header(
    'Access-Control-Allow-Credentials',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  res.header('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }

  next();
}
