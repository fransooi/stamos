// STOS Basic Icon Bar component - Inspired by the original STOS Basic from 1987

class STOSIcons {
  constructor(container) {
    this.container = container;
    this.shiftPressed = false;
    
    // Define function keys for both states
    this.functionKeys = {
      normal: [
        { key: 'F1', action: 'Last Key' },
        { key: 'F2', action: 'List' },
        { key: 'F3', action: 'Listbank' },
        { key: 'F4', action: 'Load' },
        { key: 'F5', action: 'Save' },
        { key: 'F6', action: 'Run' },
        { key: 'F7', action: 'Dir' },
        { key: 'F8', action: 'Dir$=Dir$+"\\\"' },
        { key: 'F9', action: 'Previous' },
        { key: 'F10', action: 'Help' }
      ],
      shift: [
        { key: 'F10', action: 'Off' },
        { key: 'F11', action: 'Full' },
        { key: 'F12', action: 'Multi2' },
        { key: 'F13', action: 'Multi3' },
        { key: 'F14', action: 'Multi4' },
        { key: 'F15', action: 'Mode 0' },
        { key: 'F16', action: 'Mode 1' },
        { key: 'F17', action: 'Default' },
        { key: 'F18', action: 'Env' },
        { key: 'F19', action: 'Key List' }
      ]
    };
    
    // Add event listeners for shift key
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    document.addEventListener('keyup', this.handleKeyUp.bind(this));
  }
  
  handleKeyDown(event) {
    if (event.key === 'Shift' && !this.shiftPressed) {
      this.shiftPressed = true;
      this.render();
    }
  }
  
  handleKeyUp(event) {
    if (event.key === 'Shift' && this.shiftPressed) {
      this.shiftPressed = false;
      this.render();
    }
  }

  render() {
    // Clear the container
    this.container.innerHTML = '';
    
    // Create main container for STOS function keys
    const stosIconsContainer = document.createElement('div');
    stosIconsContainer.className = 'stos-icons-container';
    
    // Create first row of function keys (F1-F5 or F10-F14)
    const firstRow = document.createElement('div');
    firstRow.className = 'stos-function-row';
    
    // Create second row of function keys (F6-F10 or F15-F19)
    const secondRow = document.createElement('div');
    secondRow.className = 'stos-function-row';
    
    // Get the current set of keys based on shift state
    const currentKeys = this.shiftPressed ? this.functionKeys.shift : this.functionKeys.normal;
    
    // Add first row (first 5 keys)
    for (let i = 0; i < 5; i++) {
      this.addFunctionKey(currentKeys[i].key, currentKeys[i].action, firstRow);
    }
    
    // Add second row (next 5 keys)
    for (let i = 5; i < 10; i++) {
      this.addFunctionKey(currentKeys[i].key, currentKeys[i].action, secondRow);
    }
    
    // Add rows to container
    stosIconsContainer.appendChild(firstRow);
    stosIconsContainer.appendChild(secondRow);
    
    // Add container to main container
    this.container.appendChild(stosIconsContainer);
  }
  
  addFunctionKey(key, action, parent) {
    const button = document.createElement('button');
    button.className = 'stos-function-key';
    button.dataset.key = key;
    button.dataset.action = action;
    
    // Create a single text element with the format "Fxx: action"
    const textContent = document.createElement('span');
    textContent.className = 'stos-key-text';
    textContent.textContent = `${key}: ${action}`;
    button.appendChild(textContent);
    
    // Add click event
    button.addEventListener('click', () => this.handleFunctionKeyClick(key, action));
    
    parent.appendChild(button);
  }
  
  handleFunctionKeyClick(key, action) {
    console.log(`STOS Function Key clicked: ${key} - ${action}`);
  }
}

export default STOSIcons;
