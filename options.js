// Saves options to chrome.storage
const saveOptions = () => {
    const addedDate = document.getElementById('addedDate').checked;
    const modDate = document.getElementById('modDate').checked;
    const days = document.getElementById('days').checked;
  
    chrome.storage.sync.set(
      { addedDate: addedDate, modDate: modDate, days: days },
      () => {
        // Update status to let user know options were saved.
        const status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(() => {
          status.textContent = '';
        }, 750);
      }
    );
  };
  
  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  const restoreOptions = () => {
    chrome.storage.sync.get(
      { addedDate: true, modDate: true, days: true },
      (items) => {
        document.getElementById('addedDate').checked = items.addedDate;
        document.getElementById('modDate').checked = items.modDate;
        document.getElementById('days').checked = items.days;
      }
    );
  };
  
  document.addEventListener('DOMContentLoaded', restoreOptions);
  document.getElementById('save').addEventListener('click', saveOptions);