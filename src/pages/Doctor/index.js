import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDoctor } from "../../app/getdoctor";
import LoadingOverlay from "../../components/LoadingOverlay";
import Errorpage from "../../layout/Errorpage";
import Description from "./Description";
import DoctorDetails from "./DoctorDetails";

function Doctor() {
  const dispatch = useDispatch();
  const { doctor } = useSelector((state) => state.doctor);
  const { status } = useSelector((state) => state.doctor);
  const mstatus = useSelector((state) => state.getmenu.status);
  const params = useParams();

  var fname;
  var lname;
  var title;
  var designation;
  var certification_text;
  var awardlist;
  var description_text1;
  var description_text2;
  useEffect(() => {
    ////Passing page ID reference
    dispatch(getDoctor({ id: params.id }));
    console.log(doctor);
  }, [dispatch]);

  if (status === "success") {
    console.log(doctor);
    try {
      fname = doctor.firstname;
      lname = doctor.lastname;
      title = doctor.title;
      designation = doctor.designation;
      certification_text = doctor.certification_text;
      awardlist = doctor.awardlist.split(", ");
      description_text1 = doctor.description_text1;
      description_text2 = doctor.description_text2;
    } catch (e) {
      console.log(e);
      return <Errorpage />;
    }
  }
  const meta = {
    title: `${doctor.firstname} ${doctor.lastname}`,
    description: doctor.description_text1,
  };
  const schema = {
    "@context": "http://schema.org",
    "@type": doctor.designation,
    name: `${doctor.firstname} ${doctor.lastname}`,
    image:
      doctor.images && doctor.images.length !== 0 ? doctor.images[0].url : null,
    url: `https://yugencare.com/professionals/${doctor.slug}/${doctor.id}`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "5",
    },
  };
  const properties = [
    {
      content:
        doctor.images && doctor.images.length !== 0
          ? doctor.images[0].url
          : null,
      property: "og:image",
    },
    {
      content: `${doctor.firstname} ${doctor.lastname}`,
      property: "og:title",
    },
    {
      content: doctor.description_text1,
      property: "og:description",
    },
    {
      content: `https://yugencare.com/professionals/${doctor.slug}/${doctor.id}`,
      property: "og:url",
    },
  ];
  return (
    <div className="Doctor">
      {status === "success" && mstatus === "success" ? (
        <>
          <Helmet>
            <meta charSet="utf-8" />
            <title>{meta.title}</title>
            <meta name="description" content={meta.description} />
            {properties?.length !== 0 && properties !== null
              ? properties.map((prpty, idx) => (
                  <meta
                    key={prpty.content}
                    property={prpty.property}
                    content={prpty.content}
                  />
                ))
              : null}
            <script type="application/ld+json">{JSON.stringify(schema)}</script>
          </Helmet>
          <DoctorDetails doctor={doctor} />
          <Description doctor={doctor} />
          {/* <BookDoctor name={doctor.firstname} /> */}
        </>
      ) : status === "failed" ? (
        <Errorpage />
      ) : (
        <LoadingOverlay />
      )}
    </div>
  );
}
export default Doctor;
