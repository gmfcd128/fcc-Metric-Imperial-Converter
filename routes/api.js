'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  
  app.get('/api/convert', (req, res) => {
    const input = req.query.input;
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    
    if (initNum === 'invalid number' && initUnit === 'invalid unit') {
      return res.json('invalid number and unit');
    }
    if (initNum === 'invalid number') {
      return res.json('invalid number');
    }
    if (initUnit === 'invalid unit') {
      return res.json('invalid unit');
    }
    
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    
    const responseString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    
    res.json({
      initNum,
      initUnit,
      returnNum: parseFloat(returnNum.toFixed(5)),
      returnUnit,
      string: responseString
    });
  });

};
