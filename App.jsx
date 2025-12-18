import React, { useState, useEffect } from 'react';
import { Layout, Card, Button, Badge, Tag, message, Empty, Spin, Modal, Descriptions, Collapse } from 'antd';
import {
  ShoppingCartOutlined,
  UserOutlined,
  LogoutOutlined,
  AppstoreOutlined,
  OrderedListOutlined,
  ThunderboltOutlined,
  CheckCircleOutlined,
  CreditCardOutlined,
  DeleteOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import './App.css';

const { Header: AntHeader, Content } = Layout;

// API Configuration
const API_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// API Services
const authAPI = {
  login: async (email, password) => {
    const response = await api.get(`/users?email=${email}&password=${password}`);
    return response.data[0] || null;
  },
  signup: async ({ name, email, password, phone }) => {
    // check if email already exists
    const existing = await api.get(`/users?email=${email}`);
    if (existing.data && existing.data.length > 0) {
      throw new Error('Email already registered');
    }
    const response = await api.post('/users', { name, email, password, phone });
    return response.data;
  },
};

const packageAPI = {
  getAll: () => api.get('/packages'),
};

// Normalize a speed value so it includes 'Mbps' only once and with consistent capitalization.
const formatSpeed = (speed) => {
  if (speed === null || typeof speed === 'undefined') return '';
  const s = String(speed).trim();
  if (s.length === 0) return '';
  // If it already contains 'mbps' (any case), normalize to 'Mbps'
  if (/mbps/i.test(s)) {
    return s.replace(/mbps/i, 'Mbps').replace(/\s+/g, ' ').trim();
  }
  return `${s} Mbps`;
};

const cartAPI = {
  getAll: () => api.get('/cart'),
  add: (item) => api.post('/cart', item),
  remove: (id) => api.delete(`/cart/${id}`),
  clear: async () => {
    const items = await api.get('/cart');
    await Promise.all(items.data.map((item) => api.delete(`/cart/${item.id}`)));
  },
};

const transactionAPI = {
  getAll: () => api.get('/transactions'),
  create: (transaction) => api.post('/transactions', transaction),
  getByUserId: (userId) => api.get(`/transactions?userId=${userId}&_sort=createdAt&_order=desc`),
  delete: (id) => api.delete(`/transactions/${id}`),
};

// Login Component
const Login = ({ onLogin, onToggleToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password) {
      message.warning('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const user = await authAPI.login(email, password);
      if (user) {
        message.success('Login successful!');
        onLogin(user);
      } else {
        message.error('Invalid email or password');
      }
    } catch (error) {
      message.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

    return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-sky-200 to-emerald-200">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl">
          <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4">
            <AppstoreOutlined className="text-3xl md:text-4xl text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            DataNet Provider
          </h1>
          <p className="text-gray-600 mt-2">Your Gateway to Unlimited Internet</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="demo@user.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="demo123"
            />
          </div>

          <Button
            type="primary"
            loading={loading}
            onClick={handleSubmit}
            block
            size="large"
            className="bg-gradient-to-r from-purple-600 to-pink-600 border-0 h-12 mt-4"
          >
            Sign In
          </Button>

          <div className="text-center text-sm md:text-base text-gray-500 mt-4">
            Demo: demo@user.com / demo123
            <div className="mt-2">
              <a className="text-sm text-blue-600 hover:underline cursor-pointer" onClick={onToggleToSignUp}>Don't have an account? Sign up</a>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

// SignUp Component
  const SignUp = ({ onSignup, onToggleToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email || !password) {
      message.warning('Please fill in all required fields');
      return;
    }
    setLoading(true);
    try {
      const user = await authAPI.signup({ name, email, password, phone });
      message.success('Sign up successful! You are now logged in.');
      onSignup(user);
    } catch (err) {
      message.error(err.message || 'Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-sky-200 to-emerald-200">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl">
        <div className="text-center mb-8">
          <h1 className="text-xl md:text-2xl font-bold">Create an account</h1>
          <p className="text-gray-600 mt-2 text-sm md:text-base">Sign up to access your DataNet account</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="John Doe" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="you@email.com" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="Choose a password" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Phone (optional)</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="0812..." />
          </div>

          <Button type="primary" block size="large" loading={loading} onClick={handleSubmit} className="bg-gradient-to-r from-green-500 to-blue-500 border-0 h-12 mt-4">
            Create Account
          </Button>

          <div className="text-center text-sm text-gray-500 mt-4">
            Already have an account? <a className="text-blue-600 hover:underline cursor-pointer" onClick={onToggleToLogin}>Sign in</a>
          </div>
        </div>
      </Card>
    </div>
  );
};

// Header Component
const Header = ({ user, cartCount, currentView, onViewChange, onLogout }) => {
  return (
    <AntHeader className="bg-white shadow-md px-4 md:px-8 flex items-center justify-between">
      <div className="flex items-center space-x-2 md:space-x-4">
        <div
          className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent cursor-pointer"
          onClick={() => onViewChange('home')}
        >
          DataNet
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Button
          type={currentView === 'home' ? 'primary' : 'text'}
          icon={<AppstoreOutlined />}
          onClick={() => onViewChange('home')}
        >
          <span className="hidden md:inline">Packages</span>
        </Button>

        <Button
          type={currentView === 'transactions' ? 'primary' : 'text'}
          icon={<OrderedListOutlined />}
          onClick={() => onViewChange('transactions')}
        >
          <span className="hidden md:inline">Orders</span>
        </Button>

        <Badge count={cartCount} onClick={() => onViewChange('cart')} className="cursor-pointer">
          <ShoppingCartOutlined className="text-2xl text-gray-600" />
        </Badge>

        <div className="flex items-center space-x-2 px-2 md:px-3 py-1 bg-gray-100 rounded-lg">
          <UserOutlined />
          <span className="hidden md:inline text-sm">{user?.name}</span>
        </div>

        <Button type="text" danger icon={<LogoutOutlined />} onClick={onLogout} />
      </div>
    </AntHeader>
  );
};

// Package Card Component
const PackageCard = ({ pkg, onAddToCart, loading }) => {
  const gradientMap = {
    1: 'from-red-300 to-red-500',
    2: 'from-emerald-300 to-emerald-500',
    3: 'from-sky-300 to-sky-500',
    4: 'from-yellow-300 to-yellow-500',
  };

  const grad = gradientMap[pkg.id] || 'from-gray-300 to-gray-500';
  return (
    <Card
      className={`h-full flex flex-col hover:shadow-2xl transition-all duration-300 ${
        pkg.popular ? 'border-2 border-purple-500' : ''
      }`}
    >
      {pkg.popular && (
        <Tag
          icon={<TrophyOutlined />}
          color="gold"
          className="absolute top-4 right-4 font-semibold"
        >
          Popular
        </Tag>
      )}

      <div className="flex-1">
        <div className={`h-24 md:h-32 bg-gradient-to-br ${grad} rounded-lg flex items-center justify-center mb-4 shadow-lg`}> 
          <div className="text-center text-white drop-shadow-md">
              <div className="text-3xl md:text-5xl font-extrabold">Up to {formatSpeed(pkg.speed) || pkg.data}</div>
              <div className="text-xs md:text-sm opacity-90 mt-1">/month /bulan</div>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mb-2">{pkg.name}</h3>

        <div className="flex items-center space-x-2 mb-4 text-gray-600">
          <ThunderboltOutlined className="text-yellow-500" />
          <span>Up to {formatSpeed(pkg.speed) || pkg.data} /month</span>
        </div>

        {/* Collapsible description */}
        <div className="mb-6">
          <Collapse ghost expandIconPosition="right">
            <Collapse.Panel header="Details" key="1">
              <div className="space-y-2">
                {pkg.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                    <CheckCircleOutlined className="text-green-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </Collapse.Panel>
          </Collapse>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="text-3xl font-extrabold text-emerald-700 mb-4 drop-shadow-md">
          Rp {pkg.price.toLocaleString('id-ID')}
        </div>

        <Button
          type="default"
          block
          size="large"
          loading={loading}
          onClick={() => onAddToCart(pkg)}
          className={`bg-white text-gray-800 hover:brightness-95 border-0 py-3 ring-1 ring-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200`}        
        >
          Add to Cart
        </Button>
      </div>
    </Card>
  );
};

// Main App Component
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('home');
  const [packages, setPackages] = useState([]);
  const [cart, setCart] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addingToCart, setAddingToCart] = useState(null);

  // Fetch packages on mount
  useEffect(() => {
    if (isLoggedIn) {
      fetchPackages();
      fetchCart();
      fetchTransactions();
    }
  }, [isLoggedIn]);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const response = await packageAPI.getAll();
      setPackages(response.data);
    } catch (error) {
      message.error('Failed to load packages');
    } finally {
      setLoading(false);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await cartAPI.getAll();
      setCart(response.data);
    } catch (error) {
      console.error('Failed to load cart:', error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await transactionAPI.getByUserId(currentUser?.id);
      setTransactions(response.data);
    } catch (error) {
      console.error('Failed to load transactions:', error);
    }
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    Modal.confirm({
      title: 'Confirm Logout',
      content: 'Are you sure you want to logout?',
      onOk: () => {
        setIsLoggedIn(false);
        setCurrentUser(null);
        setCart([]);
        setTransactions([]);
        setCurrentView('home');
        message.success('Logged out successfully');
      },
    });
  };

  const handleAddToCart = async (pkg) => {
    setAddingToCart(pkg.id);
    try {
      const cartItem = {
        ...pkg,
        userId: currentUser.id,
        addedAt: new Date().toISOString(),
      };
      await cartAPI.add(cartItem);
      await fetchCart();
      message.success(`${pkg.name} added to cart!`);
    } catch (error) {
      message.error('Failed to add to cart');
    } finally {
      setAddingToCart(null);
    }
  };

  const handleRemoveFromCart = async (id) => {
    Modal.confirm({
      title: 'Cancel order',
      content: 'Are you sure you want to remove this item from your cart?',
      okText: 'Yes, cancel',
      okType: 'danger',
      onOk: async () => {
        try {
          await cartAPI.remove(id);
          await fetchCart();
          message.success('Item removed from cart');
        } catch (error) {
          message.error('Failed to remove item');
        }
      }
    });
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      message.warning('Cart is empty');
      return;
    }
    Modal.confirm({
      title: 'Confirm Purchase',
      content: `Are you sure you want to complete this purchase? Total: Rp ${cart.reduce((s, it) => s + it.price, 0).toLocaleString('id-ID')}`,
      okText: 'Yes, purchase',
      onOk: async () => {
        setLoading(true);
        try {
          // Create transactions
          for (const item of cart) {
            await transactionAPI.create({
              userId: currentUser.id,
              packageId: item.packageId || item.id,
              packageName: item.name,
              packageData: item.speed ? `${formatSpeed(item.speed)} /month` : item.data,
              price: item.price,
              duration: '/month /bulan',
              status: 'completed',
              createdAt: new Date().toISOString(),
            });
          }

          // Clear cart
          await cartAPI.clear();
          await fetchCart();
          await fetchTransactions();

          message.success('Order completed successfully!');
          setCurrentView('transactions');
        } catch (error) {
          message.error('Checkout failed. Please try again.');
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const handleDeleteTransaction = async (id) => {
    Modal.confirm({
      title: 'Delete order',
      content: 'Are you sure you want to delete this order? This action cannot be undone.',
      okText: 'Delete',
      okType: 'danger',
      onOk: async () => {
        try {
          await transactionAPI.delete(id);
          await fetchTransactions();
          message.success('Order deleted');
        } catch (error) {
          message.error('Failed to delete order');
        }
      }
    });
  };

  // Login View
  if (!isLoggedIn) {
    return showSignup ? (
      <SignUp onSignup={handleLogin} onToggleToLogin={() => setShowSignup(false)} />
    ) : (
      <Login onLogin={handleLogin} onToggleToSignUp={() => setShowSignup(true)} />
    );
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <Layout className="min-h-screen">
      <Header
        user={currentUser}
        cartCount={cart.length}
        currentView={currentView}
        onViewChange={setCurrentView}
        onLogout={handleLogout}
      />

      <Content className={`min-h-screen ${
        currentView === 'home' ? 'bg-gradient-to-br from-sky-50 to-sky-100' :
        currentView === 'cart' ? 'bg-gradient-to-br from-red-50 to-red-100' :
        currentView === 'transactions' ? 'bg-gradient-to-br from-emerald-50 to-emerald-100' : 'bg-gray-50'
      }`}>
        {/* Home View - Packages */}
        {currentView === 'home' && (
          <div>
            <div className="bg-gradient-to-r from-purple-800 to-indigo-900 text-white py-16">
              <div className="max-w-7xl mx-auto px-4 text-center">
                <h1 className="text-5xl font-bold mb-4">Stay Connected, Stay Unlimited</h1>
                <p className="text-xl opacity-90">Choose the perfect data package for your lifestyle</p>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Choose Your Package
              </h2>

              {loading ? (
                <div className="text-center py-12">
                  <Spin size="large" />
                </div>
              ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
                    {packages.map((pkg) => (
                      <PackageCard
                        key={pkg.id}
                        pkg={pkg}
                        onAddToCart={handleAddToCart}
                        loading={addingToCart === pkg.id}
                      />
                    ))}
                  </div>
              )}
            </div>
          </div>
        )}

        {/* Cart View */}
        {currentView === 'cart' && (
          <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

            {cart.length === 0 ? (
              <Card>
                <Empty
                  description="Your cart is empty"
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                >
                  <Button type="primary" onClick={() => setCurrentView('home')}>
                    Browse Packages
                  </Button>
                </Empty>
              </Card>
            ) : (
              <div className="space-y-6">
                {cart.map((item) => {
  // Match colors to package IDs
  const gradientMap = {
    1: 'from-red-300 to-red-500',      // Lite = Red
    2: 'from-emerald-300 to-emerald-500', // Power = Green
    3: 'from-sky-300 to-sky-500',      // Ultra = Blue
    4: 'from-yellow-300 to-yellow-500'  // Unlimited = Yellow
  };
  
  const borderColorMap = {
    1: '#ef4444',  // Red
    2: '#10b981',  // Green
    3: '#0ea5e9',  // Blue
    4: '#eab308'   // Yellow
  };

  const cardGradient = gradientMap[item.id] || 'from-gray-300 to-gray-500';
  const borderColor = borderColorMap[item.id] || '#9ca3af';

  return (
    <Card 
      key={item.id}
      className="border-l-4"
      style={{ borderLeftColor: borderColor }}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div className="flex items-start sm:items-center space-x-4 w-full sm:w-auto">
          <div className={`w-16 h-16 sm:w-16 sm:h-16 bg-gradient-to-br ${cardGradient} rounded-xl flex items-center justify-center text-white font-bold shadow-lg`}>
            <div className="text-base sm:text-xl">Up to {formatSpeed(item.speed) || item.data}</div>
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold">{item.name} Package</h3>
            <p className="text-sm md:text-base text-gray-600">
              Up to {formatSpeed(item.speed) || item.data} • /month /bulan
            </p>
          </div>
        </div>
        <div className="flex items-center sm:space-x-4 flex-col sm:flex-row mt-3 sm:mt-0 w-full sm:w-auto">
          <div className="text-right mr-0 sm:mr-4">
            <p className="text-xl md:text-2xl font-bold text-emerald-700">
              Rp {item.price.toLocaleString('id-ID')}
            </p>
          </div>
          <Button
            type="default"
            danger
            onClick={() => handleRemoveFromCart(item.id)}
            className="w-full sm:w-auto"
          >
            Cancel Order
          </Button>
        </div>
      </div>
    </Card>
  );
})}

                <Card>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xl font-semibold">Total</span>
                    <span className="text-3xl font-bold">
                      Rp {total.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <Button
                    type="primary"
                    size="large"
                    block
                    loading={loading}
                    onClick={handleCheckout}
                    icon={<CreditCardOutlined />}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 border-0"
                  >
                    Checkout Now
                  </Button>
                </Card>
              </div>
            )}
          </div>
        )}

        {/* Transactions View */}
        {currentView === 'transactions' && (
          <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">My Orders</h1>

            {transactions.length === 0 ? (
              <Card>
                <Empty description="No orders yet" image={Empty.PRESENTED_IMAGE_SIMPLE}>
                  <Button type="primary" onClick={() => setCurrentView('home')}>
                    Start Shopping
                  </Button>
                </Empty>
              </Card>
            ) : (
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <Card key={transaction.id}>
                    <Descriptions column={1} bordered>
                      <Descriptions.Item label="Package">
                        <strong className="break-words text-lg md:text-xl">{transaction.packageName}</strong>
                      </Descriptions.Item>
                      <Descriptions.Item label="Data">
                        {transaction.packageData}
                      </Descriptions.Item>
                      <Descriptions.Item label="Duration">
                        {transaction.duration}
                      </Descriptions.Item>
                      <Descriptions.Item label="Price">
                        <strong className="text-emerald-700">Rp {transaction.price.toLocaleString('id-ID')}</strong>
                      </Descriptions.Item>
                      <Descriptions.Item label="Date">
                        {new Date(transaction.createdAt).toLocaleString('id-ID')}
                      </Descriptions.Item>
                      <Descriptions.Item label="Status">
                        <Tag color="success" icon={<CheckCircleOutlined />}>
                          {transaction.status}
                        </Tag>
                      </Descriptions.Item>
                    </Descriptions>
                    <div className="mt-4 flex justify-end">
                      <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDeleteTransaction(transaction.id)}>
                        Delete Order
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </Content>
    </Layout>
  );
};

export default App;
