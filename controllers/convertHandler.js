function ConvertHandler() {

  this.getNum = function(input) {
    let result;
    const match = input.match(/^[\d./]+/);
    if (!match) {
      result = 1; // Default to 1 if no numerical input is provided
    } else {
      try {
        const numString = match[0];
        const parts = numString.split('/');
        if (parts.length > 2) {
          result = 'invalid number';
        } else {
          result = eval(numString);
        }
      } catch (e) {
        result = 'invalid number';
      }
    }
    return result;
  };

  this.getUnit = function(input) {
    const match = input.match(/[a-zA-Z]+$/);
    if (!match) {
      return 'invalid unit';
    }
    const unit = match[0].toLowerCase();
    const validUnits = ['gal', 'l', 'lbs', 'kg', 'mi', 'km'];
    if (validUnits.includes(unit)) {
      return unit === 'l' ? 'L' : unit;
    }
    return 'invalid unit';
  };

  this.getReturnUnit = function(initUnit) {
    const unitMap = {
      'gal': 'L',
      'L': 'gal',
      'lbs': 'kg',
      'kg': 'lbs',
      'mi': 'km',
      'km': 'mi'
    };
    return unitMap[initUnit] || 'invalid unit';
  };

  this.spellOutUnit = function(unit) {
    const spellOutMap = {
      'gal': 'gallons',
      'L': 'liters',
      'lbs': 'pounds',
      'kg': 'kilograms',
      'mi': 'miles',
      'km': 'kilometers'
    };
    return spellOutMap[unit];
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch(initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        result = 'invalid unit';
    }
    return result;
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const initUnitString = this.spellOutUnit(initUnit);
    const returnUnitString = this.spellOutUnit(returnUnit);
    const result = `${initNum} ${initUnitString} converts to ${returnNum.toFixed(5)} ${returnUnitString}`;
    return result;
  };

}

module.exports = ConvertHandler;
