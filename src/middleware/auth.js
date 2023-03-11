const userModel = require("../models/userModel")

function isAdmin(req, res, next) {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;
  
      userModel.findById(userId, (err, user) => {
        if (err || !user) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
  
        if (user.role !== 'admin') {
          return res.status(401).json({ message: 'Unauthorized' });
        }
  
        req.user = user;
        next();
      });
    } catch (err) {
      console.error(err);
      res.status(401).json({ message: 'Unauthorized' });
    }
  }


  module.exports ={isAdmin}