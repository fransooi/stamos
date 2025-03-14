import BaseComponent from '../utils/BaseComponent.js';

// IconBar.js - Component for the icon area with buttons
class IconBar extends BaseComponent {
  constructor(containerId, onModeChangeCallback, currentMode = 'modern') {
    // Hello this is Francois
    // Initialize the base component with component name
    super('IconBar');
    
    this.container = document.getElementById(containerId);
    this.onModeChangeCallback = onModeChangeCallback;
    this.currentMode = currentMode;
    this.modeSpecificIcons = null;
    
    // Store this instance on the container element for external access
    if (this.container) {
      this.container._iconBarInstance = this;
    }
  }

  async render() {
    // Clear the container
    this.container.innerHTML = '';
    
    // Create icon container
    const iconContainer = document.createElement('div');
    iconContainer.className = 'icon-container';
    iconContainer.id = 'mode-specific-icons';
    this.container.appendChild(iconContainer);
    
    // Load and render mode-specific icons
    await this.loadModeSpecificIcons();
  }
  
  async loadModeSpecificIcons() {
    const iconContainer = document.getElementById('mode-specific-icons');
    if (!iconContainer) return;
    
    try {
      // Dynamically import the icons module for the current mode
      let IconsModule;
      
      switch (this.currentMode) {
        case 'modern':
          IconsModule = await import('./modern/icons.js');
          break;
        case 'stos':
          IconsModule = await import('./stos/icons.js');
          break;
        case 'amos1_3':
          IconsModule = await import('./amos1_3/icons.js');
          break;
        case 'amosPro':
          IconsModule = await import('./amosPro/icons.js');
          break;
        case 'c64':
          IconsModule = await import('./c64/icons.js');
          break;
        default:
          IconsModule = await import('./modern/icons.js');
      }
      
      // Create and render the mode-specific icons
      this.modeSpecificIcons = new IconsModule.default(iconContainer, this.handleIconClick.bind(this));
      this.modeSpecificIcons.render();
      
      // Store the icon bar instance on the container element for external access
      this.container._iconBarInstance = this.modeSpecificIcons;
      
      console.log(`Loaded icons for ${this.currentMode} mode`);
      
    } catch (error) {
      console.error(`Error loading icons for mode ${this.currentMode}:`, error);
      iconContainer.innerHTML = `<div class="error-message">Failed to load icons for ${this.currentMode} mode</div>`;
    }
  }
  
  handleIconClick(action) {
    console.log(`Icon action: ${action} in ${this.currentMode} mode`);
    
    // Send the action message down toward the root
    this.sendMessageDown('ICON_ACTION', {
      action: action,
      mode: this.currentMode
    });    
  }
  
  setMode(mode) {
    this.currentMode = mode;
    this.loadModeSpecificIcons();
  }
  
  // Override the handleMessage method from BaseComponent
  handleMessage(messageType, messageData, sender) {
    console.log(`IconBar received message: ${messageType}`, messageData);
    
    switch (messageType) {
      case 'MODE_CHANGE':
        if (messageData.data && messageData.data.mode) {
          this.setMode(messageData.data.mode);
          return true;
        }
        break;
        
    }
    
    return false; // Message not handled
  }
}

export default IconBar;
