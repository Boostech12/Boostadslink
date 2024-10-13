const adData = [
  {
    image: 'IMG-20240728-WA0009.jpg',
    link: 'https://t.me/Bottechpartnershipearningbot',
    alt: 'Ad 1',
    startDate: '2024-10-01',
    endDate: '2027-11-01',
    startTime: '08:00',
    endTime: '17:00'
  },
  {
    image: 'IMG-20240728-WA0009.jpg',
    link: 'https://t.me/Bottechpartnershipearningbot',
    alt: 'Ad 2',
    startDate: '2024-10-01',
    endDate: '2027-11-01',
    startTime: '17:00',
    endTime: '20:00'
  }
];

const adContainer = document.getElementById('ad-container');
const cancelAdButton = document.getElementById('cancel-ad');
let currentAdIndex = 0;
let isAdDisplayed = false;
let adDisplayTimeout;
let adRotateTimeout;

function rotateAds() {
  if (isAdDisplayed) return;

  const currentDate = new Date();
  const currentAd = adData[currentAdIndex];
  const adStartDate = new Date(currentAd.startDate);
  const adEndDate = new Date(currentAd.endDate);
  const currentTime = currentDate.toLocaleTimeString('en-GB', { hour12: false }).slice(0, 5);

  if (currentDate >= adStartDate && currentDate <= adEndDate && currentTime >= currentAd.startTime && currentTime < currentAd.endTime) {
    adContainer.innerHTML = `
      <a href="${currentAd.link}">
        <img src="${currentAd.image}" alt="${currentAd.alt}">
      </a>
    `;
    isAdDisplayed = true;
    cancelAdButton.style.display = 'block';
    adDisplayTimeout = setTimeout(() => {
      adContainer.innerHTML = '';
      isAdDisplayed = false;
      cancelAdButton.style.display = 'none';
    }, 20000);
  } else {
    adContainer.innerHTML = '';
    isAdDisplayed = false;
  }

  currentAdIndex = (currentAdIndex + 1) % adData.length;
  adRotateTimeout = setTimeout(rotateAds, 30000);
}

cancelAdButton.addEventListener('click', () => {
  clearTimeout(adDisplayTimeout);
  clearTimeout(adRotateTimeout);
  adContainer.innerHTML = '';
  isAdDisplayed = false;
  cancelAdButton.style.display = 'none';
  rotateAds();
});

rotateAds();
