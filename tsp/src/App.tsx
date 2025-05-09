import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AnimatePresence } from 'framer-motion';

import Header from './components/Header';
import IntroSection from './components/IntroSection';
import TspSolver from './components/TspSolver';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <IntroSection />
          <TspSolver />
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;