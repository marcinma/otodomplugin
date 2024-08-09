const urlPattern = /https:\/\/www\.otodom\.pl\/pl\/oferta\/.+/;
if (urlPattern.test(window.location.href)) {
  const scriptTag = document.querySelector('script#__NEXT_DATA__');

  chrome.storage.sync.get(
    { addedDate: true, modDate: true, days: true },
    (items) => {
      addedDate = items.addedDate;
      modDate = items.modDate;
      days = items.days;

      if (scriptTag && scriptTag.textContent) {
        try {
          const data = JSON.parse(scriptTag.textContent);
          const createdAt = data.props.pageProps.ad.createdAt;
          const modifiedAt = data.props.pageProps.ad.modifiedAt;
    
          const createdDate = new Date(createdAt).toLocaleDateString("pl-PL");
          const modifiedDate = new Date(modifiedAt).toLocaleDateString("pl-PL");
    
        const daysInPortal = Math.floor(((new Date())-(new Date(createdAt))) / (24*60*60*1000));
    
          const datesDiv = document.createElement('div');
          datesDiv.className = 'otodom-info';
    
          const createdDateParagraph = document.createElement('p');
          const createdDateText = document.createTextNode(`Data dodania: ${createdDate}`);
          createdDateParagraph.appendChild(createdDateText);
    
          const modifiedDateParagraph = document.createElement('p');
          const modifiedDateText = document.createTextNode(`Dni modyfikacji: ${modifiedDate}`);
          modifiedDateParagraph.appendChild(modifiedDateText);
    
          const daysParagraph = document.createElement('p');
          const daysText = document.createTextNode(`Dni na portalu: ${daysInPortal}`);
          daysParagraph.appendChild(daysText);
          if(addedDate){
            datesDiv.appendChild(createdDateParagraph);
          }
          if(modDate)
          datesDiv.appendChild(modifiedDateParagraph);
          if(days)
          datesDiv.appendChild(daysParagraph);
    
          const priceElement = document.querySelector('strong[aria-label="Cena"][data-cy="adPageHeaderPrice"]');
          if (priceElement) {
            priceElement.insertAdjacentElement('afterend', datesDiv);
          }
        } catch (e) {
          console.error('Error parsing NEXT_DATA JSON', e);
        }
      }
    }
  );

}