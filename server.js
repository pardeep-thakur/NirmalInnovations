const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from 'public' directory and repository root
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname));

// Seed Data from Staging Portal (https://staging.nirmalinnovations.com)
const { STAGING_STATIONS, STAGING_MACHINES, STAGING_PRODUCTS } = require('./public/js/staging-data.js');

let vmStations = [...STAGING_STATIONS];
let machines = [...STAGING_MACHINES];
let products = [...STAGING_PRODUCTS];

let customers = [
  { id: '1', name: 'jobin mackwan', email: 'xyz@gmail.com', contact: '1234567890', balance: 416.00, billing: 'Pre-Paid', city: 'Ahmedabad' },
  { id: '2', name: 'Nirmal Panchal', email: '123@123.co', contact: '9925069523', balance: 297.00, billing: 'Pre-Paid', city: 'Ahmedabad' },
  { id: '3', name: 'N P', email: '123@123.co', contact: '9825069523', balance: 4471.00, billing: 'Post-Paid', city: 'Baroda' },
  { id: '4', name: 'Ruchi as', email: 'assd@gmail.com', contact: '1234567891', balance: 4459.00, billing: 'Pre-Paid', city: 'Ahmedabad' },
  { id: '5', name: 'testa testa', email: 'nirmalpanc444@gmail.com', contact: '9106897179', balance: 4825.00, billing: 'Pre-Paid', city: 'Surat' },
  { id: '6', name: 'DND Demo', email: 'demo@gmail.com', contact: '9897665464', balance: -35796.00, billing: 'Post-Paid', city: 'Rajkot' },
  { id: '7', name: 'Hiren bhai Rathod', email: 'hir_2288@yahoo.com', contact: '8866041036', balance: 220.00, billing: 'Pre-Paid', city: 'Ahmedabad' },
  { id: '8', name: 'demoone demoone', email: 'asjddsaoi@gmail.com', contact: '6786543212', balance: 4985.00, billing: 'Pre-Paid', city: 'Gandhinagar' },
  { id: '9', name: 'reasd sf', email: 'virendrasinghshekhawat4@gmail.com', contact: '5412545641', balance: 620.00, billing: 'Pre-Paid', city: 'Jaipur' },
  { id: '10', name: 'demoqwer Mehta', email: 'asdgiuygih@gmail.com', contact: '9598714254', balance: 100.00, billing: 'Pre-Paid', city: 'Ahmedabad' }
];

// API Endpoints

// Stats API
app.get('/api/stats', (req, res) => {
  res.json({
    success: true,
    data: {
      vmStations: vmStations.length,
      machines: machines.length,
      products: products.length,
      customers: 71,
      totalBalance: customers.reduce((sum, c) => sum + c.balance, 0)
    }
  });
});

// VM Stations API (GET, POST, DELETE)
app.get('/api/stations', (req, res) => {
  res.json({ success: true, data: vmStations });
});

app.post('/api/stations/add', (req, res) => {
  const { name, code, address, phone, email, country, state, city, zip, latitude, longitude } = req.body;
  if (!name || !code) {
    return res.status(400).json({ success: false, message: 'Station Name and Code are required.' });
  }

  const newStation = {
    id: String(Date.now()),
    name,
    code,
    address: address || 'Ahmedabad Gujarat India',
    latitude: latitude || '23.0225',
    longitude: longitude || '72.5714',
    phone: phone || '9876543210',
    email: email || 'station@nirmal.com',
    country: country || 'India',
    state: state || 'Gujarat',
    city: city || 'Ahmedabad',
    zip: zip || '380001',
    status: 'Enabled'
  };

  vmStations.unshift(newStation);
  res.json({ success: true, message: 'VM Station added successfully!', data: newStation });
});

app.delete('/api/stations/:id', (req, res) => {
  const id = req.params.id;
  vmStations = vmStations.filter(s => s.id !== id);
  res.json({ success: true, message: `Station #${id} deleted successfully.` });
});

// Machines API (GET, POST, DELETE)
app.get('/api/machines', (req, res) => {
  res.json({ success: true, data: machines });
});

app.post('/api/machines/add', (req, res) => {
  const { name, code, serialNumber, station, type, vendor, status } = req.body;
  if (!code || !serialNumber) {
    return res.status(400).json({ success: false, message: 'Machine Code and Serial Number are required.' });
  }

  const newMachine = {
    id: String(Date.now()),
    no: machines.length + 1,
    name: name || code,
    station: station || 'ASD',
    code,
    serialNumber,
    type: type || 'Product Machine',
    status: status || 'Active',
    vendor: vendor || 'Nirmal'
  };

  machines.unshift(newMachine);
  res.json({ success: true, message: 'Machine added successfully!', data: newMachine });
});

app.delete('/api/machines/:id', (req, res) => {
  const id = req.params.id;
  machines = machines.filter(m => m.id !== id);
  res.json({ success: true, message: `Machine #${id} deleted successfully.` });
});

// Customers API (GET, POST, DELETE)
app.get('/api/customers', (req, res) => {
  res.json({ success: true, data: customers });
});

app.post('/api/customers/add', (req, res) => {
  const { firstName, lastName, email, mobile, billing, city, address } = req.body;
  if (!firstName || !email || !mobile) {
    return res.status(400).json({ success: false, message: 'First Name, Email, and Mobile are required.' });
  }

  const newCustomer = {
    id: String(Date.now()),
    name: `${firstName} ${lastName || ''}`.trim(),
    email,
    contact: mobile,
    balance: 0.00,
    billing: billing || 'Pre-Paid',
    city: city || 'Ahmedabad',
    address: address || ''
  };

  customers.unshift(newCustomer);
  res.json({ success: true, message: 'Customer added successfully!', data: newCustomer });
});

app.delete('/api/customers/:id', (req, res) => {
  const id = req.params.id;
  customers = customers.filter(c => c.id !== id);
  res.json({ success: true, message: `Customer #${id} deleted successfully.` });
});

// Products API (GET, POST, DELETE)
app.get('/api/products', (req, res) => {
  res.json({ success: true, data: products });
});

app.post('/api/products/add', (req, res) => {
  const { machine, name, uom, unitSize, price, gst, mrp } = req.body;
  if (!name || !machine) {
    return res.status(400).json({ success: false, message: 'Product Name and Machine selection are required.' });
  }

  const newProduct = {
    id: String(Date.now()),
    machine,
    name,
    image: 'default_product.jpg',
    uom: uom || 'Piece',
    unitSize: unitSize || '1',
    price: parseFloat(price) || 10.00,
    gst: parseFloat(gst) || 0.00,
    mrp: parseFloat(mrp) || parseFloat(price) || 10.00,
    minQty: '1',
    status: 'Enabled'
  };

  products.unshift(newProduct);
  res.json({ success: true, message: 'Product added successfully!', data: newProduct });
});

app.delete('/api/products/:id', (req, res) => {
  const id = req.params.id;
  products = products.filter(p => p.id !== id);
  res.json({ success: true, message: `Product #${id} deleted successfully.` });
});

// Balance Add API
app.post('/api/balance/add', (req, res) => {
  const { customerId, amount } = req.body;
  const numAmount = parseFloat(amount);
  
  if (isNaN(numAmount) || numAmount <= 0) {
    return res.status(400).json({ success: false, message: 'Please provide a valid positive amount.' });
  }

  const cust = customers.find(c => c.id === customerId || c.name.toLowerCase().includes((customerId || '').toLowerCase()));
  if (cust) {
    cust.balance += numAmount;
  }

  res.json({
    success: true,
    message: `Successfully added $${numAmount.toFixed(2)} balance!`,
    data: { transactionId: 'TXN-' + Math.floor(100000 + Math.random() * 900000), amount: numAmount }
  });
});

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  const fs = require('fs');
  const rootIndex = path.join(__dirname, 'index.html');
  if (fs.existsSync(rootIndex)) {
    return res.sendFile(rootIndex);
  }
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start express server
app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`🚀 Nirmal Innovations Admin Dashboard Server Ready!`);
  console.log(`🌐 Live URL: http://localhost:${PORT}`);
  console.log(`==================================================`);
});
