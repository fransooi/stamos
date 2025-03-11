// AMOS 1.3 Icon Bar component - Inspired by the original AMOS 1.3 from 1988 for Amiga

class AMOS13Icons {
  constructor(container, onActionCallback) {
    this.container = container;
    this.onActionCallback = onActionCallback;
    this.shiftPressed = false;
    
    // Define function keys for normal state (F1-F10)
    this.functionKeysRow1 = [
      { key: 'F1', action: 'Help' },
      { key: 'F2', action: 'Direct' },
      { key: 'F3', action: 'Run' },
      { key: 'F4', action: 'Step' },
      { key: 'F5', action: 'Edit' }
    ];
    
    this.functionKeysRow2 = [
      { key: 'F6', action: 'Proc' },
      { key: 'F7', action: 'Files' },
      { key: 'F8', action: 'Menu' },
      { key: 'F9', action: 'Set' },
      { key: 'F10', action: 'Exit' }
    ];
    
    // Define function keys for shift state (F10-F19)
    this.shiftFunctionKeysRow1 = [
      { key: 'F10', action: 'Key 10' },
      { key: 'F11', action: 'Key 11' },
      { key: 'F12', action: 'Key 12' },
      { key: 'F13', action: 'Key 13' },
      { key: 'F14', action: 'Key 14' }
    ];
    
    this.shiftFunctionKeysRow2 = [
      { key: 'F15', action: 'Key 15' },
      { key: 'F16', action: 'Key 16' },
      { key: 'F17', action: 'Key 17' },
      { key: 'F18', action: 'Key 18' },
      { key: 'F19', action: 'Key 19' }
    ];
    
    // Add event listeners for shift key
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    document.addEventListener('keyup', this.handleKeyUp.bind(this));
  }
  
  handleKeyDown(event) {
    if (event.key === 'Shift' && !this.shiftPressed) {
      this.shiftPressed = true;
      this.updateFunctionKeys();
    }
  }
  
  handleKeyUp(event) {
    if (event.key === 'Shift' && this.shiftPressed) {
      this.shiftPressed = false;
      this.updateFunctionKeys();
    }
  }
  
  updateFunctionKeys() {
    const functionKeysRows = document.querySelectorAll('.amos-function-keys-row');
    if (functionKeysRows.length !== 2) return;
    
    const row1 = functionKeysRows[0];
    const row2 = functionKeysRows[1];
    
    // Clear existing keys
    row1.innerHTML = '';
    row2.innerHTML = '';
    
    // Add the appropriate keys based on shift state
    const keysRow1 = this.shiftPressed ? this.shiftFunctionKeysRow1 : this.functionKeysRow1;
    const keysRow2 = this.shiftPressed ? this.shiftFunctionKeysRow2 : this.functionKeysRow2;
    
    keysRow1.forEach(keyInfo => {
      this.addFunctionKey(keyInfo.key, keyInfo.action, row1);
    });
    
    keysRow2.forEach(keyInfo => {
      this.addFunctionKey(keyInfo.key, keyInfo.action, row2);
    });
  }

  render() {
    // Clear the container
    this.container.innerHTML = '';
    
    // Create main container for AMOS icon bar
    const amosIconBar = document.createElement('div');
    amosIconBar.className = 'amos-icon-bar';
    
    // Create top section container (logo + function keys)
    const topSection = document.createElement('div');
    topSection.className = 'amos-top-section';
    
    // Create logo area
    const logoArea = document.createElement('div');
    logoArea.className = 'amos-logo-area';
    
    // Create and add logo image
    const logoImage = document.createElement('img');
    logoImage.src = '/amos1_3/amos-13-logo.png';
    logoImage.alt = 'AMOS 1.3 Logo';
    logoImage.className = 'amos-logo-image';
    logoArea.appendChild(logoImage);
    
    // Create function keys container
    const functionKeysContainer = document.createElement('div');
    functionKeysContainer.className = 'amos-function-keys-container';
    
    // Create first row of function keys (F1-F5 or F10-F14)
    const functionKeysRow1 = document.createElement('div');
    functionKeysRow1.className = 'amos-function-keys-row';
    
    // Create second row of function keys (F6-F10 or F15-F19)
    const functionKeysRow2 = document.createElement('div');
    functionKeysRow2.className = 'amos-function-keys-row';
    
    // Get the current set of keys based on shift state
    const keysRow1 = this.shiftPressed ? this.shiftFunctionKeysRow1 : this.functionKeysRow1;
    const keysRow2 = this.shiftPressed ? this.shiftFunctionKeysRow2 : this.functionKeysRow2;
    
    // Add function keys for first row
    keysRow1.forEach(keyInfo => {
      this.addFunctionKey(keyInfo.key, keyInfo.action, functionKeysRow1);
    });
    
    // Add function keys for second row
    keysRow2.forEach(keyInfo => {
      this.addFunctionKey(keyInfo.key, keyInfo.action, functionKeysRow2);
    });
    
    // Add rows to function keys container
    functionKeysContainer.appendChild(functionKeysRow1);
    functionKeysContainer.appendChild(functionKeysRow2);
    
    // Add logo and function keys to top section
    topSection.appendChild(logoArea);
    topSection.appendChild(functionKeysContainer);
    
    // Create information list area
    const infoArea = document.createElement('div');
    infoArea.className = 'amos-info-area';
    infoArea.textContent = 'AMOS 1.3 - Ready';
    
    // Add all sections to the main container
    amosIconBar.appendChild(topSection);
    amosIconBar.appendChild(infoArea);
    
    // Add the main container to the DOM
    this.container.appendChild(amosIconBar);
    
    // Remove any inline styles that might have been added previously
    const oldStyles = document.querySelectorAll('style[data-amos-style]');
    oldStyles.forEach(style => style.remove());
  }
  
  addFunctionKey(key, action, parent) {
    const button = document.createElement('button');
    button.className = 'amos-function-key';
    button.dataset.key = key;
    button.dataset.action = action;
    
    // Create key+action text
    const buttonText = document.createElement('span');
    buttonText.className = 'amos-key-text';
    buttonText.textContent = `${key}:${action}`;
    button.appendChild(buttonText);
    
    // Add click event
    button.addEventListener('click', () => this.handleFunctionKeyClick(key, action));
    
    parent.appendChild(button);
  }
  
  handleFunctionKeyClick(key, action) {
    console.log(`AMOS Function Key clicked: ${key} - ${action}`);
    
    // Handle specific function key actions
    switch (key) {
      case 'F1':
        this.handleHelp();
        break;
      case 'F2':
        this.handleDirectMode();
        break;
      case 'F3':
        this.handleRun();
        break;
      case 'F4':
        this.handleStep();
        break;
      case 'F5':
        this.handleEdit();
        break;
      case 'F6':
        this.handleProcedures();
        break;
      case 'F7':
        this.handleFiles();
        break;
      case 'F8':
        this.handleMenuEditor();
        break;
      case 'F9':
        this.handleSettings();
        break;
      case 'F10':
        this.handleExit();
        break;
      default:
        console.log(`Action not implemented for key: ${key}`);
    }
    
    // Call the callback if provided
    if (this.onActionCallback) {
      this.onActionCallback(`${key}:${action}`);
    }
  }
  
  // Handler methods for each function key
  handleHelp() {
    console.log('F1: Help command');
  }
  
  handleDirectMode() {
    console.log('F2: Direct Mode command');
  }
  
  handleRun() {
    console.log('F3: Run command');
  }
  
  handleStep() {
    console.log('F4: Step command');
  }
  
  handleEdit() {
    console.log('F5: Edit command');
  }
  
  handleProcedures() {
    console.log('F6: Procedures command');
  }
  
  handleFiles() {
    console.log('F7: Files command');
  }
  
  handleMenuEditor() {
    console.log('F8: Menu Editor command');
  }
  
  handleSettings() {
    console.log('F9: Settings command');
  }
  
  handleExit() {
    console.log('F10: Exit command');
  }
}

export default AMOS13Icons;
