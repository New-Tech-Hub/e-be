import React, { useEffect, useRef } from 'react';
import { Card } from "@/components/ui/card";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'gmpx-api-loader': any;
      'gmpx-store-locator': any;
    }
  }
}

const StoreMap = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Google Maps Extended Component Library
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://ajax.googleapis.com/ajax/libs/@googlemaps/extended-component-library/0.6.11/index.min.js';
    document.head.appendChild(script);

    const initializeMap = async () => {
      const CONFIGURATION = {
        "locations": [
          {
            "title": "Ebeth Boutique & Exclusive Store",
            "address1": "40 Ajose Adeogun St",
            "address2": "Mabushi, Abuja 900108, Federal Capital Territory, Nigeria",
            "coords": { "lat": 9.069533862290694, "lng": 7.443070893254107 },
            "placeId": "Ek40MCBBam9zZSBBZGVvZ3VuIFN0LCBNYWJ1c2hpLCBBYnVqYSA5MDAxMDgsIEZlZGVyYWwgQ2FwaXRhbCBUZXJyaXRvcnksIE5pZ2VyaWEiMBIuChQKEgnNSf0DKgtOEBGoM76N6H9jRxAoKhQKEgkDM4Z91QpOEBGAH8F50HfhWQ"
          }
        ],
        "mapOptions": {
          "center": { "lat": 9.069533862290694, "lng": 7.443070893254107 },
          "fullscreenControl": true,
          "mapTypeControl": false,
          "streetViewControl": false,
          "zoom": 15,
          "zoomControl": true,
          "maxZoom": 17,
          "mapId": ""
        },
        "mapsApiKey": "YOUR_API_KEY_HERE",
        "capabilities": {
          "input": true,
          "autocomplete": true,
          "directions": false,
          "distanceMatrix": true,
          "details": false,
          "actions": false
        }
      };

      // Wait for custom elements to be defined
      await customElements.whenDefined('gmpx-store-locator');
      const locator = document.querySelector('gmpx-store-locator');
      if (locator) {
        (locator as any).configureFromQuickBuilder(CONFIGURATION);
      }
    };

    script.onload = initializeMap;

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <Card className="w-full h-96 overflow-hidden">
      <div ref={mapContainerRef} className="w-full h-full relative">
        <gmpx-api-loader 
          key="YOUR_API_KEY_HERE" 
          solution-channel="GMP_QB_locatorplus_v11_cABD"
        />
        <gmpx-store-locator 
          map-id="DEMO_MAP_ID"
          className="w-full h-full"
          style={{
            '--gmpx-color-surface': 'hsl(var(--background))',
            '--gmpx-color-on-surface': 'hsl(var(--foreground))',
            '--gmpx-color-on-surface-variant': 'hsl(var(--muted-foreground))',
            '--gmpx-color-primary': 'hsl(var(--primary))',
            '--gmpx-color-outline': 'hsl(var(--border))',
            '--gmpx-font-family-base': 'inherit',
            '--gmpx-font-family-headings': 'inherit',
            '--gmpx-font-size-base': '0.875rem',
            '--gmpx-hours-color-open': '#188038',
            '--gmpx-hours-color-closed': '#d50000',
            '--gmpx-rating-color': '#ffb300',
            '--gmpx-rating-color-empty': 'hsl(var(--muted))'
          } as React.CSSProperties}
        />
      </div>
    </Card>
  );
};

export default StoreMap;