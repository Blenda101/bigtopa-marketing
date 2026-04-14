import React from 'react';
import { ValueCalculatorProvider } from '../../context/ValueCalculatorContext';
import Calculator from './Calculator';

const ValueCalculator: React.FC = () => {
  return (
    <ValueCalculatorProvider>
      <Calculator />
    </ValueCalculatorProvider>
  );
};

export default ValueCalculator;