
describe("calc#compute", function() {

  it('should add two numbers', function() {
    var array = ["3", "+", "4"];
    expect(calc.compute(array)).toEqual(7);
  });

  it('should subtract two numbers', function() {
    var array = ["5", "-", "12"];
    expect(calc.compute(array)).toEqual(-7);
  });

  it('should multiply two numbers', function() {
    var array = ["6", "*", "4"];
    expect(calc.compute(array)).toEqual(24);
  });

  it('should divide two numbers', function() {
    var array = ["8", "/", "4"];
    expect(calc.compute(array)).toEqual(2);
  });

  it('should return infinity when dividing by 0', function() {
    var array = ["8", "/", "0"];
    expect(calc.compute(array)).toEqual(Infinity);
  });

  it('returns floats when necessary', function() {
    var array = ["3", "/", "4"];
    expect(calc.compute(array)).toEqual(0.75);
  });

  it('parses floats correctly', function() {
    var array = ["3.2", "+", "5.365"];
    expect(parseFloat(calc.compute(array).toPrecision(12))).toEqual(8.565);
  });

   it('calculates exponents', function() {
    var array = ["2", "^", "3"];
    expect(calc.compute(array)).toEqual(8);
  });
 });

describe('box#populateCurrent', function() {

  beforeEach(function() {
    box.current = "";
    box.result = false;
    box.history = [null, null, null];
  });

  it('sets the current input string to the user input', function() {
    box.populateCurrent("3");
    expect(box.current).toEqual("3");
  });

  it('does not concatenate the input string when multiple 0s are entered and value is 0', function() {
    box.populateCurrent("0");
    box.populateCurrent("0");
    box.populateCurrent("0");
    expect(box.current).toEqual("0");
  });

 it('does concatenate the input string when multiple 0s are entered and value is not 0', function() {
    box.current = "2";
    box.populateCurrent("0");
    box.populateCurrent("0");
    box.populateCurrent("0");
    expect(box.current).toEqual("2000");
  });

 it('concatenates non-zero inputs', function() {
    box.current = "0";
    box.populateCurrent("1");
    box.populateCurrent("2");
    box.populateCurrent("3");
    expect(box.current).toEqual("123");
  });

 it('appends inputs to the end of decimals', function() {
    box.current = "0.";
    box.populateCurrent("1");
    box.populateCurrent("2");
    box.populateCurrent("3");
    expect(box.current).toEqual("0.123");
    box.current = "3.";
    box.populateCurrent("1");
    expect(box.current).toEqual("3.1");
    box.current = "3.22";
    box.populateCurrent("1");
    expect(box.current).toEqual("3.221");
  });

 it('overwrites the current string when the current string is a calculation result', function() {
    box.current = "2295";
    box.result = true;
    box.populateCurrent("3");
    box.populateCurrent("2");
    expect(box.current).toEqual("32");
  });

  it('sets the result flag to false if true', function() {
    box.current = "2295";
    box.result = true;
    box.populateCurrent("3");
    expect(box.result).toBe(false);
  });
});

describe('box#memset', function() {

  it('should set the stored memory value to the current string', function() {
    box.current = "12345";
    box.memset();
    expect(box.m).toEqual("12345");
  });
});

describe('box#memrecall', function() {

  it('should set current string to the stored memory value', function() {
    box.m = "54321";
    box.memrecall();
    expect(box.current).toEqual("54321");
  });
});

describe('box#negate', function() {

  it('should multiply the current input string by -1', function() {
    box.current = "54321";
    box.negate();
    expect(box.current).toEqual(-54321);
    box.negate();
    expect(box.current).toEqual(54321);
  });

  it('does not multiply the current string by -1 if current string is 0', function() {
    box.current = "0";
    box.negate();
    expect(box.current).toEqual("0");
  });
  
  it('should return a blank input string if input is blank', function() {
    box.current = "";
    box.negate();
    expect(box.current).toEqual("");
  });
});

describe('box#dot', function() {

  it('positions decimal correctly when the current string is 0', function() {
    box.current = "0";
    box.dot();
    expect(box.current).toEqual("0.");
  });

  it('does not add a decimal if the current string already contains a decimal', function() {
    box.current = "3.2";
    box.dot();
    expect(box.current).toEqual("3.2");
  })
});

describe('box#back', function() {

  it('removes the last input from the input string', function() {
    box.current = "1234";
    box.back();
    expect(box.current).toEqual("123");
  });

  it('does not remove the last input when the current string is 0', function() {
    box.current = "0";
    box.back();
    expect(box.current).toEqual("0");
  });

  it('sets the current string to 0 when the current string is a single non-zero digit', function() {
    box.current = "4";
    box.back();
    expect(box.current).toEqual("0");
  });

   it('does not remove the last input when the current string is a result', function() {
    box.current = "2345";
    box.result = true;
    box.back();
    box.back();
    expect(box.current).toEqual("2345");
  });
});

describe('this#clear', function() {

  beforeEach(function() {
    box.current = "345";
    box.result = true;
    box.inputs = ["1", "*"];
  })

  it('sets the current string to 0', function() {
    box.clear();
    expect(box.current).toEqual("");
  });

  it('sets the result flag to false', function() {
    box.clear();
    expect(box.result).toBe(false);
  });

  it('empties the input array', function() {
    box.clear();
    expect(box.inputs[0]).toBeNull();
    expect(box.inputs[1]).toBeNull();
    expect(box.inputs[2]).toBeNull();
  });
});

describe('box#pi', function() {

  it('sets the current input to pi', function() {
    box.current = "123";
    box.pi();
    expect(box.current).toEqual("3.14159265359");
  });

  it('sets the result flag to true', function() {
    box.current = "0";
    box.pi();
    expect(box.result).toBe(true);
  });
});

describe('box#sqroot', function() {

  it('sets the current input to the square root of the current input', function() {
    box.current = "36";
    box.sqroot();
    expect(box.current).toEqual(6);
  });

  it('sets the result flag to true', function() {
    box.current = "20";
    box.sqroot();
    expect(box.current).toEqual(4.47213595499958);
    expect(box.result).toBe(true);
  });
});

describe('box#populateOperators', function() {

  beforeEach(function() {
    box.showHistory = jasmine.createSpy("showHistory() spy");
    box.hideHistory = jasmine.createSpy("hideHistory() spy");
    box.clear();
});
 

  it('populates an operator in the input array and sets current input to 0', function() {
    box.current = "12";
    box.populateOperators("-");
    expect(box.current).toEqual("");
    expect(box.inputs).toEqual(["12", "-", null]);
  });

  it('sets the first number to 0 if the first input is an operator', function() {
    box.populateOperators("*");
    expect(box.current).toEqual("");
    expect(box.inputs).toEqual([0, "*", null]);
  });

  it('if the last input was an operator, it updates the operator to the new operator', function() {
    box.inputs = ["3", "-", null];
    box.populateOperators("*");
    box.populateOperators("/");
    expect(box.inputs).toEqual(["3", "/", null]);
    expect(box.result).toBe(false);
  });

  it('if the input array has a length of 3 already, calc the array', function() {
    box.inputs = ["3", "-", null];
    box.current = "5";
    box.populateOperators("*");
    expect(box.inputs).toEqual([-2, "*", null]);
    expect(box.result).toBe(true);
  });

   it('correctly performs a second calc', function() {
    box.inputs = ["3", "+", null];
    box.current = "5";
    box.populateOperators("*");
    expect(box.inputs).toEqual([8, "*", null]);
    box.populateOperators("-");
    expect(box.inputs).toEqual([8, "-", null]);
    box.populateCurrent("6");
    box.populateOperators("*");
    expect(box.inputs).toEqual([2, "*", null]);
    expect(box.result).toBe(true);
  });
});

describe('box#calcResult', function() {

  beforeEach(function() {
    box.clear();
  });

    it('does not do anything if the input array is empty', function() {
      box.calcResult();
      expect(box.current).toEqual("");
    });

    it('sets current string to first input array value if inputs array has only one value', function() {
      box.inputs = ["2", null, null];
      box.calcResult();
      expect(box.current).toEqual("2");
      box.inputs = ["4.3", "*", null];
      box.calcResult();
      expect(box.current).toEqual("4.3");
    });

    it('sets current string to the result of the operation if inputs array size = 3', function() {
      box.inputs = ["2", "*", "4"];
      box.calcResult();
      expect(box.current).toEqual(8);
    });
  });

describe('box#equals', function() {

  beforeEach(function() {
    box.clear();
  });

    it('does not do anything if the input array is empty', function() {
      box.equals();
      expect(box.current).toEqual("");
      expect(box.result).toBe(true);
      expect(box.inputs[0]).toBeNull;
    expect(box.inputs[1]).toBeNull;
    expect(box.inputs[2]).toBeNull;
    });

    it('sets current string to first input array value if inputs array has only one value', function() {
      box.inputs = ["2", null, null];
      box.equals();
      expect(box.current).toEqual("2");
      expect(box.result).toBe(true);
      expect(box.inputs[0]).toBeNull;
      expect(box.inputs[1]).toBeNull;
      expect(box.inputs[2]).toBeNull;
    });

     it('ignores the operator if equals is called directly after an operator is entered', function() {
      box.inputs = ["2", "+"];
      box.equals();
      expect(box.current).toEqual("2");
      expect(box.result).toBe(true);
      expect(box.inputs[0]).toBeNull;
    expect(box.inputs[1]).toBeNull;
    expect(box.inputs[2]).toBeNull;
    });

    it('sets current string to the result of the operation if inputs array size = 3', function() {
      box.inputs = ["5", "*", "4"];
      box.equals();
      expect(box.current).toEqual(20);
      expect(box.result).toBe(true);
      expect(box.inputs[0]).toBeNull;
    expect(box.inputs[1]).toBeNull;
    expect(box.inputs[2]).toBeNull;
    });
  });


describe('integration', function() {

  beforeEach(function() {
    box.clear();
  });

    it('integration test 1', function() {
      box.populateCurrent("3");
      box.dot();
      box.populateOperators("*")
      expect(box.inputs).toEqual(["3.", "*", null]);
      box.populateCurrent("1");
      box.populateCurrent("2");
      box.back();
      box.back();
      box.back();
      expect(box.current).toEqual("0");
      box.populateCurrent("2");
      box.populateCurrent("0");
      expect(box.current).toEqual("20");
      box.memset();
      box.pi();
      expect(box.current).toEqual("3.14159265359");
      box.populateOperators("-");
      expect(box.inputs).toEqual([9.424777960770001, "-", null]);
      box.populateOperators("+");
      expect(box.inputs).toEqual([9.424777960770001, "+", null]);
      box.populateCurrent("1");
      box.memrecall();
      expect(box.current).toEqual("20");
      box.equals();
      expect(box.current).toEqual(29.42477796077);
    });
  });