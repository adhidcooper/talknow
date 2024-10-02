import React from 'react';

interface ToggleCheckboxProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Checkbox: React.FC<ToggleCheckboxProps> = ({ isOpen, onToggle }) => {
  return (
    <div className="flex items-center space-x-2">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={isOpen}
          onChange={onToggle}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:bg-lime-400 transition-colors"></div>
        <div className="w-5 h-5 bg-white border border-gray-300 rounded-full absolute left-0.5 top-0.5 peer-checked:left-5 peer-checked:border-lime-400 transition-all"></div>
      </label>
      <span className="text-gray-800 font-semibold">{isOpen ? 'Open' : 'Close'}</span>
    </div>
  );
};

export default Checkbox;
