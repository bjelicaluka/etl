
// calculate the number of the lines in the code
export const calculateCodeLines = (code) => {
  // add 1 in the end in case the user omits last newline in the code
  return (code.match(/\n/g) || []).length + 1;
}

// calculate the height of the field for the number of code lines
export const calculateAreaSize = (numOfLines) => {
  // 30 is optimal value for one line height
  return numOfLines * 30;
}