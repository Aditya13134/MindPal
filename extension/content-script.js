// Content script for MindPal Chrome Extension
(function() {
  'use strict';

  // Check if MindPal is already injected
  if (window.mindpalInjected) return;
  window.mindpalInjected = true;

  // Create floating action button
  function createFloatingButton() {
    const button = document.createElement('div');
    button.id = 'mindpal-fab';
    button.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
        <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      </svg>
    `;
    
    button.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 56px;
      height: 56px;
      background: #6366f1;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
      z-index: 10000;
      color: white;
      transition: all 0.3s ease;
    `;

    button.addEventListener('mouseenter', () => {
      button.style.transform = 'scale(1.1)';
      button.style.boxShadow = '0 6px 16px rgba(99, 102, 241, 0.6)';
    });

    button.addEventListener('mouseleave', () => {
      button.style.transform = 'scale(1)';
      button.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.4)';
    });

    button.addEventListener('click', openMindPal);
    
    document.body.appendChild(button);
    return button;
  }

  // Create modal overlay
  function createModal() {
    const modal = document.createElement('div');
    modal.id = 'mindpal-modal';
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 10001;
      display: none;
      align-items: center;
      justify-content: center;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
      width: 90%;
      max-width: 800px;
      height: 80%;
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      position: relative;
    `;

    const closeButton = document.createElement('button');
    closeButton.innerHTML = '×';
    closeButton.style.cssText = `
      position: absolute;
      top: 10px;
      right: 15px;
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      z-index: 10002;
      color: #666;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: background-color 0.2s;
    `;

    closeButton.addEventListener('mouseenter', () => {
      closeButton.style.backgroundColor = '#f0f0f0';
    });

    closeButton.addEventListener('mouseleave', () => {
      closeButton.style.backgroundColor = 'transparent';
    });

    closeButton.addEventListener('click', closeMindPal);

    const iframe = document.createElement('iframe');
    iframe.id = 'mindpal-iframe';
    iframe.src = chrome.runtime.getURL('index.html');
    iframe.style.cssText = `
      width: 100%;
      height: 100%;
      border: none;
    `;

    modalContent.appendChild(closeButton);
    modalContent.appendChild(iframe);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeMindPal();
      }
    });

    return modal;
  }

  function openMindPal() {
    const modal = document.getElementById('mindpal-modal') || createModal();
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeMindPal() {
    const modal = document.getElementById('mindpal-modal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

  // Handle text selection
  function getSelectedText() {
    return window.getSelection().toString().trim();
  }

  // Listen for messages from the extension
  window.addEventListener('message', (event) => {
    if (event.source !== window) return;
    
    if (event.data.type === 'MINDPAL_GET_SELECTED_TEXT') {
      const selectedText = getSelectedText();
      window.postMessage({
        type: 'MINDPAL_SELECTED_TEXT_RESPONSE',
        text: selectedText
      }, '*');
    }
  });

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      createFloatingButton();
    });
  } else {
    createFloatingButton();
  }

  // Keyboard shortcut (Ctrl+Shift+M or Cmd+Shift+M)
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'M') {
      e.preventDefault();
      openMindPal();
    }
  });

})();