import React from 'react';

interface ToggleCheckboxProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Checkbox: React.FC<ToggleCheckboxProps> = ({ isOpen, onToggle }) => (
  <div className="flex items-center">
    <input
      type="checkbox"
      checked={isOpen}
      onChange={onToggle}
      className="h-4 w-4 text-lime-400 border-gray-300 rounded focus:ring-lime-400"
    />
    <label className="ml-2 text-gray-700">{isOpen ? 'Open' : 'Close'}</label>
  </div>
);

export default Checkbox;
