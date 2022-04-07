import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import instagram from "../../images/instagram.svg";
import InstagramFeed from "react-ig-feed";
import "react-ig-feed/dist/index.css";
import P1 from "../../images/instagram_5.png";
import P2 from "../../images/instagram_2.png";
import P3 from "../../images/instagram_3.png";
import P4 from "../../images/instagram_6.png";

const feed = [P1, P2, P3, P4];

function HomeInstagram({ accesstoken }) {
  const { lang } = useSelector((state) => state.lang);

  const getPosts = async () => {
    // console.log(await instagramPosts("cats_of_instagram"));
    /*
      [
          {
              id: 'BRWBBbXjT40',
              username: 'cats_of_instagram',
              time: 1488904930,
              type: 'image',
              likes: 809,
              comments: 10,
              text: 'This is my post',
              media: 'https://instagram.fbma1-1.fna.fbcdn.net/t51.2885-15/s640x640/sh0.08/e35/1231231_123123_1231231.jpg',
              …
          },
          …
      ]
      */
  };
  useEffect(() => {
    // getPosts();
  }, []);

  return (
    <div className="HomeInstagram text-center position-relative">
      <div
        data-aos="fade"
        data-aos-delay="0"
        data-aos-duration="2000"
        className="container"
      >
        <div className="row justify-content-center">
          <div className="col-xl-8">
            <div className="small-heading">
              <h2>
                <a href="https://instagram.com/yugen_care">
                  <img src={instagram} alt="" />{" "}
                  {lang === "en"
                    ? "Connect with us on instagram"
                    : "اتبعنا على الانستقرام"}
                </a>
              </h2>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <InstagramFeed token={accesstoken.token} counter="4" />
          {/* {feed.map((instapic) => (
            <div
              data-aos="fade"
              data-aos-delay="0"
              data-aos-duration="2000"
              className="col-3 col-sm-6 col-md-3 mb-4"
              key={instapic}
            >
              <a href="https://instagram.com/yugen_care">
                <img src={instapic} alt="" />
              </a>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
}
export default HomeInstagram;
