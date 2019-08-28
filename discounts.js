const Cart = (obj) => {
  let discounts = 0;
  let isDiscounted = false;

  let getSubtotal = () => obj.items.reduce((total, curr) => total + curr.price * curr.quantity, 0);

  // non-arrow function syntax for method chaining
  // if 3 or more items on discounted list are in shopping cart, discount 1 item of cheapest price fully
  let applyDiscount1 = function(discountedItems = ["Bread", "Chicken", "Cheese"]) {
    if(isDiscounted) {
      throw Error('Discount used already');
    }
		let cartSales = obj.items.filter((el) => discountedItems.includes(el.name));
		if(cartSales.length > 2) {
			cartSales.sort((a,b) => b.price - a.price);
			let cheapest = cartSales.pop().price;
			discounts += cheapest;
			console.log(`Applied discount #1. discount is now ${discounts}`);
      isDiscounted = !isDiscounted;
      return this;
    } else {
	     throw "Discount 1 Failed";
    }
  }

  // non-arrow function syntax for method chaining
  // for every pair of items between the first and second items provided, discount half of second item's price
  let applyDiscount2 = function() {
    if(isDiscounted) {
      throw Error('Discount used already');
    }
    try {
      let itemCountA = obj.items[0].quantity;
      let itemCountB = obj.items[1].quantity;

      for(let i = 0; i < itemCountB; i++) {
        if(itemCountA > 0) {
          discounts += +(obj.items[1].price/2).toFixed(2);
          itemCountA--;
        }
      }
      console.log(`Applied discount #2. discount is now ${discounts}`);
      isDiscounted = !isDiscounted;
      return this;
    } catch(e) {
      throw Error('Discount 2 failed: '.concat(e));
    }
  }

  let getDiscount = () => discounts;
  let clearDiscount = function() {
    isDiscounted = false;
    discounts = 0;
    return this;
  }
  let getTotal = () => getSubtotal() - getDiscount();

  return {getSubtotal, getDiscount, getTotal, applyDiscount1, applyDiscount2, clearDiscount};
}

module.exports = Cart;
