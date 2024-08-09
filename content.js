
  chrome.storage.sync.get(
    { addedDate: true, modDate: true, days: true, maxDays: 120, position:'br' },
    (items) => {
      createBox(items.addedDate,items.modDate,items.days,items.maxDays,items.position);
    }
  );



function createBox(addedDate, modDate, days, maxDays, position){
  const urlPattern = /https:\/\/www\.otodom\.pl\/pl\/oferta\/.+/;
  if (!urlPattern.test(window.location.href)) return;
  const scriptTag = document.querySelector('script#__NEXT_DATA__');
  if(!scriptTag || ! scriptTag.textContent) return;
    try {
      const data = JSON.parse(scriptTag.textContent);
      const createdAt = data.props.pageProps.ad.createdAt;
      const modifiedAt = data.props.pageProps.ad.modifiedAt;

      const createdDate = new Date(createdAt).toLocaleDateString("pl-PL");
      const modifiedDate = new Date(modifiedAt).toLocaleDateString("pl-PL");

      const daysInPortal = Math.floor(((new Date()) - (new Date(createdAt))) / (24 * 60 * 60 * 1000));
        /*
        Green 0, 255, 0
        Yellow 255, 255, 0
        Red 255, 0, 0

        */
      let x = daysInPortal/maxDays; 
      if(x>1) x=1;
      
      let r= Math.floor(255.0 * x * 2);
      if(r>255) r= 255;

      const g= Math.floor(255.0 * (1 - x));
      if (document.contains(document.getElementById("otodominfo")))
      document.getElementById("otodominfo").remove();

      const datesDiv = document.createElement('div');

      datesDiv.setAttribute("id", "otodominfo");
      datesDiv.className = 'otodom-info';
      let cssPosition=" bottom: 10px;right: 10px;";
      if(position == 'bl'){
        cssPosition=" bottom: 10px;left: 10px;";
      } else if(position == 'tr'){
        cssPosition=" top: 10px;right: 10px;";
      } else if(position == 'tl'){
        cssPosition=" top: 10px;left: 10px;";
      }
      datesDiv.style =`background-color: rgb(${r},${g},0);${cssPosition}`;

      const createdDateParagraph = document.createElement('p');
      const createdDateText = document.createTextNode(`Data dodania: ${createdDate}`);
      createdDateParagraph.appendChild(createdDateText);

      const modifiedDateParagraph = document.createElement('p');
      const modifiedDateText = document.createTextNode(`Dni modyfikacji: ${modifiedDate}`);
      modifiedDateParagraph.appendChild(modifiedDateText);

      const daysParagraph = document.createElement('p');
      const daysText = document.createTextNode(`Dni na portalu: ${daysInPortal}`);
      daysParagraph.appendChild(daysText);
      if (addedDate) {
        datesDiv.appendChild(createdDateParagraph);
      }
      if (modDate)
        datesDiv.appendChild(modifiedDateParagraph);
      if (days)
        datesDiv.appendChild(daysParagraph);

      const priceElement = document.querySelector('strong[aria-label="Cena"][data-cy="adPageHeaderPrice"]');
      if (priceElement) {
        priceElement.insertAdjacentElement('afterend', datesDiv);
      }
    } catch (e) {
      console.error('Error parsing NEXT_DATA JSON', e);
    }
}

chrome.runtime.onMessage.addListener((items) => {
    createBox(items.addedDate,items.modDate,items.days,items.maxDays,items.position);
});