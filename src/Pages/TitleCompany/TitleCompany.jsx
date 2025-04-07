import Navbar from "../../Components/TopHeader/NavBar";
import TopHeader from "../../Components/TopHeader/TopHeader";
import home1 from "../../Images/TitleCompany.png";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  CustomInput,
  CustomInput1,
  CustomInput2,
  CustomInput3,
  CustomPhoneInput,


  CustomPhoneInput1,


  CustomPhoneInput3,


  CustomTextArea,


  FileUpload,


  FileUploadImage,
  InputField,
} from "../../Components/Input/Input";

import { FaArrowLeftLong } from "react-icons/fa6";
import { showToast } from "../../Common/toastService";
import { apiRequestPost, apiRequestGet, apiRequestPost1 } from "../../Common/Common";
import { useEffect, useState } from "react";
import {
  Dropdown1,
  Dropdown2,
} from "../../Components/Dropdown/Dropdown";
import { API_URLS } from "../../Apis/api";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import Check from "../../Utiles/Check";
import { useNavigate } from "react-router";

const { AuthApi, DropdownApi, addlistingApi } = API_URLS;

const convertTo24HourFormat = (time) => {
  if (!time) return '';
  const [timePart, ampm] = time.split(' ');
  let [hours, minutes] = timePart.split(':');
  if (ampm === 'PM' && hours !== '12') {
    hours = parseInt(hours, 10) + 12;
  } else if (ampm === 'AM' && hours === '12') {
    hours = '00';
  }
  return `${hours}:${minutes}`;
};

// Validation Schema for Step 1
const step1Schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  companyName: yup.string().required("Company Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phonenumeber: yup.string().required("Phone Number is required"),
  address1: yup.string().required("Address is required"),
});

const step1Schema_phone = yup.object().shape({
  phonenumeber: yup.string().required("Phone Number is required"),
});

const step1Schema_email = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});

const validationSchemaTime = yup.object().shape({
  selectedTimes: yup.array()
    .min(1, 'Please select at least one Working Hours')
    .required('Working Hours selection is required')
    .of(
      yup.object().shape({
        from: yup.string().required('From time is required'),
        to: yup.string()
          .required('To time is required')
          .test('is-greater', 'To time must be later than From time', function (value) {
            const { from } = this.parent;
            if (!from || !value) return true; // Skip validation if either field is empty
            return convertTo24HourFormat(value) > convertTo24HourFormat(from);
          }),
      })
    ),
});

const validationSchema = yup.object().shape({
  selectedState: yup
    .array()
    .min(1, "Please select at least one state")
    .required("State selection is required"),
  selectedCountry: yup
    .array()
    .min(1, "Please select at least one country")
    .required("Country selection is required"),
  selectedAffiliations: yup
    .array()
    .min(1, "Please select at least one Underwriter Affiliations")
    .required("Underwriter Affiliations selection is required"),
  certification: yup.string().required("Licenses & Certifications is required"),
});


const validationSchema_insurance = yup.object().shape({
  selectedState: yup
    .array()
    .min(1, "Please select at least one state")
    .required("State selection is required"),
  selectedCountry: yup
    .array()
    .min(1, "Please select at least one country")
    .required("Country selection is required"),
  yearexperience: yup
    .number()
    .typeError("Years in Business must be a number")
    .required("Years in Business is required")
    .min(0, "Years in Business cannot be negative"),
  certification: yup.string().required("Licenses & Certifications is required"),
  insurance_company: yup.string().required("E&O Insurance is required"),
  eoFileName: yup.string().required("E&O Policy is required"),
  Coverage: yup.string().required("Coverage is required"),
  Start_Date: yup.string().required("Start Date is required"),
  Expiry_date: yup.string().required("Expiry Date is required"),
  // certification: yup.string().required("Licenses & Certifications is required"),
});

const validationSchema3 = yup.object().shape({
  selectedCommitments: yup
    .string()
    .required("your average turnaround time is required"),
  selectedServices: yup
    .array()
    .min(1, "Please select at least one Types of Services")
    .required("Types of Services is required"),
  specific: yup
    .array()
    .min(1, "Please select at least one Specific Property of types")
    .required("Specific Property of types is required"),
});

const validationSchema4 = yup.object().shape({
  selectedClientsserves: yup
    .array()
    .min(1, "Please select at least one ypes of clients ")
    .required("ypes of clients  is required"),
  selectedtransactionsMonth: yup
    .string()
    .required("Transactions  is required"),
});


const validationSchema4_bilingualData = yup.object().shape({
  selectedClientsserves: yup
    .array()
    .min(1, "Please select at least one ypes of clients ")
    .required("ypes of clients  is required"),
  selectedtransactionsMonth: yup
    .string()
    .required("Transactions  is required"),
  bilingualData: yup
    .array()
    .min(1, "Please select at least one Types of Bilingual Services")
    .required("Bilingual Services is required"),
});


const validationSchema4_media = yup.object().shape({
  client_testimonial: yup
    .string()
    .required("Volume-Capacity is required"),
  // comment: yup
  //   .string()
  //   .required("Comment is required"),
  // industry_affiliations: yup
  //   .string()
  //   .required("Industry Affiliations is required"),
  facebook: yup.string()
    .url('Invalid URL format') // Validate URL format
    .required('URL is required'),
  instagram: yup.string()
    .url('Invalid URL format') // Validate URL format
    .required('URL is required'),
  linkedin: yup.string()
    .url('Invalid URL format') // Validate URL format
    .required('URL is required'),
  twitter: yup.string()
    .url('Invalid URL format') // Validate URL format
    .required('URL is required'),
  youtube: yup.string()
    .url('Invalid URL format') // Validate URL format
    .required('URL is required'),
});

const validationSchema5 = yup.object().shape({
  bio: yup
    .string()
    .required("Short Bio is required"),
  aboutBusiness: yup
    .string()
    .required("About Business is required"),
  companyLogo: yup
    .string()
    .required("Company Logo is required"),
  coverImage: yup
    .string()
    .required("Cover Image is required"),
  terms: yup
    .string()
    .required('You must select an option Terms and Conditions'),
});

export default function TitleCompany() {

  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [address1, setAddress1] = useState("");
  const [website, setwebsite] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumeber, setPhonenumber] = useState("");

  const [selectedState, setSelectedState] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [selectedAffiliations, setSelectedAffiliations] = useState([]);
  const [selectedIndustryMembership, setSelectedIndustryMembership] = useState([]);
  const [certification, setcertification] = useState("");


  const [selectedCommitments, setSelectedCommitments] = useState("")
  const [selectedServices, setSelectedServices] = useState([]);
  const [specific, setSpecific] = useState([])
  const [IsRon, setIsRon] = useState("no");


  const [times, setTimes] = useState([
    { day: 'Monday', from: '', to: '' },
    { day: 'Tuesday', from: '', to: '' },
    { day: 'Wednesday', from: '', to: '' },
    { day: 'Thursday', from: '', to: '' },
    { day: 'Friday', from: '', to: '' },
    { day: 'Saturday', from: '', to: '' },
    { day: 'Sunday', from: '', to: '' },
  ]);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const timeZones = [
    'EST',
    'CST',
    'MST',
    'PST',
  ]
  const [timeZone, setTimezone] = useState(timeZones[0])

  const [selectedClientsserves, setSelectedClientsserves] = useState([]);
  const [selectedtransactionsMonth, setSelectedtransactionsMonth] = useState("");
  const [bilingual, setBilingual] = useState("no")
  const [bilingualData, setBilingualdata] = useState([])



  const [bio, setBio] = useState("");
  const [aboutBusiness, setAboutBusiness] = useState("")
  const [terms, setTerms] = useState('')
  const [companyLogo, setCompanyLogo] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [status, setStatus] = useState(false)


  const [otp, setOtp] = useState("");
  const [showOtpFields, setShowOtpFields] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [phone, setPhone] = useState("");
  const [showOtpFields1, setShowOtpFields1] = useState(false);
  const [otp1, setOtp1] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [states, setStates] = useState([]);
  const [country, setCountry] = useState([]);

  // const [stateId, setStateId] = useState("");
  // const [countryId, setCountryId] = useState("");




  const [YearEstablished, setYearEstablished] = useState("");

  // const [selectedCommitments, setSelectedCommitments] = useState("")

  const [selectedRealestateWork, setSelectedRealestateWork] = useState([]);
  const [spreadsheetFileName, setSpreadsheetFileName] = useState("");
  const [client_testimonial, setclient_testimonial] = useState("")

  const [error, setErrors] = useState({});

  // Next Step
  const nextStep = async (e) => {
    if (step === 1) {
      try {
        const formData = {
          firstName,
          lastName,
          companyName,
          email,
          phonenumeber,
          address1
        }
        await step1Schema.validate(formData, { abortEarly: false });


        if (!isPhoneVerified) {
          setErrors({
            ...error,
            mobile: "Phone No is not verified"
          })
          return
        } else {
          setErrors({
            ...error,
            mobile: ""
          })
        }

        if (!isEmailVerified) {
          setErrors({
            ...error,
            email: "Email is not verified"
          })
          return
        } else {
          setErrors({
            ...error,
            email: ""
          })
        }
        setStep(step + 1);
        setErrors({});
      } catch (err) {
        const newErrors = {};
        err.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      }
    } else if (step === 2) {
      e.preventDefault();
      try {
        // Assuming you have these state variables or values
        const formData = {
          selectedState,
          selectedCountry,
          selectedAffiliations,
          certification,
        }
        await validationSchema.validate(formData, { abortEarly: false });

        setStep(step + 1);
        setErrors({});

      } catch (err) {
        const newErrors = {};
        err.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      }

    } else if (step === 3) {

      e.preventDefault();
      try {
        // Validate all fields
        await validationSchema3.validate(
          {
            selectedCommitments,
            selectedServices,
            specific,
          },
          { abortEarly: false }
        );
        setStep(step + 1);
        setErrors({});
      } catch (err) {

        const newErrors = {};
        err.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      }
    } else if (step === 4) {
      e.preventDefault();
      try {
        await validationSchemaTime.validate({ selectedTimes }, { abortEarly: false });
        setStep(step + 1);
        setErrors({});
      } catch (err) {
        const newErrors = {};
        if (selectedTimes.length > 0) {
          err.inner.forEach((error) => {
            const data = error.path.split('[',)
            const data2 = error.path.split('.',)
            if (!newErrors[data[0] + '_']) {
              newErrors[data[0] + '_'] = [];
            }

            const index = data[1]?.split(']')[0];

            if (!newErrors[data[0] + '_'][index]) {
              newErrors[data[0] + '_'][index] = { to: '', from: '' };
            }

            const fieldObject = newErrors[data[0] + '_'][index];

            if (data2[1] === 'to') {
              fieldObject.to = error.message;
            } else if (data2[1] === 'from') {
              fieldObject.from = error.message;
            }
          });
        } else {
          err.inner.forEach((error) => {
            newErrors[error.path] = error.message;
          });

        }
        setErrors(newErrors);
      }
    } else if (step === 5) {

      e.preventDefault();
      try {

        const formData = {
          selectedClientsserves,
          selectedtransactionsMonth,
        }
        const formData2 = {
          selectedClientsserves,
          selectedtransactionsMonth,
          bilingualData
        }

        if (bilingual == 'yes') {
          await validationSchema4_bilingualData.validate(formData2, { abortEarly: false });

        } else {
          await validationSchema4.validate(formData, { abortEarly: false });
        }
        setStep(step + 1);
        setErrors({});
      } catch (err) {

        const newErrors = {};
        err.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      }
    } else if (step === 6) {
      e.preventDefault();
      try {
        // Validate all fields
        await
          validationSchema5.validate(
            { companyLogo, coverImage, terms, bio, aboutBusiness },
            { abortEarly: false }
          );
        handleSave();
        setErrors({});
      } catch (err) {

        const newErrors = {};
        err.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      }
    }
  };


  useEffect(() => {
    fetchStates();
    fetchCountry();
  }, []);

  const fetchStates = async () => {
    try {
      const response = await apiRequestGet(DropdownApi.getCountryStateUrl(1));
      if (response && response.data.result) {
        setStates(response.data.result);
      }
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };
  const fetchCountry = async (stateId) => {
    try {
      setCountry([]);

      if (stateId.length === 0) {
        setSelectedCountry([]); 
        return;
      }

      let Country = [];

      for (let id of stateId) {
        const response = await apiRequestGet(DropdownApi.getCountryCityUrl(id));
        if (response && response.data.result) {
          const stateNames = response.data.result.map(state => ({ name: state.name, id: state.id }));
          Country = [...Country, ...stateNames]
          // console.log("response.data.result.name",response.data.result)
        }
        setCountry(Country);
      }
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  }

  // const fetchStates = async () => {
  //   try {
  //     const response = await apiRequestGet(DropdownApi.State);
  //     if (response && response.data.result) {
  //       setStates(response.data.result);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching states:", error);
  //   }
  // };
  // const fetchCountry = async () => {
  //   try {
  //     const response = await apiRequestGet(DropdownApi.Country);
  //     if (response && response.data.result) {
  //       setCountry(response.data.result);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching states:", error);
  //   }
  // };

  // const handleStateChange = (selectedNames) => {
  //   const selectedStatesData = states.filter((state) =>
  //     selectedNames.includes(state.name)
  //   );

  //   setStateId(selectedStatesData.map((state) => state.id)); // Store Selected State IDs
  // };
  // const handleCountryChange = (selectedNames) => {
  //   const selectedStatesData = country.filter((country) =>
  //     selectedNames.includes(country.name)
  //   );
  //   setCountryId(selectedStatesData.map((state) => state.id)); // Store Selected State IDs
  // };

  const handleStateChange = (selectedNames) => {
    const selectedStatesData = states.filter((state) =>
      selectedNames.includes(state.name)
    );

    const selectedStateIds = selectedStatesData.map((state) => state.id); // Extract IDs correctly

    console.log(selectedNames)


    if (selectedStateIds.length > 0) {
      fetchCountry(selectedStateIds); // Pass correct state IDs
    }else {
      setCountry([]); 
      setSelectedCountry([]); 
    }

    setSelectedState(selectedStateIds); // Store selected state IDs correctly

    setErrors({
      ...error,
      state: ''
    });
  };

  const handleCountryChange = (selectedNames) => {
    const selectedStatesData = country.filter((country) =>
      selectedNames.includes(country.name)
    );
    setSelectedCountry(selectedStatesData.map((state) => state.id)); // Store Selected State IDs
    setErrors({
      ...error,
      country: ''
    });
  };


  // const commitments = [
  //   "24 hours",
  //   "48 hours",
  //   "3-5 days",
  //   "More than 5 days",
  //   "Varies by state",
  // ];
  const businessTypes = [
    "24 hours",
    "48 hours",
    "3-5 days",
    "more then 5 days",
    "Varies by state"
  ];

  const propertyTypes = [
    "Residential",
    "Commercial",
    "Luxury",
    "Foreclosures",
    "Investment Properties",
    "Land",
  ]



  const TypesofServices = [
    "Title Searches",
    "Title Insurance",
    "Escrow Services ",
    "Closing & Settlement Services",
    "Lien & Judgment Searches",
    "1031 Exchange Services",
  ];
  const realwork = ["Residential", "Commercial", "Both"];

  const ServiceArea = [
    "Select All",
    "Alaska",
    "Alabama",
    "Arkansas",
    "Arizona",
    "California",
  ];

  const bilingualServices = [
    'English',
    'French',
    'Russian',
    'Chinese(Mandarin)'
  ]

  const clientserve = [
    "Mortgage Lenders",
    "Real Estate Agents",
    "Home Buyers & Sellers",
    "Law Firms",
    "REO & Foreclosure Specialists",
    "Government & Municipalities",
  ];

  const apprsisalAll = [
    "<10",
    "10-25",
    "25-50",
    "50-100",
    "100+",
  ]


  const Affiliations = [
    "Select All",
    "First American",
    "Fidelity National",
    "Stewart",
    "Old Republic",
    "Etc",
  ];

  const Memberships = ["ALTA", "TTA", "Etc"];
  // Previous Step
  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const convertTo24HourFormat = (time) => {
    if (!time) return '';
    const [timePart, ampm] = time.split(' ');
    let [hours, minutes] = timePart.split(':');
    if (ampm === 'PM' && hours !== '12') {
      hours = parseInt(hours, 10) + 12;
    } else if (ampm === 'AM' && hours === '12') {
      hours = '00';
    }
    return `${hours}:${minutes}`;
  };

  const handleSave = async () => {
    const AUTHTOKEN = localStorage.getItem("AUTHTOKEN");

    const formData = new FormData();
    formData.append("business_type", localStorage.getItem("selectedBusiness") || "");

    formData.append("first_name", firstName || "");
    formData.append("last_name", lastName || "");
    formData.append("business_name", companyName || "");
    formData.append("business_address", address1 || "");
    formData.append("website", website || "");
    formData.append("country_code", countryCode || "");
    formData.append("phone", phonenumeber || "");
    formData.append("email", email || "");

    formData.append("states", Object.values(selectedState).join(",") || "");
    formData.append("counties", Object.values(selectedCountry).join(",") || "");
    formData.append("certification", certification || "");
    formData.append("underwriter_affiliations", Object.values(selectedAffiliations).join(",") || "");
    formData.append("industry_membership", Object.values(selectedIndustryMembership).join(",") || "");

    formData.append("commitments", selectedCommitments || "");
    formData.append("type_of_services", Object.values(selectedServices).join(",") || "");
    formData.append("property_types", Object.values(specific).join(",") || "");
    formData.append("ron", IsRon === "yes" ? 1 : IsRon === "no" ? 0 : null);

    selectedTimes.forEach((item, index) => {
      formData.append(`working_hours[${index}][day]`, item.day);
      formData.append(`working_hours[${index}][from]`, convertTo24HourFormat(item.from));
      formData.append(`working_hours[${index}][to]`, convertTo24HourFormat(item.to));
    });
    formData.append("time_zone", timeZone || "");


    formData.append("clients_do_you_serves", Object.values(selectedClientsserves).join(",") || "");
    formData.append("transaction_per_month", selectedtransactionsMonth || "");
    formData.append("bilingual_services", bilingual === "yes" ? 1 : bilingual === "no" ? 0 : null);
    formData.append("bilingual_service_list", Object.values(bilingualData).join(",") || "");


    formData.append("short_bio", bio || "");
    formData.append("about_us", aboutBusiness || "");
    if (companyLogo) formData.append("company_logo", companyLogo);
    if (coverImage) formData.append("cover_image", coverImage);

    try {
      const response = await apiRequestPost1(addlistingApi.AddTitleAbstractor, formData, AUTHTOKEN, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // Accept: "application/json",
        },
      });

      if (response && response.success) {
        // localStorage.setItem("user", JSON.stringify(result));
        showToast(response);
        navigate('/Listing')

      } else {
        console.error("Login failed:", response);
        console.log("Login failed:", response);
        showToast(response);
      }
    } catch (error) {

      console.error("Login error:", error);
      showToast(error);
    }
  };

  const formatPhoneNumber = (phone) => {
    if (!phone) return "";
    return phone.replace(/^(\+\d{1,3})(\d+)/, "$1 $2");
  };

  const handleVerifyOtp = async () => {
    try {
      let payload = {};
      if (showOtpFields1) {
        payload = {
          phone: phonenumeber,
          otp: otp1,
        };
      } else if (showOtpFields) {
        payload = {
          email: email,
          otp: otp,
        };
      }

      const response = await apiRequestPost(AuthApi.Verify_otp, payload);

      if (response && response.success) {
        showToast(response);
        if (showOtpFields1) {
          setIsPhoneVerified(true);
          setShowOtpFields1(false);
        } else if (showOtpFields) {
          setIsEmailVerified(true);
          setShowOtpFields(false);
        }

      } else {
        console.error("OTP verification failed:", response?.message);
        showToast(response);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  const handlePhoneChange = (phone, country) => {
    if (!country || !country.dialCode) {
      console.warn("Country data is missing or invalid");
      return;
    }
    // console.log("country.dialCode ", country.dialCode);
    setCountryCode(`${country.dialCode}`);
    setPhone(phone);
    let cleanPhone = phone
      .replace(new RegExp(`^\\+?${country.dialCode}`), "")
      .trim();
    // console.log("cleanPhone ", cleanPhone);

    setPhonenumber(cleanPhone);
  };

  const handleGetEmailOtp = async () => {

    try {
      await step1Schema_email.validate({ email }, { abortEarly: false });
      const response = await apiRequestPost(AuthApi.Send_otp, { email });
      console.log("response", response);
      if (response && response.success) {
        setShowOtpFields(true);
        showToast(response);
      } else {
        console.error("Failed to send OTP for email:", response?.message);
        showToast(response);
      }
    } catch (err) {
      const newErrors = {};
      err.inner.forEach((error) => {
          newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
      console.error("Error sending OTP:", err);
    }
  };
  const handleGetPhoneOtp = async () => {
    try {

      await step1Schema_phone.validate({ phonenumeber }, { abortEarly: false });
      const payload = {
        phone: phonenumeber,
        country_code: `+${countryCode}`,
      };

      // console.log("Sending OTP request:", payload);

      const response = await apiRequestPost(AuthApi.Send_otp, payload);

      // console.log("Phone OTP Response:", response);

      if (response && response.success) {
        setShowOtpFields1(true);
        showToast(response);
      } else {
        console.error("Failed to send OTP for phone:", response?.message);
        showToast(response);
      }
   } catch (err) {
      const newErrors = {};
      err.inner.forEach((error) => {
          newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
      console.error("Error sending OTP:", err);
    }
  };

  const convertTo12HourFormat = (time) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const parsedHours = parseInt(hours, 10);
    const ampm = parsedHours >= 12 ? 'PM' : 'AM';
    const twelveHourFormat = parsedHours % 12 || 12;
    return `${twelveHourFormat}:${minutes} ${ampm}`;
  };


console.log(selectedState)

  const handleCheckboxChange = (day) => {
    const isSelected = selectedTimes.some((time) => time.day === day.day);
    if (isSelected) {
      // Remove the day from selectedTimes
      setSelectedTimes(selectedTimes.filter((time) => time.day !== day.day));
    } else {
      // Add the day to selectedTimes with default times
      setSelectedTimes([...selectedTimes, { ...day, from: '09:00 AM', to: '05:30 PM' }]);
    }
  };

  const handleTimeChange = async (day, type, value) => {
    const updatedSelectedTimes = selectedTimes.map((time) =>
      time.day === day ? { ...time, [type]: value } : time
    );
    setSelectedTimes(updatedSelectedTimes);

    try {
      await validationSchemaTime.validate({ selectedTimes: updatedSelectedTimes }, { abortEarly: false });
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[day];
        return newErrors;
      });
    } catch (err) {
      const newErrors = {};
      err.inner.forEach((error) => {
        const data = error.path.split('[',)
        const data2 = error.path.split('.',)
        if (!newErrors[data[0] + '_']) {
          newErrors[data[0] + '_'] = [];
        }

        const index = data[1]?.split(']')[0];

        if (!newErrors[data[0] + '_'][index]) {
          newErrors[data[0] + '_'][index] = { to: '', from: '' };
        }

        const fieldObject = newErrors[data[0] + '_'][index];

        if (data2[1] === 'to') {
          fieldObject.to = error.message;
        } else if (data2[1] === 'from') {
          fieldObject.from = error.message;
        }
      });
      setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
    }
  };

  const resetAll = () => {
    setPhone("")
    setShowOtpFields1(false)
  }

  const resetAll_2 = () => {
    setEmail("")
    setShowOtpFields(false)
  }

  return (
    <div className="h-screen flex flex-col overflow-auto">
      {/* Header */}
      <div className="hidden lg:block fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      <div className="block lg:hidden fixed top-0 left-0 w-full z-50">
        <TopHeader />
      </div>

      {/* Content */}
      <div className="flex flex-1 items-center justify-center my-[100px] sm:p-6 md:p-10">
        <div className="container mx-auto">
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 w-full bg-white rounded-lg">
              {/* Left Side - Illustration */}
              <div className="flex justify-center p-4 md:p-6">
                <img
                  src={home1}
                  alt="Signup Illustration"
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* Right Side - Signup Form */}
              <div className="space-y-6 sm:space-y-4 bg-[#F7FBFE] p-6 sm:p-10 rounded-[20px] shadow-[0px_0px_40px_0px_rgba(0,30,108,0.2)] xl:w-[600px] 2xl:w-[789px] h-auto flex flex-col justify-start">
                {step === 1 && (
                  <>
                    <div className="flex justify-between items-center mb-4 text-[22px]  min-[1025px]:text-[26px] min-[1441px]:text-[32px] p-3 text-center font-semibold">
                      <FaArrowLeftLong onClick={prevStep} />

                      <h2 className=" ">Basic Title Company Information</h2>
                      <span className="text-gray-500  ">
                        <span className="text-[var(--primary-color)]">
                          {step}
                        </span>
                        /6
                      </span>
                    </div>
                    <div className="space-y-6 sm:space-y-6 text-[14px] min-[1441px]:text-[18px] font-normal">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-2">
                          {" "}
                          <label className="text-gray-800 block mb-1">
                            First Name <span className="text-red-500">*</span>
                          </label>
                          <InputField
                            type="text"
                            placeholder="Enter your first name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                          {error.firstName && <p className="text-sm text-red-500">{error.firstName}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                          {" "}
                          <label className="text-gray-800 block mb-1">
                            Last Name <span className="text-red-500">*</span>
                          </label>
                          <InputField
                            type="text"
                            placeholder="Enter your last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                          />
                          {error.lastName && <p className="text-sm text-red-500">{error.lastName}</p>}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        {" "}
                        <label className="text-gray-800">
                          Business Name <span className="text-red-500">*</span>
                        </label>
                        <InputField
                          placeholder="What is your business’s name?"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                        />
                        {error.companyName && <p className="text-sm text-red-500">{error.companyName}</p>}
                      </div>

                      <div className="flex flex-col gap-2">
                        {" "}
                        <label className="text-gray-800 block mb-1">
                          Business Address{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <Check
                          set={(e) => setAddress1(e?.description)}
                          type='text'
                          value={address1}
                          placeholder="Please provide your physical address (or main office location)."
                        />
                        {error.address1 && <p className="text-sm text-red-500">{error.address1}</p>}
                      </div>
                      <div className="flex flex-col gap-2">
                        {" "}
                        <label className="text-gray-800">
                          Website URL (Optional){" "}
                          {/* <span className="text-red-500">*</span> */}
                        </label>
                        <InputField
                          placeholder="Do you have a website? If so, please provide the URL."
                          value={website}
                          onChange={(e) => setwebsite(e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-2">
                          <label className="text-[var(--lable)]">
                            Phone <span className="text-red-500">*</span>
                          </label>
                          {isPhoneVerified ? (
                            <CustomPhoneInput3
                              placeholder={formatPhoneNumber(phone)}
                              value={formatPhoneNumber(phone)}
                            />
                          ) : showOtpFields1 ? (
                            <div className="flex flex-col gap-5">
                              <CustomPhoneInput1
                                setAgain={resetAll}
                                placeholder={formatPhoneNumber(phone)}
                                value={formatPhoneNumber(phone)}
                                onGetOtp={handleGetPhoneOtp}
                                onChange={handlePhoneChange}
                              />
                              <CustomInput1
                                placeholder="Enter OTP"
                                value={otp1}
                                onChange={(e) => {
                                  let newValue = e.target.value;

                                  // Ensure only numbers are entered (extra safeguard)
                                  newValue = newValue.replace(/\D/g, "");

                                  // Allow only up to 6 digits
                                  if (newValue.length <= 6) {
                                    setOtp1(newValue);
                                  }
                                }}
                                onGetVerify={handleVerifyOtp}
                              />
                            </div>
                          ) : (
                            <CustomPhoneInput
                              placeholder="Enter your phone number"
                              value={formatPhoneNumber(phone)}
                              onChange={handlePhoneChange}
                              onGetOtp={handleGetPhoneOtp}
                            />
                          )}
                          {error.phonenumeber && <p className="text-sm text-red-500">{error.phonenumeber}</p>}
                          {!error?.phonenumeber && error?.mobile && <p className="text-sm text-red-500">{error.mobile}</p>}
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-gray-800">
                            Email <span className="text-red-500">*</span>
                          </label>
                          {isEmailVerified ? (
                            <CustomInput3 placeholder={email} value={email} />
                          ) : showOtpFields ? (
                            <div className="flex flex-col gap-5">
                              <CustomInput2 placeholder={email} value={email}
                                setAgain={resetAll_2}
                                onGetOtp={handleGetEmailOtp}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                              <CustomInput1
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => {
                                  let newValue = e.target.value;

                                  // Ensure only numbers are entered (extra safeguard)
                                  newValue = newValue.replace(/\D/g, "");

                                  // Allow only up to 6 digits
                                  if (newValue.length <= 6) {
                                    setOtp(newValue);
                                  }
                                }}
                                onGetVerify={handleVerifyOtp}
                              />
                            </div>
                          ) : (
                            <CustomInput
                              placeholder="Enter your email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              onGetOtp={handleGetEmailOtp}
                            />
                          )}
                          {error.email && <p className="text-sm text-red-500">{error.email}</p>}
                          {!error?.email && error?.email && <p className="text-sm text-red-500">{error.email}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:gap-5 w-full max-w-[300px] sm:max-w-[400px] h-[56px] mx-auto rounded-[10px] p-3 sm:p-4 ">
                        <button
                          className="bg-[var(--primary-color)] text-white py-2 rounded-[10px] w-full flex items-center justify-center gap-x-2
                                                         cursor-pointer text-[14px] sm:text-[18px] font-normal"
                          onClick={nextStep}
                        >
                          {step === 8 ? "Submit" : "Next"}
                        </button>
                      </div>
                    </div>
                  </>
                )}
                {step === 2 && (
                  <>
                    <div className="flex justify-between items-center mb-4 text-[22px]  min-[1025px]:text-[26px] min-[1441px]:text-[32px] p-1 text-center font-semibold">
                      {step > 1 && <FaArrowLeftLong onClick={prevStep} />}
                      <h2 className=" ">Business Credentials & Experience</h2>
                      <span className="text-gray-500  ">
                        <span className="text-[var(--primary-color)]">
                          {step}
                        </span>
                        /6
                      </span>
                    </div>
                    <form className="space-y-6 sm:space-y-6 text-[14px] min-[1441px]:text-[18px] font-normal">
                      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-2">
                          {" "}
                          <label className="text-[var(--lable)] block mb-1">
                            What states do you serve? <span className="text-red-500">*</span>
                          </label>
                          <Dropdown1
                            options={states.map((state) => state.name)}
                            placeholder={"Select State"}
                            onChange={handleStateChange}
                          />
                          {error.selectedState && <p className="text-sm text-red-500">{error.selectedState}</p>}
                        </div>
                        {/* <div className="flex flex-col gap-2">
                          {" "}
                          <label className="text-gray-800 block mb-1">
                            What counties do you serve? <span className="text-red-500">*</span>
                          </label>
                          <Dropdown1
                            options={country.map((state) => state.name)}
                            placeholder={"Select counties"}
                            onChange={handleCountryChange}
                          />
                        </div> */}
                        <div className="flex flex-col gap-2">
                          {" "}
                          <label className="text-[var(--lable)] block mb-1">
                            What counties do you serve? <span className="text-red-500">*</span>
                          </label>
                          <Dropdown1
                            options={country.map((country) => country.name)}
                            placeholder={"Select counties"}
                            onChange={handleCountryChange}
                          />
                          {error.selectedCountry && <p className="text-sm text-red-500">{error.selectedCountry}</p>}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        {" "}
                        <label className="text-gray-800">
                          Underwriter Affiliations{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <Dropdown1
                          options={Affiliations}
                          onChange={(value) => setSelectedAffiliations(value)}
                          placeholder="Select all that apply"
                        />
                        {error.selectedAffiliations && <p className="text-sm text-red-500">{error.selectedAffiliations}</p>}
                      </div>
                      <div className="flex flex-col gap-2">
                        {" "}
                        <label className="text-[var(--lable)] block mb-1">
                          Licenses & Certifications{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <InputField
                          type="text"
                          value={certification}
                          onChange={(e) => setcertification(e.target.value)}
                          placeholder="e.g., state title agent license, professional certifications"
                        />
                        {error.certification && <p className="text-sm text-red-500">{error.certification}</p>}
                      </div>
                      <div className="flex flex-col gap-2">
                        {" "}
                        <label className="text-gray-800 block mb-1">
                          Industry Memberships (Optional){" "}
                          {/* <span className="text-red-500">*</span> */}
                        </label>
                        <Dropdown1
                          options={Memberships}
                          onChange={(value) => setSelectedIndustryMembership(value)}
                          placeholder="Are you a member of any professional associations?"
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:gap-5 w-full max-w-[300px] sm:max-w-[400px] h-[56px] mx-auto rounded-[10px] p-3 sm:p-4 ">
                        <button
                          className="bg-[var(--primary-color)] text-white py-2 rounded-[10px] w-full flex items-center justify-center gap-x-2
                   cursor-pointer text-[14px] sm:text-[18px] font-normal"
                          onClick={nextStep}
                        >
                          {step === 5 ? "Submit" : "Next"}
                        </button>
                      </div>
                    </form>
                  </>
                )}
                {step === 3 && (
                  <>
                    <div className="flex justify-between items-center mb-4 text-[22px]  min-[1025px]:text-[26px] min-[1441px]:text-[32px] p-1 text-center font-semibold">
                      {step > 1 && <FaArrowLeftLong onClick={prevStep} />}
                      <h2 className=" ">Services Offered</h2>
                      <span className="text-gray-500  ">
                        <span className="text-[var(--primary-color)]">
                          {step}
                        </span>
                        /6
                      </span>
                    </div>
                    <form className="space-y-6 sm:space-y-6 text-[14px] min-[1441px]:text-[18px] font-normal">
                      {/* <div className="flex flex-col gap-2">
                        {" "}
                        <label className="text-gray-800 block mb-1">
                          What is your average turnaround time for title
                          commitments?<span className="text-red-500">*</span>
                        </label>
                        <Dropdown2
                          options={commitments}
                          onChange={(value) => setSelectedCommitments(value)}
                          placeholder="Select one"
                        />
                      </div> */}
                      <div className="flex flex-col gap-2">
                        {" "}
                        <label className="text-[var(--lable)] block mb-1">
                          What is your average turnaround time for title
                          commitments? <span className="text-red-500">*</span>
                        </label>
                        <Dropdown2
                          options={businessTypes}
                          onChange={(value) => setSelectedCommitments(value)}
                          placeholder="Select one"
                        />
                        {error.selectedCommitments && <p className="text-sm text-red-500">{error.selectedCommitments}</p>}
                      </div>
                      <div className="flex flex-col gap-2">
                        {" "}
                        <label className="text-gray-800 block mb-1">
                          What services does your title company provide?
                          <span className="text-red-500">*</span>
                        </label>
                        <Dropdown1
                          options={TypesofServices}
                          onChange={(value) => setSelectedServices(value)}
                          placeholder="Check all that apply"
                        />
                        {error.selectedServices && <p className="text-sm text-red-500">{error.selectedServices}</p>}
                      </div>
                      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-2">
                          {" "}
                          <label className="text-gray-800 block mb-1">
                            Service Area <span className="text-red-500">*</span>
                          </label>
                           <FileUpload onFileSelect={(file) => setSpreadsheetFileName(file)} />
                        </div>
                        <div className="flex flex-col gap-2">
                          {" "}
                          <label className="text-gray-800 block mb-1">
                            Types of real estate work?{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <Dropdown1
                            options={realwork}
                            onChange={(value) => setSelectedRealestateWork(value)}
                            placeholder="Operating hours or availability"
                          />
                        </div>
                      </div> */}

                      {/* <div className="flex flex-col gap-2">
                        {" "}
                        <label className="text-gray-800 block mb-1">
                          Specific Property Types
                          <span className="text-red-500">*</span>
                        </label>
                        <Dropdown1
                          options={TypesofServices}
                          onChange={(value) => setSelectedServices(value)}
                          placeholder="Select work type"
                        />
                      </div> */}
                      <div className="flex flex-col gap-2">
                        {" "}
                        <label className="text-[var(--lable)] block mb-1">
                          Specific Property of types{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <Dropdown1
                          options={propertyTypes}
                          onChange={(value) => setSpecific(value)}
                          placeholder="Select Specialization"
                        />
                        {error.specific && <p className="text-sm text-red-500">{error.specific}</p>}
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="">
                          {" "}
                          <p>Do you offer remote online notarization (RON)?</p>
                          <div className="flex ms-2 mt-2">
                            {" "}
                            <label className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="radio"
                                name="IsRon"
                                value="yes"
                                checked={IsRon === "yes"}
                                onChange={() => setIsRon("yes")}
                                className="appearance-none w-6 h-6 rounded-md border-2 border-white
             bg-[#E5E6EB] shadow-[1px_1px_3px_0px_rgba(0,0,0,0.2),-1px_-1px_3px_0px_rgba(255,255,255,0.8)]
             checked:bg-blue-500 checked:border-white
             checked:shadow-[4px_4px_8px_0px_rgba(0,0,0,0.3),-4px_-4px_8px_0px_rgba(255,255,255,1)] 
             relative transition-all duration-200 ease-in-out 
             checked:before:content-['✓'] checked:before:absolute checked:before:text-white 
             checked:before:text-[12px] checked:before:font-bold checked:before:left-1/2 
             checked:before:top-1/2 checked:before:-translate-x-1/2 checked:before:-translate-y-1/2"
                              />
                              <span className="text-gray-700">Yes</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer ms-2">
                              <input
                                type="radio"
                                name="IsRon"
                                value="no"
                                checked={IsRon === "no"}
                                onChange={() => setIsRon("no")}
                                className="appearance-none w-6 h-6 rounded-md border-2 border-white
             bg-[#E5E6EB] shadow-[1px_1px_3px_0px_rgba(0,0,0,0.2),-1px_-1px_3px_0px_rgba(255,255,255,0.8)]
             checked:bg-blue-500 checked:border-white
             checked:shadow-[4px_4px_8px_0px_rgba(0,0,0,0.3),-4px_-4px_8px_0px_rgba(255,255,255,1)] 
             relative transition-all duration-200 ease-in-out 
             checked:before:content-['✓'] checked:before:absolute checked:before:text-white 
             checked:before:text-[12px] checked:before:font-bold checked:before:left-1/2 
             checked:before:top-1/2 checked:before:-translate-x-1/2 checked:before:-translate-y-1/2"
                              />

                              <span className="text-gray-700">No</span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-4 sm:gap-5 w-full max-w-[300px] sm:max-w-[400px] h-[56px] mx-auto rounded-[10px] p-3 sm:p-4 ">
                        <button
                          className="bg-[var(--primary-color)] text-white py-2 rounded-[10px] w-full flex items-center justify-center gap-x-2
                   cursor-pointer text-[14px] sm:text-[18px] font-normal"
                          onClick={nextStep}
                        >
                          {step === 5 ? "Submit" : "Next"}
                        </button>
                      </div>
                    </form>
                  </>
                )}
                {step === 4 && (
                  <>
                    <div className="flex justify-between items-center mb-4 text-[22px]  min-[1025px]:text-[26px] min-[1441px]:text-[32px] p-3 text-center font-semibold">
                      <FaArrowLeftLong onClick={prevStep} />
                      <h2 className=" ">Working Hours</h2>
                      <span className="text-gray-500  ">
                        <span className="text-[var(--primary-color)]">
                          {step}
                        </span>
                        /6
                      </span>
                    </div>
                    <form className="space-y-6 sm:space-y-6 text-[14px] min-[1441px]:text-[18px] font-normal ">
                      <div className="space-y-3">
                        <span>Select Time Zone</span>
                        <div className="flex flex-row flex-wrap gap-7">
                          {timeZones.map((list, i) => (
                            <label key={i} className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="radio"
                                name="time"
                                checked={list == timeZone}
                                onChange={() => setTimezone(list)}
                                className="appearance-none w-6 h-6 rounded-md border-2 border-white
                                  bg-[#E5E6EB] shadow-[1px_1px_3px_0px_rgba(0,0,0,0.2),-1px_-1px_3px_0px_rgba(255,255,255,0.8)]
                                  checked:bg-blue-500 checked:border-white
                                  checked:shadow-[4px_4px_8px_0px_rgba(0,0,0,0.3),-4px_-4px_8px_0px_rgba(255,255,255,1)] 
                                  relative transition-all duration-200 ease-in-out 
                                  checked:before:content-['✓'] checked:before:absolute checked:before:text-white 
                                  checked:before:text-[12px] checked:before:font-bold checked:before:left-1/2 
                                  checked:before:top-1/2 checked:before:-translate-x-1/2 checked:before:-translate-y-1/2"
                              />
                              <span className="text-gray-700">{list}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-3 font-semibold border-b border-[#020C1626] pb-2">
                        <h1 className="text-start">Day</h1>
                        <h1 className="text-[#6C6C6C] text-start">From</h1>
                        <h1 className="text-[#6C6C6C] text-start">To</h1>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        {times.map((list, i) => {
                          const isSelected = selectedTimes.some((time) => time.day === list.day);
                          const selectedDayData = selectedTimes.find((time) => time.day === list.day);

                          return (
                            <>
                              <div key={i} className="flex flex-row gap-4 pe-10 justify-between place-items-center w-full">
                                <span>{list.day}</span>
                                <label className="flex items-center cursor-pointer">
                                  <div className="relative">
                                    <input
                                      type="checkbox"
                                      className="sr-only"
                                      checked={selectedTimes.includes(list)}
                                      onChange={() => handleCheckboxChange(list)}
                                    />
                                    <div
                                      className={`w-7 h-4 rounded-full shadow-inner transition-colors ${isSelected ? 'bg-blue-500' : 'bg-gray-300'
                                        }`}
                                    ></div>
                                    <div
                                      className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full shadow-md transform transition-transform ${isSelected ? 'translate-x-3' : 'translate-x-0'
                                        }`}
                                    ></div>
                                  </div>
                                </label>
                              </div>
                              {isSelected ? (
                                <>
                                  <div className="">
                                    <input
                                      type="time"
                                      className="text-nowrap w-full rounded-lg px-2 py-1 border border-[#020C1626]"
                                      value={convertTo24HourFormat(selectedDayData?.from || '')}
                                      onChange={(e) => handleTimeChange(list.day, 'from', convertTo24HourFormat(e.target.value))}
                                    />
                                    <p className="text-sm text-red-500">{error.selectedTimes_ && error?.selectedTimes_[i]?.from}</p>
                                  </div>
                                  <div className="">
                                    <input
                                      type="time"
                                      className="text-nowrap w-full rounded-lg px-2 py-1 border border-[#020C1626]"
                                      value={convertTo24HourFormat(selectedDayData?.to || '')}
                                      onChange={(e) => handleTimeChange(list.day, 'to', convertTo24HourFormat(e.target.value))}
                                    />
                                    <p className="text-sm text-red-500">{error.selectedTimes_ && error?.selectedTimes_[i]?.to}</p>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className=""></div>
                                  <div className="bg-[#EDF0F6] w-full rounded-lg text-center ps-[24px] pe-[24px] text-lg pt-[12px] pb-[12px] font-semibold mt-2">
                                    Closed
                                  </div>
                                </>
                              )}
                            </>
                          )
                        })}
                      </div>
                      {error.selectedTimes && <p className="text-sm text-red-500">{error.selectedTimes}</p>}
                      <div className="grid grid-cols-1 gap-4 sm:gap-5 w-full max-w-[300px] sm:max-w-[400px] h-[56px] mx-auto rounded-[10px] p-3 sm:p-4 ">
                        <button
                          className="bg-[var(--primary-color)] text-white py-2 rounded-[10px] w-full flex items-center justify-center gap-x-2 cursor-pointer text-[14px] sm:text-[18px] font-normal"
                          onClick={nextStep}
                        >
                          {step === 5 ? "Submit" : "Next"}

                        </button>
                      </div>
                    </form>
                  </>
                )}
                {step === 5 && (
                  <>

                    <div className="flex justify-between items-center mb-4 text-[22px]  min-[1025px]:text-[26px] min-[1441px]:text-[32px] p-1 text-center font-semibold">
                      {step > 1 && <FaArrowLeftLong onClick={prevStep} />}
                      <h2 className=" ">Client & Transaction Details</h2>
                      <span className="text-gray-500  ">
                        <span className="text-[var(--primary-color)]">
                          {step}
                        </span>
                        /6
                      </span>
                    </div>
                    <form className="space-y-6 sm:space-y-6 text-[14px] min-[1441px]:text-[18px] font-normal">
                      <div className="flex flex-col gap-2">
                        {" "}
                        <label className="text-gray-800 block mb-1">
                          What types of clients do you serve?{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <Dropdown1
                          options={clientserve}
                          onChange={(value) => setSelectedClientsserves(value)}
                          placeholder="Select all that apply"
                        />
                        {error.selectedClientsserves && <p className="text-sm text-red-500">{error.selectedClientsserves}</p>}
                      </div>
                      <div className="flex flex-col gap-2">
                        {" "}
                        <label className="text-gray-800 block mb-1">
                          How many transactions do you typically handle per
                          month? <span className="text-red-500">*</span>
                        </label>
                        <Dropdown2
                          options={apprsisalAll}
                          onChange={(value) => setSelectedtransactionsMonth(value)}
                          placeholder="Estimate or range."
                        />
                        {error.selectedtransactionsMonth && <p className="text-sm text-red-500">{error.selectedtransactionsMonth}</p>}
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="">
                          {" "}
                          <p>Do you provide bilingual services?</p>
                          <div className="flex ms-2 mt-2">
                            {" "}
                            <label className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="radio"
                                name="contactMethod"
                                value="yes"
                                checked={bilingual == 'yes'}
                                onChange={() => setBilingual('yes')}
                                className="appearance-none w-6 h-6 rounded-md border-2 border-white
             bg-[#E5E6EB] shadow-[1px_1px_3px_0px_rgba(0,0,0,0.2),-1px_-1px_3px_0px_rgba(255,255,255,0.8)]
             checked:bg-blue-500 checked:border-white
             checked:shadow-[4px_4px_8px_0px_rgba(0,0,0,0.3),-4px_-4px_8px_0px_rgba(255,255,255,1)] 
             relative transition-all duration-200 ease-in-out 
             checked:before:content-['✓'] checked:before:absolute checked:before:text-white 
             checked:before:text-[12px] checked:before:font-bold checked:before:left-1/2 
             checked:before:top-1/2 checked:before:-translate-x-1/2 checked:before:-translate-y-1/2"
                              />
                              <span className="text-gray-700">Yes</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer ms-2">
                              <input
                                type="radio"
                                name="contactMethod"
                                value="no"
                                checked={bilingual == 'no'}
                                onChange={() => setBilingual('no')}
                                className="appearance-none w-6 h-6 rounded-md border-2 border-white
             bg-[#E5E6EB] shadow-[1px_1px_3px_0px_rgba(0,0,0,0.2),-1px_-1px_3px_0px_rgba(255,255,255,0.8)]
             checked:bg-blue-500 checked:border-white
             checked:shadow-[4px_4px_8px_0px_rgba(0,0,0,0.3),-4px_-4px_8px_0px_rgba(255,255,255,1)] 
             relative transition-all duration-200 ease-in-out 
             checked:before:content-['✓'] checked:before:absolute checked:before:text-white 
             checked:before:text-[12px] checked:before:font-bold checked:before:left-1/2 
             checked:before:top-1/2 checked:before:-translate-x-1/2 checked:before:-translate-y-1/2"
                              />

                              <span className="text-gray-700">No</span>
                            </label>
                          </div>
                        </div>
                      </div>
                      {bilingual == 'yes' &&
                        <>
                          <Dropdown1
                            options={bilingualServices}
                            onChange={(value) => setBilingualdata(value)}
                            placeholder="Select Bilingual Services"
                          />
                          {error.bilingualData && <p className="text-sm text-red-500">{error.bilingualData}</p>}
                        </>
                      }
                      <div className="grid grid-cols-1 gap-4 sm:gap-5 w-full max-w-[300px] sm:max-w-[400px] h-[56px] mx-auto rounded-[10px] p-3 sm:p-4 ">
                        <button
                          className="bg-[var(--primary-color)] text-white py-2 rounded-[10px] w-full flex items-center justify-center gap-x-2
                   cursor-pointer text-[14px] sm:text-[18px] font-normal"
                          onClick={nextStep}
                        >
                          {step === 5 ? "Submit" : "Next"}
                        </button>
                      </div>
                    </form>
                  </>
                )}
                {step === 6 && (
                  <>

                    <div className="flex justify-between items-center mb-4 text-[22px]  min-[1025px]:text-[26px] min-[1441px]:text-[32px] p-1 text-center font-semibold">
                      {step > 1 && <FaArrowLeftLong onClick={prevStep} />}
                      <h2 className=" ">Additional Information</h2>
                      <span className="text-gray-500">
                        <span className="text-[var(--primary-color)]">
                          {step}
                        </span>
                        /6
                      </span>
                    </div>
                    <form className="space-y-6 sm:space-y-6 text-[14px] min-[1441px]:text-[18px] font-normal">
                      <div className="flex flex-col gap-2">
                        {" "}
                        <label className="text-[var(--lable)]">
                          Short Bio <span className="text-red-500">*</span>
                        </label>
                        <InputField value={bio} type='text'
                          onChange={(e) => setBio(e.target.value)} placeholder="Enter your short Bio" />
                        {error.bio && <p className="text-sm text-red-500">{error.bio}</p>}
                      </div>
                      <div className="flex flex-col gap-2">
                        {" "}
                        <label className="text-[var(--lable)]">
                          About Business <span className="text-red-500">*</span>
                        </label>
                        <CustomTextArea value={aboutBusiness} type='number'
                          onChange={(e) => setAboutBusiness(e.target.value)} placeholder="Write Here..." />
                        {error.aboutBusiness && <p className="text-sm text-red-500">{error.aboutBusiness}</p>}
                      </div>
                      <div className="flex flex-col gap-2">
                        {" "}
                        <label className="text-[var(--lable)] block mb-1">
                          Add Company Logo
                        </label>
                        <FileUploadImage onFileSelect={(file) => setCompanyLogo(file)} selectedFile={companyLogo}
                        />
                        {error.companyLogo && <p className="text-sm text-red-500">{error.companyLogo}</p>}
                      </div>

                      <div className="flex flex-col gap-2">
                        {" "}
                        <label className="text-[var(--lable)] block mb-1">
                          Add Cover Image
                        </label>
                        <FileUploadImage onFileSelect={(file) => setCoverImage(file)} selectedFile={coverImage}
                        />
                        {error.coverImage && <p className="text-sm text-red-500">{error.coverImage}</p>}
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            checked={terms == 1}
                            onChange={() => setTerms('1')}
                            type="checkbox"
                            className="appearance-none w-6 h-6 rounded-md border-2 border-white
                              bg-[#E5E6EB] shadow-[1px_1px_3px_0px_rgba(0,0,0,0.2),-1px_-1px_3px_0px_rgba(255,255,255,0.8)]
                              checked:bg-blue-500 checked:border-white
                              checked:shadow-[4px_4px_8px_0px_rgba(0,0,0,0.3),-4px_-4px_8px_0px_rgba(255,255,255,1)] 
                              relative transition-all duration-200 ease-in-out 
                              checked:before:content-['✓'] checked:before:absolute checked:before:text-white 
                              checked:before:text-[12px] checked:before:font-bold checked:before:left-1/2 
                              checked:before:top-1/2 checked:before:-translate-x-1/2 checked:before:-translate-y-1/2"
                          />
                          <span className="text-[var(--lable)]">
                            Do you agree to our listing terms and conditions?
                          </span>
                        </label>
                        {error.terms && <p className="text-sm text-red-500">{error.terms}</p>}
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex">
                          {" "}
                          <p className="text-[var(--lable)]">
                            Do we have permission to contact you regarding your
                            listing?
                          </p>
                          <div className="flex ms-2">
                            {" "}
                            <label className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="radio"
                                name="contactMethod"
                                checked={status}
                                onChange={() => setStatus(true)}
                                value="yes"
                                className="appearance-none w-6 h-6 rounded-md border-2 border-white
                                bg-[#E5E6EB] shadow-[1px_1px_3px_0px_rgba(0,0,0,0.2),-1px_-1px_3px_0px_rgba(255,255,255,0.8)]
                                checked:bg-blue-500 checked:border-white
                                checked:shadow-[4px_4px_8px_0px_rgba(0,0,0,0.3),-4px_-4px_8px_0px_rgba(255,255,255,1)] 
                                relative transition-all duration-200 ease-in-out 
                                checked:before:content-['✓'] checked:before:absolute checked:before:text-white 
                                checked:before:text-[12px] checked:before:font-bold checked:before:left-1/2 
                                checked:before:top-1/2 checked:before:-translate-x-1/2 checked:before:-translate-y-1/2"
                              />
                              <span className="text-gray-700">Yes</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer ms-2">
                              <input
                                type="radio"
                                name="contactMethod"
                                checked={!status}
                                onChange={() => setStatus(false)}
                                value="no"
                                className="appearance-none w-6 h-6 rounded-md border-2 border-white
                                bg-[#E5E6EB] shadow-[1px_1px_3px_0px_rgba(0,0,0,0.2),-1px_-1px_3px_0px_rgba(255,255,255,0.8)]
                                checked:bg-blue-500 checked:border-white
                                checked:shadow-[4px_4px_8px_0px_rgba(0,0,0,0.3),-4px_-4px_8px_0px_rgba(255,255,255,1)] 
                                relative transition-all duration-200 ease-in-out 
                                checked:before:content-['✓'] checked:before:absolute checked:before:text-white 
                                checked:before:text-[12px] checked:before:font-bold checked:before:left-1/2 
                                checked:before:top-1/2 checked:before:-translate-x-1/2 checked:before:-translate-y-1/2"
                              />

                              <span className="text-gray-700">No</span>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:gap-5 w-full max-w-[300px] sm:max-w-[400px] h-[56px] mx-auto rounded-[10px] p-3 sm:p-4 ">
                        <button
                          className="bg-[var(--primary-color)] text-white py-2 rounded-[10px] w-full flex items-center justify-center gap-x-2 cursor-pointer text-[14px] sm:text-[18px] font-normal"
                          onClick={nextStep}
                        >
                          {step === 6 ? "Done" : "Next"}

                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
