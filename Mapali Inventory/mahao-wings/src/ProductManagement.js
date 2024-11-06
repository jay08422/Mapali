import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductManagement = () => {
    const [productList, setProductList] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        category: '',
        price: '',
        quantity: ''
    });
    const [editIndex, setEditIndex] = useState(null);
    const [message, setMessage] = useState(''); // New state for displaying messages

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        setProductList(storedProducts);
    }, []);

    const saveProducts = (products) => {
        localStorage.setItem('products', JSON.stringify(products));
        setProductList(products);
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        const { name, description, category, price, quantity } = newProduct;

        if (name && description && category && price && quantity) {
            const newProductList = [...productList, { name, description, category, price: parseFloat(price), quantity: parseInt(quantity) }];
            saveProducts(newProductList);
            setNewProduct({ name: '', description: '', category: '', price: '', quantity: '' }); // Clear the form
            setMessage('Product added successfully!'); // Display success message
        }
    };

    const handleUpdateProduct = () => {
        const updatedProductList = productList.map((product, index) => {
            if (index === editIndex) {
                return {
                    ...product,
                    description: newProduct.description,
                    category: newProduct.category,
                    price: parseFloat(newProduct.price),
                    quantity: parseInt(newProduct.quantity),
                };
            }
            return product;
        });

        saveProducts(updatedProductList);
        setMessage('Product updated successfully!'); // Display success message
        setEditIndex(null);
        setNewProduct({ name: '', description: '', category: '', price: '', quantity: '' }); // Clear the form
    };

    const handleDeleteProduct = (nameToDelete) => {
        const newProductList = productList.filter(product => product.name !== nameToDelete);
        saveProducts(newProductList);
        setMessage('Product deleted successfully!'); // Display success message
    };

    const handleEditClick = (index) => {
        setEditIndex(index);
        setNewProduct({ name: '', description: '', category: '', price: '', quantity: '' }); // Clear the form for editing
    };

    const handleCancelEdit = () => {
        setEditIndex(null);
        setNewProduct({ name: '', description: '', category: '', price: '', quantity: '' }); // Clear the form
    };

    return (
        <div style={styles.container}>
            <nav style={styles.navHeader}>
                <h1 style={styles.headerText}>Wings Cafe - Product Management</h1>
            </nav>

            <div style={styles.navButtons}>
                <Link to="/Dashboard" style={styles.link}>Dashboard</Link>
                <Link to="/ProductManagement" style={styles.link}>Product Management</Link>
                <Link to="/UserManagement" style={styles.link}>User Management</Link>
                <Link to="/PurchasesManagement" style={styles.link}>Purchases Management</Link>
            </div>

            {message && <div style={styles.message}>{message}</div>} {/* Display message */}

            <form onSubmit={editIndex === null ? handleAddProduct : handleUpdateProduct} style={styles.form}>
                <h3>{editIndex === null ? 'Add Product' : 'Edit Product'}</h3>
                <input type="text" name="product-name" placeholder="Product Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} required style={styles.input} />
                <input type="text" name="product-description" placeholder="Description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} required style={styles.input} />
                <input type="text" name="product-category" placeholder="Category" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} required style={styles.input} />
                <input type="number" name="product-price" placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} required style={styles.input} />
                <input type="number" name="product-quantity" placeholder="Initial Quantity" value={newProduct.quantity} onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })} required style={styles.input} />
                <button type="submit" style={styles.button}>{editIndex === null ? 'Add Product' : 'Update Product'}</button>
                {editIndex !== null && (
                    <button type="button" onClick={handleCancelEdit} style={styles.button}>Cancel</button>
                )}
            </form>

            <h3>Registered Products</h3>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.tableHeader}>Name</th>
                        <th style={styles.tableHeader}>Description</th>
                        <th style={styles.tableHeader}>Category</th>
                        <th style={styles.tableHeader}>Price</th>
                        <th style={styles.tableHeader}>Quantity</th>
                        <th style={styles.tableHeader}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {productList.map((product, index) => (
                        <tr key={index} style={styles.tableRow}>
                            <td style={styles.tableData}>{product.name}</td>
                            <td style={styles.tableData}>{product.description}</td>
                            <td style={styles.tableData}>{product.category}</td>
                            <td style={styles.tableData}>{product.price.toFixed(2)}</td>
                            <td style={styles.tableData}>{product.quantity}</td>
                            <td style={styles.tableData}>
                                <button onClick={() => handleEditClick(index)} style={styles.actionButton}>Edit</button>
                                <button onClick={() => handleDeleteProduct(product.name)} style={styles.actionButton}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        backgroundColor: 'palevioletred',
        padding: '20px',
    },
    navHeader: {
        backgroundColor: '#000435',
        color: 'white',
        padding: '20px',
        textAlign: 'center',
        borderRadius: '5px',
        marginBottom: '20px',
    },
    headerText: {
        margin: '0',
        fontSize: '24px',
    },
    navButtons: {
        marginTop: '10px',
        display: 'flex',
        justifyContent: 'center',
        border: '2px solid #000435',
        padding: '10px',
        borderRadius: '5px',
        backgroundColor: '#000435',
        marginBottom: '20px',
    },
    link: {
        textDecoration: 'none',
        color: 'aqua',
        fontSize: '18px',
        margin: '0 15px',
        padding: '10px 15px',
    },
    form: {
        backgroundColor: '#ffffff',
        borderRadius: '5px',
        padding: '15px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px',
    },
    input: {
        marginBottom: '10px',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '98%',
    },
    button: {
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        padding: '10px',
        borderRadius: '4px',
        transition: 'background-color 0.3s',
    },
    message: {
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        borderRadius: '4px',
        textAlign: 'center',
        marginBottom: '20px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
    },
    tableHeader: {
        backgroundColor: '#007bff',
        color: 'white',
        padding: '10px',
        textAlign: 'left',
    },
    tableRow: {
        borderBottom: '1px solid #ccc',
    },
    tableData: {
        padding: '10px',
    },
    actionButton: {
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        padding: '5px 10px',
        borderRadius: '5px',
        marginLeft: '5px',
        transition: 'background-color 0.3s',
    },
};

export default ProductManagement;
