import React from 'react';
import ValueCalculator from './components/ValueCalculator';
import { supabase } from './lib/supabase';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <ValueCalculator />
    </div>
  );
}

export default App;