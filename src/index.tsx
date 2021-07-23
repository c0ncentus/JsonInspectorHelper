import React from 'react';
import ReactDOM from 'react-dom';
import { ReportHandler } from 'web-vitals';
import "./Css/Package.css";
import "./Css/ReactJSON.css";
// import { demoJip } from './Test/Settings';

const reportWebVitals = (onPerfEntry?: ReportHandler) => { if (onPerfEntry && onPerfEntry instanceof Function) { import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => { getCLS(onPerfEntry); getFID(onPerfEntry); getFCP(onPerfEntry); getLCP(onPerfEntry); getTTFB(onPerfEntry); }); } };
ReactDOM.render(<React.StrictMode></React.StrictMode>, document.getElementById('root'));
reportWebVitals();
