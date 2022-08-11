// Using TDD, create a function that given a list of integers, determine how many of them are divisible by 11. If you encounter an integer in the list that is greater than or equal to 111, return 0 regardless of how many members are divisible by 11. If the input is an empty array return 0 as well. Return an error if no input is provided.

//The following cases should succeed:
//1.	Input: [0, 11, 22, 33, 44]
//Output: 5
//2.	Input: [6, 33, 10, 9, 55]
//Output: 2
//3.	Input: [21, 2, 11, 70, 132]

const getDivisibleBy11 = (numbers) => {
  return numbers.reduce((previous, current) => {
    return current % 11 === 0 ? (previous += 1) : previous;
  }, 0);
};
module.exports = getDivisibleBy11;
