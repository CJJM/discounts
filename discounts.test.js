const Cart = require('./discounts');

const shopList = {
    items: [
            {price: 5, quantity: 2, name: "Bread"},
            {price: 3, quantity: 1, name: "Apple"},
            {price: 10, quantity: 2, name: "Chicken"},
            {price: 6, quantity: 4, name: "Cheese"},
            {price: 1, quantity: 9, name: "Gum"}
          ]
}

test('Getting default total', () => {
  expect(Cart(shopList).getTotal()).toBe(66)
});
test('Applying discount 1 with default parameter array, proper discount', () => {
  expect(Cart(shopList).applyDiscount1().getDiscount()).toBe(5)
});
test('Applying discount 1 with default parameter array, proper total', () => {
  expect(Cart(shopList).applyDiscount1().getTotal()).toBe(61)
});
test('Applying discount 1 with user-defined array, proper discount', () => {
  expect(Cart(shopList).applyDiscount1(["Bread", "Gum", "Apple"]).getDiscount()).toBe(1)
});
test('Applying both discounts, prompting error', () => {
  expect(() => {
    Cart(shopList).applyDiscount1().applyDiscount2()
  }).toThrow('Discount used already')
});
test('Clearing discount', () => {
  expect(Cart(shopList).applyDiscount1().clearDiscount().getTotal()).toBe(66)
});
