import React from "react";
import { useSelector } from "react-redux";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const defaultProps = {
  center: {
    lat: 59.95,
    lng: 30.33,
  },
  zoom: 11,
};
function LocationMap() {
  const { page } = useSelector((state) => state.contact);

  const URL = page.page_fields.location?.source?.replaceAll("&amp;", "&");
  return (
    <div className="LocationMap position-relative">
      {/* <GoogleMapReact
        // bootstrapURLKeys={{ key: "AIzaSyCoA2e7JLnrmc5EChoZ9javIkXtB3QNS18" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={25.17941925944902}
          lng={55.22387220427857}
          text="Yugen Care"
        />
      </GoogleMapReact> */}

      <iframe
        width="100%"
        height="100%"
        frameborder="0"
        scrolling="no"
        marginheight="0"
        marginwidth="0"
        id="gmap_canvas"
        src={URL}
      >
        {/* <a href="https://www.gps.ie/sport-gps/">hiking gps</a> */}
      </iframe>
    </div>
  );
}

export default LocationMap;
