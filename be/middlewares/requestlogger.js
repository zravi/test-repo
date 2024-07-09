
const requestLogger = (req, res, next) => {
   
    console.log(`${req.method} ${req.url} - ${new Date().toLocaleString()}`);
    
   
    console.log('Headers:', req.headers);

   
    if (Object.keys(req.query).length > 0) {
        console.log('Query:', req.query);
    }

   
    if (req.method === 'POST' || req.method === 'PUT') {
        console.log('Body:', req.body);
    }

   
    next();
};

module.exports = requestLogger;
