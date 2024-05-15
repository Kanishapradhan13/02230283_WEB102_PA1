# Setup
To start this server, first clone this repo and run the javascript file using node ("node index.js")
now we can send the CRUD requests in postman.

# Endpoints 
# GET /products: Retrieve a list of all products.
- when you send this request to the server you'll get the list of all the products available in a json format.

# GET /products/:id: Retrieve a specific product by its ID.
- sending this request will give you the product you have searched for by their id.
- eg request: http://localhost:3000/products/1

# POST /products: Create a new product.
- sending this request will create a new product in a json format when we give the body in a json format.
- eg request: http://localhost:3000/products
- eg body:{
    "id": "4",
    "productName": "Tablet",
    "productPrice": 35000,
    "amount": 15
}

# PUT /products/:id: Update an existing product by its ID.
- sending this request will update the whole existing product
- eg request: http://localhost:3000/products/4
- eg body: {
    "id": "2",
    "productName": "phones",
    "productPrice": 35000,
    "amount": 15

} 

# PATCH /products/:id: Partial update of an existing product by its ID.
- sending this request will update only some part of the product. Whatever we have inserted in the body to be changed will be updated in the json file.
- eg request: http://localhost:3000/products/3
- eg body: {
    "productName": "Updated headphones"

}

# DELETE /products/:id: Delete a product by its ID.
- sending this request will delete the particular product which you have choosen in the request and give back a success message.
- eg request : http://localhost:3000/products/3
- success message: "product deleted successfully"


  
