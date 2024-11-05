export function sumNumbers(...nums) {
  return nums.reduce((prev, curr) => prev + curr, 0);
}
