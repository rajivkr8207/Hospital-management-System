

function handleError(err,req,res,next){
    res.status(err.staus).json({
        message: err.message,
        // stack: err.stack
    })
    // next()
}

export default handleError;