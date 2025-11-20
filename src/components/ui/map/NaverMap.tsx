// components/NaverMapComponent.tsx
'use client';

import { Center } from '@/app/(home)/_components/ServiceSection/services/ServiceCenter';
import { useRef } from 'react';
import { Container as MapDiv, Marker, NaverMap, useNavermaps } from 'react-naver-maps';

interface NaverMapComponentProps {
  filteredCenters: Center[];
  selectedCenter: number | null;
  onMarkerClick: (center: Center) => void;
  mapCenter: { lat: number; lng: number };
  mapZoom: number;
}

function MapContent({
  filteredCenters,
  selectedCenter,
  onMarkerClick,
  mapCenter,
  mapZoom,
}: NaverMapComponentProps) {
  const navermaps = useNavermaps();
  const mapRef = useRef<any>(null);

  return (
    <NaverMap
      ref={mapRef}
      defaultCenter={new navermaps.LatLng(mapCenter.lat, mapCenter.lng)}
      center={new navermaps.LatLng(mapCenter.lat, mapCenter.lng)}
      defaultZoom={mapZoom}
      zoom={mapZoom}
      style={{ width: '100%', height: '100%' }}
      zoomControl={true}
      zoomControlOptions={{
        position: navermaps.Position.TOP_RIGHT,
      }}
    >
      {filteredCenters.map((center) => {
        const isSelected = selectedCenter === center.id;

        return (
          <Marker
            key={center.id}
            position={new navermaps.LatLng(center.code[0], center.code[1])}
            title={center.name}
            onClick={() => onMarkerClick(center)}
            icon={{
              content: `
                <div style="
                  width: ${isSelected ? '40px' : '30px'};
                  height: ${isSelected ? '40px' : '30px'};
                  background: ${isSelected ? '#3b82f6' : '#6b7280'};
                  border: ${isSelected ? '3px' : '2px'} solid white;
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: white;
                  font-size: ${isSelected ? '18px' : '14px'};
                  box-shadow: 0 ${isSelected ? '4px 6px' : '2px 4px'} rgba(0,0,0,${isSelected ? '0.3' : '0.2'});
                  cursor: pointer;
                  transition: all 0.3s ease;
                  transform: scale(${isSelected ? '1.2' : '1'});
                ">
                  📍
                </div>
              `,
              anchor: new navermaps.Point(isSelected ? 20 : 15, isSelected ? 20 : 15),
            }}
          />
        );
      })}
    </NaverMap>
  );
}

export default function NaverMapComponent(props: NaverMapComponentProps) {
  return (
    <MapDiv style={{ width: '100%', height: '100%' }}>
      <MapContent {...props} />
    </MapDiv>
  );
}
