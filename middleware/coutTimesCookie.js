let count = 0;

let countTimesCookie = (req, res, next) => {
  if(req.cookies.user==='12345') {
    count++;
    console.log('<cookie>:', count);
  }
  next();

}

module.exports = countTimesCookie;