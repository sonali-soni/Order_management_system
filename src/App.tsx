import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.scss';

const Home = React.lazy(() => import('./components/Home'));
const OrderList = React.lazy(() => import('./components/OrderList'));
const OrderDetail = React.lazy(() => import('./components/OrderDetail'));
const About = React.lazy(() => import('./components/About'));

const App: React.FC = () => {
  return (
    <div className="app">
      <Navbar />
      <main className="container">
        <Suspense fallback={<div role="status" aria-live="polite">Loading content, please wait...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/orders" element={<OrderList />} />
            <Route path="/order/:orderId" element={<OrderDetail />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

App.displayName = 'myApp';

export default App;
