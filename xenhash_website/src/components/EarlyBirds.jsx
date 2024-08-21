import ButtonPrimary from "./ButtonPrimary";
import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import Swal from "sweetalert2";

const EarlyBirds = () => {
  const apiUrl = "https://xenhash.pekenkode.com/api/earlybirds";

  // Function to validate email
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const submitEmail = async () => {
    if (email === "") {
      Swal.fire({
        customClass: {title: "text-white"},
        background: "#212529",
        title: 'Warning!',
        text: 'Please enter an email address before submitting.',
        icon: 'warning',
        confirmButtonText: 'OK',
        confirmButtonColor: "#5D6064"
      });
    } else if (!validateEmail(email)) {
      Swal.fire({
        customClass: {title: "text-white"},
        iconColor: "#ffffff",
        background: "#212529",
        title: 'Warning!',
        text: 'Please enter a valid email address.',
        icon: 'warning',
        confirmButtonText: 'OK',
        confirmButtonColor: "#5D6064"
      });
    } else {
      try {
        const response = await axios.post(apiUrl, { Email: email });
        // console.log(response);

        // Display success message
        Swal.fire({
          customClass: {title: "text-white"},
          iconColor: "#ffffff",
          background: "#212529",
          title: 'Success!',
          text: 'You have successfully whitelisted!',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: "#5D6064"
        });

      } catch (error) {
        console.error(error);

        // Display error message
        Swal.fire({
          iconColor: "#ffffff",
          background: "#212529",
          title: 'Error!',
          customClass: {title: "text-white"},
          text: 'There was an issue whitelisting you. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: "#5D6064"
        });
      }
    }
  };

  const [email, setEmail] = useState("");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          viewport={{ once: true }}
          className="textHead-lg"
        >
          Early birds get the benefit
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center textParagraph"
        >
          Sign up early for the testnet incentive and other benefit
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        viewport={{ once: true }}
        className="flex justify-center gap-2"
      >
        <input
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          className="max-h-fit w-[230px] sm:w-[500px] rounded-[10px] border-[1px] border-white/10 bg-white/5 px-2 placeholder:text-[#939597] placeholder:text-sm placeholder:font-normal focus:border-white focus:ring-white text-white focus:outline-none text-sm"
          placeholder="Enter email address..."
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true }}
          onClick={submitEmail}
        >
          <ButtonPrimary _buttonText={`Sign Up`} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EarlyBirds;
