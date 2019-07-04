import React from 'react';

export default function Footer() {
  return (
    <footer className="fixed left-0 bottom-0 w-100 h2 bg-near-black white-80 ph4">
      <p className="f6">
        <span className="dib mr4 mr5-ns">©2019 Developed by Zhenyu</span>
        <a
          className="link white-80 hover-light-purple"
          href="https://radar.io"
        >
          Positioning powered by Radar.io
        </a>
      </p>
    </footer>
  );
}