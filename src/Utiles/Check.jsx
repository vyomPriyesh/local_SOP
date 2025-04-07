import { Autocomplete, useJsApiLoader } from '@react-google-maps/api';
import React, { useRef, useState, useEffect } from 'react';

const PlacesAutocomplete = ({ placeholder, set, value }) => {
  const [autocomplete, setAutocomplete] = useState(null);
  const [data, setData] = useState(null)
  const [placeId, setPlaceid] = useState(null)
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'bf51a910020fa25a',
    googleMapsApiKey: 'AIzaSyDlEMKB5k1EVF_N_dnvi3e1Or-9decd60I',
    libraries: ["places"],
  });

  // console.log(value)

  useEffect(() => {
    if (loadError) {
      setError("Failed to load Google Maps API");
      console.error("Google Maps API loading error:", loadError);
    }
  }, [loadError]);

  const handlePlaceChanged = () => {
    if (autocomplete) {
      try {
        const place = autocomplete.getPlace();
        if (!place.place_id) {
          setError("Please select a valid location from the dropdown");
          return;
        }
        setError(null);
        setPlaceid(place?.place_id)
        setData(place)
        // if (set) {
        //   set(place);
        // }
      } catch (err) {
        setError("Error fetching place details");
        console.error("Error:", err);
      }
    }
  };

  useEffect(() => {
    if (isLoaded) {
      autocompleteServiceRef.current = new window.google.maps.places.AutocompleteService();
    }
  }, [isLoaded]);

  const [predictions, setPredictions] = useState([]);
  const autocompleteServiceRef = useRef(null);


  const handleInputChange = (e) => {
    const input = e.target.value;
    if (autocompleteServiceRef.current) {
      autocompleteServiceRef.current.getPlacePredictions(
        { input },
        (results, status) => {
          if (status === 'OK') {
            setPredictions(results);
          }
        }
      );
    } else {
      setPredictions([]);
    }
  };

  useEffect(() => {
    if (placeId) {
      const filterAll = predictions.filter(list => list?.place_id == placeId)
      set({
        ...filterAll[0],
        ...data
      })
    }
  }, [placeId])

  return (
    <div className="relative">
      {error && (
        <p className="text-red-500 text-sm mb-1">{error}</p>
      )}

      {isLoaded ? (
        <Autocomplete
          options={{
            componentRestrictions: { country: 'us' },
            // types: ['establishment', 'geocode'], // Adjust types as needed
            // fields: ['address_components', 'geometry', 'name', 'place_id']
          }}
          onLoad={(e) => setAutocomplete(e)}
          onPlaceChanged={handlePlaceChanged}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            onChange={handleInputChange}
            className="w-full h-14 p-4 text-lg text-[#222] bg-[#e9eaf0] rounded-[15px] outline-none 
              shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,1),2px_2px_9px_rgba(19,40,109,0.1)] 
              focus:border-[#6c63ff] placeholder:text-[#999] focus:placeholder:text-[#555] 
              max-[1440px]:h-10 max-[1440px]:p-2 max-[1440px]:text-sm max-[1440px]:rounded-[10px] 
              max-[1440px]:placeholder:text-xs
              [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none
              appearance-none"
            aria-label="Location search"
            // value={value}
          />
        </Autocomplete>
      ) : (
        <div className="w-full h-14 p-4 bg-gray-200 animate-pulse rounded-[15px] max-[1440px]:h-10 max-[1440px]:rounded-[10px]">
          Loading map services...
        </div>
      )}
    </div>
  );
};

export default PlacesAutocomplete;