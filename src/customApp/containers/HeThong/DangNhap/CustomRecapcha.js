import React, { useEffect, useRef, useState } from "react";

const CustomCaptcha = ({ onVerify }) => {
  const recaptchaRef = useRef(null);
  const [isCaptchaRendered, setIsCaptchaRendered] = useState(false); // Trạng thái render của reCAPTCHA

  // Tải script của reCAPTCHA
  useEffect(() => {
    const loadRecaptchaScript = () => {
      const script = document.createElement("script");
      script.src = "https://www.google.com/recaptcha/api.js?render=explicit"; // Thêm ?render=explicit để chỉ định render
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        window.grecaptcha.ready(() => {
          // Render reCAPTCHA sau khi script đã tải
          window.grecaptcha.render(recaptchaRef.current, {
            sitekey: "6LcqdEUqAAAAACyZ9QZ0NrJdkwn7kXtof2hSjzVG", // Thay bằng site key của bạn
            size: "invisible", // Invisible reCAPTCHA
            callback: (token) => {
              console.log("Captcha token:", token);
              onVerify(token); // Gọi hàm onVerify với token
            },
            "expired-callback": () => {
              console.log("Captcha expired");
            },
          });
          setIsCaptchaRendered(true); // Đặt trạng thái thành đã render
        });
      };
    };

    if (!isCaptchaRendered) {
      loadRecaptchaScript();
    }
  }, [isCaptchaRendered]);

  const handleCaptchaClick = () => {
    // Kích hoạt invisible reCAPTCHA khi người dùng nhấn vào captcha giả
    if (isCaptchaRendered) {
      console.log("Executing reCAPTCHA...");
      window.grecaptcha.reset();
      window.grecaptcha.execute().then((token) => console.log("token", token));
    }
  };

  return (
    <div>
      {/* Giao diện giả lập của reCAPTCHA */}
      <div className="custom-captcha">
        <div className="checkbox">
          <input type="checkbox" onClick={(e) => handleCaptchaClick()} />{" "}
          {/* Ngăn chặn click sự kiện lan ra */}
          I'm not a robot
        </div>
        <div className="captcha-logo">
          <img
            src="https://www.gstatic.com/recaptcha/api2/logo_48.png"
            alt="captcha logo"
          />
        </div>
      </div>

      {/* Invisible reCAPTCHA */}
      <div
        ref={recaptchaRef}
        id="recaptcha-container"
        style={{ display: "none" }}
      ></div>
    </div>
  );
};

export default CustomCaptcha;
