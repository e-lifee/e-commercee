# e-commercee

This project is an e-commerce web application developed using the PERN (PostgreSQL, Express, React, Node.js) technology stack.

## Login: 
Users must log in with their email and password before logging in. They receive warning messages when they try to log in with incorrect information.

<div style="display: flex; flex-direction: column; align-items: center;">
<img src='images/login.png' height=200 width=300 style="margin: 5px;">
<img src='images/wrongmail.png' height=200 width=300 style="margin: 5px;">
<img src='images/wrongpsw.png' height=200 width=300 style="margin: 5px;">
</div>

## Home Page:
After logging in, categories are listed on the home page. Users can view related products by clicking on categories.

<div style="display: flex; flex-direction: column; align-items: center;">
<img src='images/homectgrs.png' height=200 width=300 style="margin: 5px;">
<img src='images/listprdcts.png' height=200 width=300 style="margin: 5px;">
</div>

## Products:
After clicking on the category, products in the relevant category are listed. Users can add products to cart or favorites.

<div style="display: flex; flex-direction: column; align-items: center;">
<img src='images/addcart.png' height=200 width=300 style="margin: 5px;">
<img src='images/addfavs.png' height=200 width=300 style="margin: 5px;">
</div>

## Search Category/List Products:
Category searches can be made with the search bar and products belonging to this category are listed on another page.

<div style="display: flex; flex-direction: column; align-items: center;">
<img src='images/searchbar.png' height=80 width=200 style="margin: 5px;">
<img src='images/searchedprdcts.png' height=200 width=300 style="margin: 5px;">
<img src='images/anotherprdcts.png' height=200 width=300 style="margin: 5px;">
</div>

## Cart and Favorites:
Users can view their cart and favorite products and delete products from favorites or cart.

<div style="display: flex; flex-direction: column; align-items: center;">
<img src='images/cart.png' height=200 width=300 style="margin: 5px;">
<img src='images/favs.png' height=200 width=300 style="margin: 5px;">
<img src='images/deletecart.png' height=200 width=300 style="margin: 5px;">
</div>

## Make an Order:
Users can confirm their carts and be directed to order form page. In the form, user enter a customer id. If the customer does not exist, order isn't placed. Else, user is directed to the payment page.

<div style="display: flex; flex-direction: column; align-items: center;">
<img src='images/wrongcstmrid.png' height=200 width=300 style="margin: 5px;">
<img src='images/fillcartform.png' height=200 width=300 style="margin: 5px;">
</div>

## Payment:
Users enter their credit card information and click the "Complete" button to complete the order.
<div style="display: flex; flex-direction: column; align-items: center;">
<img src='images/creditcard.png' height=200 width=300 style="margin: 5px;">
<img src='images/fillcreditcard.png' height=200 width=300 style="margin: 5px;">
</div>

## Order Successfull:
Once the payment is confirmed, the user is redirected to a page showing that the order has been completed successfully. Order information is added to the database and the cart is emptied.
<div style="display: flex; flex-direction: column; align-items: center;">
<img src='images/confirmpayment.png' height=200 width=300 style="margin: 5px;">
<img src='images/chechcart.png' height=200 width=300 style="margin: 5px;">
<img src='images/checkdb.png' height=200 width=300 style="margin: 5px;">
<img src='images/checkdb2.png' height=200 width=300 style="margin: 5px;">
</div>

## Employees:
In "Our Team" page, user can see employees in the company.

## Suppliers:
In "About Us" page, user can see suppliers company work with.

## Logout:
<div style="display: flex; flex-direction: column; align-items: center;">
<img src='images/logout.png' height=200 width=95 style="margin: 5px;">
<img src='images/logoutpage.png' height=200 width=300 style="margin: 5px;">
</div>


# Requirements and Installation:
There are the following requirements to run the project:

-Node.js must be installed.
-'npm install' command can be used to install dependencies.
-PostgreSQL is used for database setup.













