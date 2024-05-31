/*Selecting the Cart elements*/
const btnCart=document.querySelector('#cart-icon');               //Slecting the button icon in the header using the id
const cart=document.querySelector('.cart');                       //Selecting the whole cart  using the class
const btnClose=document.querySelector('#cart-close');             //Selecting the cross icon in the cart using the id

btnCart.addEventListener('click',()=>{            //Anonymous function
  cart.classList.add('cart-active');             //Making the cart interface visible once the cart icon on the header is clicked, by adding a css 'cart-active' class 
});

btnClose.addEventListener('click',()=>{
  cart.classList.remove('cart-active');         //Closing the cart interface once the close icon on the header is clicked by removing the 'cart-active' class
});

/*As soon as the web page fully loads it calls the 'loadContent' function*/
document.addEventListener('DOMContentLoaded',loadContent);

function loadContent(){
  //Remove Book Items  From Cart
  let btnRemove=document.querySelectorAll('.cart-remove');
  btnRemove.forEach((btn)=>{                  //Selects all the elements with the class 'cart-remove' 
    btn.addEventListener('click',removeItem);     //Calls the removeItem once the 'cart-remove' button is clicked
  });

  //Product Item Change Event
  let qtyElements=document.querySelectorAll('#cart-quantity');
  qtyElements.forEach((input)=>{
    input.addEventListener('change',changeQty);
  });

  //Product Cart
  let cartBtns=document.querySelectorAll('.add-cart');
  cartBtns.forEach((btn)=>{
    btn.addEventListener('click',addCart);
  });
  updateTotal();
}

//Remove Item
function removeItem(){
  if(confirm('Are Your Sure to Remove')){         //Asks for the confirmation from the user to remove the product from the cart
    let title=this.parentElement.querySelector('.cart-product-title').innerHTML;
    itemList=itemList.filter(el=>el.title!=title);
    this.parentElement.remove();
    loadContent();
  }
}

//Change Quantity
function changeQty(){
  if(isNaN(this.value) || this.value<1){
    this.value=1;
  }
  loadContent();
}

let itemList=[];

//Add Cart
function addCart(){
 let book=this.parentElement;
 let title=book.querySelector('.product-title').innerHTML;
 let price=book.querySelector('.product-price').innerHTML;
 let imgSrc=book.querySelector('.product-img').src;
 //console.log(title,price,imgSrc);
 
 let newProduct={title,price,imgSrc}

 //Check Product already Exist in Cart
 if(itemList.find((el)=>el.title==newProduct.title)){
  alert("Product Already added in Cart");
  return;
 }else{
  itemList.push(newProduct);
 }

let newProductElement= createCartProduct(title,price,imgSrc);
let element=document.createElement('div');
element.innerHTML=newProductElement;
let cartBasket=document.querySelector('.cart-content');
cartBasket.append(element);
loadContent();
}

function createCartProduct(title,price,imgSrc){
  return `
  <div class="cart-box">
    <img src="${imgSrc}" class="cart-img">
    <div class="detail-box">
      <div class="cart-product-title">${title}</div>
    <div class="price-box">
      <div class="cart-price">${price}</div>
      <div class="cart-amt">${price}</div>
    </div>
    <label for="cart-quantity">Quantity</label>
      <input type="number" value="1" id="cart-quantity">

    <label for="color">Colour of the book</label>   
  <input type="color" id="color">

  <label for="quality">Quality of the book</label>
    <select>
      <option>Original</option>
      <option>High Copy</option>
    </select>
  </div>
  <i class="fa-solid fa-trash-can cart-remove" name="trash can"></i>            
</div>
  `;
}

function updateTotal()
{
  const cartItems=document.querySelectorAll('.cart-box');
  const totalValue=document.querySelector('.total-price');

  let total=0;

  cartItems.forEach(product=>{
    let priceElement=product.querySelector('.cart-price');
    let price=parseFloat(priceElement.innerHTML.replace("$.",""));
    let qty=product.querySelector('#cart-quantity').value;
    total+=Math.round((price*qty))/10*10;
    product.querySelector('.cart-amt').innerText="$."+(price*qty);

  });

  totalValue.innerHTML='$.'+total+".00";

  // Add Product Count in Cart Icon

  const cartCount=document.querySelector('.cart-count');
  let count=itemList.length;
  cartCount.innerHTML=count;

  if(count==0){
    cartCount.style.display='none';
  }else{
    cartCount.style.display='block';
  }
}