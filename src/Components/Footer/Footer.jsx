import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-black ">
      <div className="2xl:pt-[150px] 2xl:px-[150px] mt-[10px] xl:pt-[100px] xl:px-[100px] lg:pt-[150px] lg:px-[150px] pt-[50px] px-[50px] ">
        <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:[4fr_2fr_2fr_2fr] xl:grid-cols-[4fr_2fr_2fr_2fr]  xl:gap-[20px] 2xl:grid-cols-[5fr_2fr_2fr_2fr] 2xl:gap-[100px] sm:gap-[40px]">
          {/* Left - Logo & Social */}
          <div>
            <h1 className="text-[36px] text-[#000000] font-semibold leading-[46px] tracking-[0%] uppercase space-y-[16px]">
              SOURCE OF PROPERTY
            </h1>
            <p className="text-[#606060] mt-2 leading-6 leading-[26px] text-[18px] font-normal align-middle pe-1">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley.
            </p>

            {/* Social Media */}
            <div className="flex flex-wrap gap-[16px] mt-5">
              <a
                href="#"
                className="flex items-center gap-[10px] border border-gray-200 p-[10px] rounded hover:bg-gray-200"
              >
                <FaFacebook /> <span>122k</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-[10px] border border-gray-200 p-[10px] rounded hover:bg-gray-200"
              >
                <FaTwitter /> <span>155k</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-[10px] border border-gray-200 p-[10px] rounded hover:bg-gray-200"
              >
                <FaInstagram /> <span>250k</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-[10px] border border-gray-200 p-[10px] rounded hover:bg-gray-200"
              >
                <FaLinkedin /> <span>50k</span>
              </a>
            </div>
          </div>

          {/* Information Links */}
          <div className="justify-end space-y-[24px] mt-[20px] sm:mt-[0px]">
            <h3 className="text-[24px] font-semibold">INFORMATION</h3>
            <ul className="mt-2 space-y-[24px] text-[18px] ">
              <li>
                <a href="#" className="text-gray-600 hover:text-black">
                  Lorem Ipsum
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-black">
                  Lorem Ipsum
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-black">
                  Lorem Ipsum
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-black">
                  Lorem Ipsum
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-black">
                  Lorem Ipsum
                </a>
              </li>
            </ul>
          </div>

          {/* Useful Links */}
          <div className="justify-end space-y-[24px] mt-[20px] sm:mt-[0px]">
            <h3 className="text-[24px] font-semibold text-[#000000]">
              USEFUL LINKS
            </h3>
            <ul className="mt-2 space-y-[24px] text-[18px]">
              <li>
                <a href="#" className="text-gray-600 hover:text-black">
                  Lorem Ipsum
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-black">
                  Lorem Ipsum
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-black">
                  Lorem Ipsum
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-black">
                  Lorem Ipsum
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-black">
                  Lorem Ipsum
                </a>
              </li>
            </ul>
          </div>

          {/* Subscribe Section */}
          <div className="justify-end space-y-[16px] mt-[20px] sm:mt-[0px] ">
            <h3 className="text-[24px] font-semibold text-[#000000] ">
            CONTACT
            </h3>
            <p className="text-gray-600 mt-2">
              <strong className="text-[18px] font-semibold  leading-[32px] text-[#000000]">
                Address
              </strong>{" "}
              <br />
              <span className="text-[16px] leading-[32px] text-[#000000]">
                1007 Lexington Ave, Mansfield OH 44907
              </span>
            </p>
            <p className="text-gray-600">
              <strong className="text-[18px] font-semibold  leading-[32px] text-[#000000]">
                Phone
              </strong>{" "}
              <br />
              <span className="text-[16px] leading-[32px] text-[#000000]">
                419-524-5538
              </span>
            </p>
            <p className="text-gray-600">
              <strong className="text-[18px] font-semibold  leading-[32px] text-[#000000]">
                Email
              </strong>{" "}
              <br />
              <span className="text-[16px] text-[#000000] leading-[32px]">
                info@sourceofproperty.com
              </span>
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 mb-12 border-t border-b border-gray-200 py-5 text-center text-[#606060] text-sm flex flex-wrap justify-between">
          <p className="text-[18px]">© 2024, Source of Property</p>
          <div className="flex gap-10  sm:gap-[20px] lg:gap-[10px] xl:gap-[30px] 2xl:gap-[88px] justify-center text-[18px] mt-[10px] md:mt-[0px] ">
            <a href="#" className="text-black font-semibold">
              About us
            </a>
            <a href="#" className="text-black font-semibold">
              Privacy Policy
            </a>
            <a href="#" className="text-black font-semibold">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
