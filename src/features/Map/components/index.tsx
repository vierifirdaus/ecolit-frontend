import { Fragment, useState } from "react";
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import NavbarLandingPage from "../../../assets/ui/Navbar_Landing_Page";

function Map({data}:any) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.MAP_API,
  });

  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker:any) => {
    console.log("ini data.data ",data)
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  console.log("ini data.data ",data.data)

  return (
    // <p>{data.data.data}</p>
    <div className="flex flex-col min-h-screen">
            <nav className="w-full">
                <NavbarLandingPage />
            </nav>
            <main className="flex-grow flex flex-col items-center justify-center space-y-6">
                <div className="body h-full px-5 pb-5 pt-1">
                    <div className="container flex flex-col w-full shadow-md bg-white rounded-md p-5">
                    <Fragment>
                      <div className="container">
                        <h1 className="text-center">Vite + React | Google Map Markers</h1>
                        <h1>{import.meta.env.MAP_API}</h1>
                        <div style={{ height: "90vh", width: "100%" }}>
                          {isLoaded ? (
                            <GoogleMap
                              center={{ lat: 108.4398972978125
                                , lng: -6.679173512739778 }}
                              zoom={10}
                              onClick={() => setActiveMarker(null)}
                              mapContainerStyle={{ width: "100vh", height: "90vh" }}
                            >
                              {data.data.map((data:any) => (
                                
                                <MarkerF
                                  key={data.id}
                                  position={{
                                    lat: 108.6398,
                                    lng: -6.12,
                                  }}
                                  onClick={() => handleActiveMarker(data.id)}
                                >
                                  {activeMarker === data.id ? (
                                    <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                                      <div>
                                        <p>{data.alamat}</p>
                                      </div>
                                    </InfoWindowF>
                                  ) : null}
                                </MarkerF>
                              ))}
                            </GoogleMap>
                          ) : null}
                        </div>
                      </div>
                    </Fragment>
                    </div>
                </div>
            </main>
        </div>
  );
}

export default Map;