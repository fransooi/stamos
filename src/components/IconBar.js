// IconBar.js - Component for the icon area with buttons
class IconBar {
  constructor(containerId, onModeChangeCallback, currentMode = 'modern') {
    this.container = document.getElementById(containerId);
    this.onModeChangeCallback = onModeChangeCallback;
    this.currentMode = currentMode;
    this.modeSpecificIcons = null;
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
      this.modeSpecificIcons = new IconsModule.default(iconContainer, this.handleIconAction.bind(this));
      this.modeSpecificIcons.render();
      
    } catch (error) {
      console.error(`Error loading icons for mode ${this.currentMode}:`, error);
      iconContainer.innerHTML = `<div class="error-message">Failed to load icons for ${this.currentMode} mode</div>`;
    }
  }
  
  handleIconAction(action) {
    console.log(`Icon action: ${action} in ${this.currentMode} mode`);
    // Handle icon actions here or pass to a callback
  }
  
  setMode(mode) {
    this.currentMode = mode;
  }
}

export default IconBar;
