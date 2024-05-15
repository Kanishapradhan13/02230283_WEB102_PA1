const http = require('http');
const fs = require('fs');
const { parse } = require('querystring');

// Define your resource schema and file path
const RESOURCE_FILE = 'products.json';
let products = [];

// Load initial data from file (if exists)
if (fs.existsSync(RESOURCE_FILE)) {
    const data = fs.readFileSync(RESOURCE_FILE, 'utf8');
    products = JSON.parse(data);
}

// Create HTTP server
const server = http.createServer((req, res) => {
    // Helper function to send response with appropriate status code and data
    const sendResponse = (statusCode, data) => {
        res.writeHead(statusCode, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
    };

    // Handle different HTTP methods and endpoints
    if (req.method === 'GET' && req.url === '/products') {
        // Handle GET /products
        sendResponse(200, products);
    } else if (req.method === 'GET' && req.url.startsWith('/products/')) {
        // Handle GET /products/:id
        const productId = req.url.split('/')[2];
        const product = products.find(p => p.id === productId);
        if (product) {
            sendResponse(200, product);
        } else {
            sendResponse(404, { message: 'Product not found' });
        }
    // Handle POST /products
    } else if (req.method === 'POST' && req.url === '/products') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const newProduct = JSON.parse(body);
                products.push(newProduct);
                fs.writeFileSync(RESOURCE_FILE, JSON.stringify(products, null, 2));
                sendResponse(201, newProduct);
            } catch (error) {
                sendResponse(400, { message: 'Invalid JSON format' });
            }
        });

    } else if (req.method === 'PUT' && req.url.startsWith('/products/')) {
        // Handle PUT /products/:id
        const productId = req.url.split('/')[2];
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const updatedProductData = JSON.parse(body);
                const existingProductIndex = products.findIndex(p => p.id === productId);
                if (existingProductIndex !== -1) {
                    // Update existing product properties
                    products[existingProductIndex] = updatedProductData;
                    // Write updated products to file (if necessary)
                    fs.writeFileSync(RESOURCE_FILE, JSON.stringify(products, null, 2));
                    // Return updated product as response
                    sendResponse(200, updatedProductData);
                } else {
                    sendResponse(404, { message: 'Product not found' });
                }
            } catch (error) {
                sendResponse(400, { message: 'Invalid JSON format' });
            }
        });
    
    } else if (req.method === 'PATCH' && req.url.startsWith('/products/')) {
        // Handle PATCH /products/:id
        const productId = req.url.split('/')[2];
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const updatedFields = JSON.parse(body);
                const existingProductIndex = products.findIndex(p => p.id === productId);
                if (existingProductIndex !== -1) {
                    // Update existing product properties
                    const updatedProduct = { ...products[existingProductIndex], ...updatedFields };
                    products[existingProductIndex] = updatedProduct;
                    // Write updated products to file (if necessary)
                    fs.writeFileSync(RESOURCE_FILE, JSON.stringify(products, null, 2));
                    // Return updated product as response
                    sendResponse(200, updatedProduct);
                } else {
                    sendResponse(404, { message: 'Product not found' });
                }
            } catch (error) {
                sendResponse(400, { message: 'Invalid JSON format' });
            }
        });
        
    } else if (req.method === 'DELETE' && req.url.startsWith('/products/')) {
        // Handle DELETE /products/:id
        const productId = req.url.split('/')[2];
        const index = products.findIndex(p => p.id === productId);
        if (index !== -1) {
            products.splice(index, 1);
            fs.writeFileSync(RESOURCE_FILE, JSON.stringify(products, null, 2));
            sendResponse(200, { message: 'Product deleted successfully' });
        } else {
            sendResponse(404, { message: 'Product not found' });
        }
    } else {
        // Handle 404 Not Found
        sendResponse(404, { message: 'Endpoint not found' });
    }
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
