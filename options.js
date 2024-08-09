const saveOptions = () => {
    const addedDate = document.getElementById('addedDate').checked;
    const modDate = document.getElementById('modDate').checked;
    const days = document.getElementById('days').checked;
    const maxDays = document.getElementById('maxDays').value;
    const position = document.getElementById('position').value;
    if(maxDays<1){
        maxDays=1;
    }
    chrome.storage.sync.set(
      { addedDate: addedDate, modDate: modDate, days: days, maxDays: maxDays, position: position },
      async () => {
        const status = document.getElementById('status');
        status.textContent = 'Options saved.';

        const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
        const response = await chrome.tabs.sendMessage(tab.id, {
            addedDate: addedDate, modDate: modDate, days: days, maxDays: maxDays, position: position
        });

        setTimeout(() => {
          status.textContent = '';
        }, 750);
      }
    );
  };
  

  const restoreOptions = () => {
    chrome.storage.sync.get(
      { addedDate: true, modDate: true, days: true, maxDays:120, position:'br' },
      (items) => {
        document.getElementById('addedDate').checked = items.addedDate;
        document.getElementById('modDate').checked = items.modDate;
        document.getElementById('days').checked = items.days;
        document.getElementById('maxDays').value = items.maxDays;
        document.getElementById('position').value = items.position;
      }
    );
  };
  
  document.addEventListener('DOMContentLoaded', restoreOptions);
  document.getElementById('save').addEventListener('click', saveOptions);
