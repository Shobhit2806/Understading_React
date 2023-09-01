import sum from "../sum";

test("Sum Fn", () => {
  const result = sum(3, 4);

  //   Assertion
  expect(result).toBe(7);
});
