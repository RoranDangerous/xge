

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import './App.css';

import { useState } from 'react';

function App() {
  const [regionFilter, setRegionFilter] = useState('All');
  const markers = [
    {
      position: [49.2827, -123.1207],
      popup: (
        <Popup>
          <strong>Title:</strong> Vancouver Canucks<br/>
          <strong>Description:</strong> Help Canucks win NHL<br/>
          <strong>Impact Category:</strong> Toxicity<br/>
          <strong>Region:</strong> North America
        </Popup>
      ),
      region: 'North America',
    },
    {
      position: [-25.2744, 133.7751],
      popup: (
        <Popup>
          <strong>Title:</strong> KangAustralia<br/>
          <strong>Description:</strong> Contribute to the Kangaroo fight for freedom<br/>
          <strong>Impact Category:</strong> Environmental<br/>
          <strong>Region:</strong> Oceania
        </Popup>
      ),
      region: 'Oceania',
    },
    {
      position: [71.7069, -42.6043],
      popup: (
        <Popup>
          <strong>Title:</strong> Greenland<br/>
          <strong>Description:</strong> Keep US away from Greenland<br/>
          <strong>Impact Category:</strong> Resources<br/>
          <strong>Region:</strong> Arctic
        </Popup>
      ),
      region: 'Arctic',
    },
  ];
  const regions = ['All', ...Array.from(new Set(markers.map(m => m.region)))];

  return (
    <div style={{ height: '100vh', width: '100vw', margin: 0, padding: 0, position: 'relative' }}>
      {/* Filter Dropdown */}
      <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 1000 }}>
        <select
          value={regionFilter}
          onChange={e => setRegionFilter(e.target.value)}
          style={{ padding: '6px 12px', borderRadius: 4, border: '1px solid #ccc', background: 'white', fontWeight: 'bold' }}
        >
          {regions.map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
      </div>
      <MapContainer
        center={[49.2827, -123.1207]}
        zoom={2}
        minZoom={2}
        style={{ height: '100%', width: '100%' }}
        className="leaflet-fullscreen"
        maxBounds={[[ -85, -180 ], [ 85, 180 ]]}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers
          .filter(m => regionFilter === 'All' || m.region === regionFilter)
          .map((m, i) => (
            <Marker key={i} position={m.position as [number, number]}>
              {m.popup}
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}

export default App;
