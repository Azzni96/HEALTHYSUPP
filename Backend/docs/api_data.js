define({ "api": [
  {
    "type": "post",
    "url": "/signin",
    "title": "User Signin",
    "name": "Signin",
    "group": "Authentication",
    "version": "1.0.0",
    "description": "<p>Authenticate a user.</p>",
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "email",
        "description": "<p>Email of the user.</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "password",
        "description": "<p>Password of the user.</p>"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Signin success message.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>Authenticated user details.</p>"
          }
        ]
      }
    },
    "filename": "routes/authRoutes.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/signup",
    "title": "User Signup",
    "name": "Signup",
    "group": "Authentication",
    "version": "1.0.0",
    "description": "<p>Create a new user account.</p>",
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "username",
        "description": "<p>Username for the user.</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "email",
        "description": "<p>Email of the user.</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "phone",
        "description": "<p>Phone number of the user.</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "password",
        "description": "<p>Password for the user.</p>"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Signup success message.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>Created user details.</p>"
          }
        ]
      }
    },
    "filename": "routes/authRoutes.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "delete",
    "url": "/feedback/:id",
    "title": "Delete Feedback",
    "name": "DeleteFeedback",
    "group": "Feedback",
    "version": "1.0.0",
    "description": "<p>Poista palaute ID:n perusteella.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Palautteen yksilöllinen ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Poiston onnistumisviesti.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "FeedbackNotFound",
            "description": "<p>Jos palautetta ei löydy.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Virhe-vastaus:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Feedback not found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/feedbackRoutes.js",
    "groupTitle": "Feedback"
  },
  {
    "type": "get",
    "url": "/feedback",
    "title": "Get All Feedback",
    "name": "GetFeedback",
    "group": "Feedback",
    "version": "1.0.0",
    "description": "<p>Retrieve all feedback submissions.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "feedback",
            "description": "<p>List of feedback submissions.</p>"
          }
        ]
      }
    },
    "filename": "routes/feedbackRoutes.js",
    "groupTitle": "Feedback"
  },
  {
    "type": "post",
    "url": "/feedback",
    "title": "Add Feedback",
    "name": "SubmitFeedback",
    "group": "Feedback",
    "version": "1.0.0",
    "description": "<p>Submit feedback from a user.</p>",
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "name",
        "description": "<p>Name of the user.</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "email",
        "description": "<p>Email of the user.</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "message",
        "description": "<p>Feedback message.</p>"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message.</p>"
          }
        ]
      }
    },
    "filename": "routes/feedbackRoutes.js",
    "groupTitle": "Feedback"
  },
  {
    "type": "post",
    "url": "/products",
    "title": "Add a Product",
    "name": "AddProduct",
    "group": "Products",
    "version": "1.0.0",
    "description": "<p>Add a new product to the catalog.</p>",
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "name",
        "description": "<p>Name of the product.</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "price",
        "description": "<p>Price of the product.</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "description",
        "description": "<p>Product description.</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "category",
        "description": "<p>Product category.</p>"
      },
      {
        "group": "Body",
        "type": "File[]",
        "optional": false,
        "field": "images",
        "description": "<p>Array of images for the product.</p>"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "product",
            "description": "<p>Created product details.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "product.id",
            "description": "<p>ID of the created product.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "product.name",
            "description": "<p>Name of the product.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "product.price",
            "description": "<p>Price of the product.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "product.category",
            "description": "<p>Category of the product.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "product.description",
            "description": "<p>Description of the product.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "product.image",
            "description": "<p>Comma-separated list of image filenames.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Error message.</p>"
          }
        ]
      }
    },
    "filename": "routes/productRoutes.js",
    "groupTitle": "Products"
  },
  {
    "type": "delete",
    "url": "/products/:id",
    "title": "Delete Product by ID",
    "name": "DeleteProductById",
    "group": "Products",
    "version": "1.0.0",
    "description": "<p>Delete a specific product by its ID.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The unique ID of the product to delete.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message confirming deletion.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Error message if the product is not found or cannot be deleted.</p>"
          }
        ]
      }
    },
    "filename": "routes/productRoutes.js",
    "groupTitle": "Products"
  },
  {
    "type": "get",
    "url": "/products",
    "title": "Get All Products",
    "name": "GetAllProducts",
    "group": "Products",
    "version": "1.0.0",
    "description": "<p>Retrieve all products in the catalog.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "products",
            "description": "<p>List of products.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "products.id",
            "description": "<p>ID of the product.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "products.name",
            "description": "<p>Name of the product.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "products.price",
            "description": "<p>Price of the product.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "products.category",
            "description": "<p>Category of the product.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "products.description",
            "description": "<p>Description of the product.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "products.image",
            "description": "<p>Comma-separated list of image filenames.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Error message.</p>"
          }
        ]
      }
    },
    "filename": "routes/productRoutes.js",
    "groupTitle": "Products"
  },
  {
    "type": "get",
    "url": "/products/:id",
    "title": "Get Product by ID",
    "name": "GetProductById",
    "group": "Products",
    "version": "1.0.0",
    "description": "<p>Retrieve details of a specific product by its ID.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The unique ID of the product.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "product",
            "description": "<p>Product details.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "product.id",
            "description": "<p>ID of the product.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "product.name",
            "description": "<p>Name of the product.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "product.price",
            "description": "<p>Price of the product.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "product.category",
            "description": "<p>Category of the product.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "product.description",
            "description": "<p>Description of the product.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "product.image",
            "description": "<p>Comma-separated list of image filenames.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Error message.</p>"
          }
        ]
      }
    },
    "filename": "routes/productRoutes.js",
    "groupTitle": "Products"
  },
  {
    "type": "get",
    "url": "/products/category/:category",
    "title": "Get Products by Category",
    "name": "GetProductsByCategory",
    "group": "Products",
    "version": "1.0.0",
    "description": "<p>Retrieve all products for a specific category.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>The category to filter products by.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "products",
            "description": "<p>List of products in the category.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "products.id",
            "description": "<p>ID of the product.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "products.name",
            "description": "<p>Name of the product.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "products.price",
            "description": "<p>Price of the product.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "products.category",
            "description": "<p>Category of the product.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "products.description",
            "description": "<p>Description of the product.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "products.image",
            "description": "<p>Comma-separated list of image filenames.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Error message.</p>"
          }
        ]
      }
    },
    "filename": "routes/productRoutes.js",
    "groupTitle": "Products"
  },
  {
    "type": "post",
    "url": "/api/purchase",
    "title": "Add Purchase",
    "name": "AddPurchase",
    "group": "Purchases",
    "version": "1.0.0",
    "description": "<p>Save purchase details to the database.</p>",
    "body": [
      {
        "group": "Body",
        "type": "Object",
        "optional": false,
        "field": "customerDetails",
        "description": "<p>Customer information (name, address, etc.).</p>"
      },
      {
        "group": "Body",
        "type": "Object",
        "optional": false,
        "field": "paymentDetails",
        "description": "<p>Payment information (card number, expiry date, etc.).</p>"
      },
      {
        "group": "Body",
        "type": "Array",
        "optional": false,
        "field": "cart",
        "description": "<p>List of purchased items.</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "total",
        "description": "<p>Total cost of the purchase.</p>"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message confirming the purchase was saved.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>The saved purchase details.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "error",
            "description": "<p>Error message if the purchase could not be saved.</p>"
          }
        ]
      }
    },
    "filename": "routes/purchaseRoutes.js",
    "groupTitle": "Purchases"
  },
  {
    "type": "delete",
    "url": "/api/purchase/:id",
    "title": "Delete Purchase",
    "name": "DeletePurchase",
    "group": "Purchases",
    "version": "1.0.0",
    "description": "<p>Delete a specific purchase record by its ID.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Unique ID of the purchase to be deleted.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message confirming the purchase was deleted.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Error message if the purchase is not found or could not be deleted.</p>"
          }
        ]
      }
    },
    "filename": "routes/purchaseRoutes.js",
    "groupTitle": "Purchases"
  },
  {
    "type": "get",
    "url": "/api/purchase",
    "title": "Get All Purchases",
    "name": "GetAllPurchases",
    "group": "Purchases",
    "version": "1.0.0",
    "description": "<p>Retrieve all purchase records from the database.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "purchases",
            "description": "<p>List of all purchase records.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "purchases.id",
            "description": "<p>Purchase ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "purchases.customerDetails",
            "description": "<p>Customer information.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "purchases.paymentDetails",
            "description": "<p>Payment details.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "purchases.cart",
            "description": "<p>List of items in the purchase.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "purchases.total",
            "description": "<p>Total cost of the purchase.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "error",
            "description": "<p>Error message if purchases could not be retrieved.</p>"
          }
        ]
      }
    },
    "filename": "routes/purchaseRoutes.js",
    "groupTitle": "Purchases"
  }
] });
