import { shallowMount } from '@vue/test-utils'
import Basket from '@/utils/basket';
// import HelloWorld from '@/components/HelloWorld.vue'

// describe('HelloWorld.vue', () => {
//   it('renders props.msg when passed', () => {
//     const msg = 'new message'
//     const wrapper = shallowMount(HelloWorld, {
//       propsData: { msg }
//     })
//     expect(wrapper.text()).toMatch(msg)
//   })
// })


describe('Basket', () => {
  it('Adds the total of a single apple', () => {
    let basket: Basket = new Basket();
    basket.scan("apple");
    expect(basket.total()).toEqual(0.5);
  })

  it('Adds the total of 2 apples', () => {
    let basket: Basket = new Basket();
    basket.scan("apple");
    basket.scan("apple");
    expect(basket.total()).toEqual(1);
  })

  it('Expects an unidentified item to return 0', () => {
    let basket: Basket = new Basket();
    basket.scan('watermelon');
    expect(basket.total()).toEqual(0);
  })

  it('Expects 1 orange to cost 75p', () => {
    let basket: Basket = new Basket();
    basket.scan('orange');
    expect(basket.total()).toEqual(0.75);
  })
  
  it('Expects 2 oranges to cost 75p (BOGOF)', () => {
    let basket: Basket = new Basket();
    basket.scan('orange');
    basket.scan('orange');
    expect(basket.total()).toEqual(0.75);
  })

  it('Expects 3 oranges to cost £1.50 (BOGOF)', () => {
    let basket: Basket = new Basket();
    basket.scan('orange');
    basket.scan('orange');
    basket.scan('orange');
    expect(basket.total()).toEqual(1.50);
  })
  
  it('Expects 1 pear to cost £1', () => {
    let basket: Basket = new Basket();
    basket.scan('pear');
    expect(basket.total()).toEqual(1);
  })

  it('Expects 2 pears to cost £2', () => {
    let basket: Basket = new Basket();
    basket.scan('pear');
    basket.scan('pear');
    expect(basket.total()).toEqual(2);
  })

  it('Expects 3 pears to equal £2 (3 for 2)', () => {
    let basket: Basket = new Basket();
    basket.scan('pear');
    basket.scan('pear');
    basket.scan('pear');
    expect(basket.total()).toEqual(2);
  })

  it('Should reduce apple to 50p when 1 is reduced.', () => {
    let basket: Basket = new Basket();
    basket.scan('apple');
    basket.scan('apple');
    basket.total();
    basket.remove('apple')
    expect(basket.total()).toEqual(0.50);
  });

  it('Should remove the 3 for 2 discount if we remove a pear', () => {
    let basket: Basket = new Basket();
    basket.scan('pear');
    basket.scan('pear');
    basket.scan('pear');
    basket.total();
    basket.remove('pear');
    expect(basket.total()).toEqual(2)
  })
  it('Should not affect the price when an invalid item is removed', () => {
    let basket: Basket = new Basket();
    basket.scan('apple');
    basket.total();
    basket.remove('watermelon')
    expect(basket.total()).toEqual(0.50);
  });

  it('Should decrease stock when item is scanned (expected 2 apples)', () => {
    let basket: Basket = new Basket();
    basket.scan('apple');
    expect(basket.getStock('apple')).toEqual(2);
  })

  it('Should remain 3 apples in stock if we scan and remove item', () => {
    let basket: Basket = new Basket();
    basket.scan('apple');
    basket.remove('apple')
    expect(basket.getStock('apple')).toEqual(3);
  })

  it('should not allow users to remove stock if unavailable', () => {
    let basket: Basket = new Basket();
    basket.scan('pear');
    basket.scan('pear');
    basket.scan('pear');
    basket.scan('pear');
    basket.scan('pear');
    basket.scan('pear');
    basket.scan('pear');
    basket.scan('pear');
    basket.scan('pear');
    expect(basket.getStock('pear')).toEqual(0);
    expect(basket.total()).toEqual(4);
  })

  it('should return all stock to inventory when canceled', () => {
    let basket: Basket = new Basket();
    basket.scan('apple');
    basket.scan('apple');
    basket.scan('orange');
    basket.scan('orange');
    basket.scan('orange');
    basket.scan('pear');
    basket.cancel();
    expect(basket.getStock('apple')).toEqual(3)
    expect(basket.getStock('orange')).toEqual(10);
    expect(basket.getStock('pear')).toEqual(5);
  })

  it('should set total to 0 when canceled as no items are in the basket.', () => {
    let basket: Basket = new Basket();
    basket.scan('apple')
    basket.scan('apple')
    basket.scan('apple');
    basket.cancel();
    expect(basket.total()).toEqual(0);
  });

  it('should not let us remove an item if the quantitity is 0', () => {
    let basket: Basket = new Basket();
    basket.remove('apple');
    expect(basket.getQuantity('apple')).toEqual(0);
  })

  it('should add watermelon and should equal £1.50', () => {
    let basket: Basket = new Basket();
    basket.addItem('watermelon', 1.50, 5);
    basket.scan('watermelon');
    expect(basket.total()).toEqual(1.50);
  })

  it('should add watermelon and apply 3 for 2 discount and should equal £1.50', () => {
    let basket: Basket = new Basket();
    basket.addItem('watermelon', 1.50, 5, "3 for 2");
    basket.scan('watermelon');
    basket.scan('watermelon');
    basket.scan('watermelon');
    expect(basket.total()).toEqual(3);
  })

  it('should add watermelon and apply 3 for 2 discount and should equal £1.50', () => {
    let basket: Basket = new Basket();
    basket.addItem('watermelon', 1.50, 5, "bogof");
    basket.scan('watermelon');
    basket.scan('watermelon');
    expect(basket.total()).toEqual(1.50);
  });

  it('should remove 10% off the cost of a £1.50 water melon (£1.35)', () => {
    let basket: Basket = new Basket();
    basket.addItem('watermelon', 1.50, 5, "percent off", 10);
    basket.scan('watermelon');
    expect(basket.total()).toEqual(1.35);
  })

  it('Should return £1.50 if we attempt to apply a 0% discount', () => {
    let basket: Basket = new Basket();
    basket.addItem('watermelon', 1.50, 5, "percent off", 0);
    basket.scan('watermelon');
    expect(basket.total()).toEqual(1.50);
  })

  it('Should return £1.65 if we attempt to apply a -10% discount', () => {
    let basket: Basket = new Basket();
    basket.addItem('watermelon', 1.50, 5, "percent off", -10);
    basket.scan('watermelon');
    expect(basket.total()).toEqual(1.65);
  })

  it('Should return the quantity 6 if we add 6 items', () => {
    let basket: Basket = new Basket();
    basket.scan('apple');
    basket.scan('apple');
    basket.scan('orange');
    basket.scan('orange');
    basket.scan('orange');
    basket.scan('pear');
    basket.scan('pear');
    basket.remove('pear');
    expect(basket.totalQuantity()).toEqual(6);
  })
});
