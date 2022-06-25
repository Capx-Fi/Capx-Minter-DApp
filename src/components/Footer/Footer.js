import "./Footer.scss";

function Footer({centered }) {
  return (
    <footer
      className={`${"footer border-t border-lightGrayBorder"} ${
        centered ? "centered" : "notcentered"
      } z-30`}
    >
      <div className="footer_text">© 2021 CapX All rights reserved.</div>
    </footer>
  );
}

export default Footer;
