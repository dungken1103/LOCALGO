import ReactGA from 'react-ga4';

// Khởi tạo Google Analytics
export const initGA = (measurementId) => {
  ReactGA.initialize(measurementId);
};

// Gửi sự kiện pageview
export const logPageView = (path) => {
  ReactGA.send({ hitType: 'pageview', page: path });
};

// Gửi sự kiện click
export const logEvent = (category, action, label) => {
  ReactGA.event({
    category,
    action,
    label,
  });
};

// Gửi sự kiện scroll depth
export const logScrollDepth = (depth) => {
  ReactGA.event({
    category: 'Scroll',
    action: 'Scroll Depth',
    label: `${depth}%`,
  });
};