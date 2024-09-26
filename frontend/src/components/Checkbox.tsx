import React from 'react';

interface ToggleCheckboxProps {
    isOpen: boolean;
    onToggle: () => void;
}


const Checkbox:React.FC<ToggleCheckboxProps> = ({isOpen, onToggle}) => (
  <div>
    <label>
      <input type="checkbox" checked={isOpen} onChange={onToggle} />
      {isOpen ? 'Open': 'Close'}
    </label>
  </div>
);



export default Checkbox;