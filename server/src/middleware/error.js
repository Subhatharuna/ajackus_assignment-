function notFound(_req,res,_next){
    res.status(404).json({error:"Not Found"})
}

function errorHandler(err,_req,res,_next){
    console.error(err);
    if (err && err.code === 'SQLITE_CONSTRAINT') {
    return res.status(409).json({ error: "Email already exists, please enter another email." });
  }
  const status = err && err.status ? err.status : 500;
  res.status(status).json({ error: err && err.message ? err.message : 'Server error' });
}


module.exports = { notFound, errorHandler };