import Navbar from "../../Components/TopHeader/NavBar";
import TopHeader from "../../Components/TopHeader/TopHeader";
import home1 from "../../Images/SurveyorCompany.png";
import * as yup from "yup";
import {
  CheckBoxButton,
  CheckBoxGroup,
  CustomInput,
  CustomInput1,
  CustomInput2,
  CustomInput3,
  CustomPhoneInput,
  CustomPhoneInput1,
  CustomPhoneInput3,
  CustomRadioButton,
  CustomTextArea,
  FileUpload,
  FileUploadImage,
  InputField,
} from "../../Components/Input/Input";
import { PiSignInBold } from "react-icons/pi";
import { showToast } from "../../Common/toastService";
import { apiRequestPost, apiRequestGet, apiRequestPost1 } from "../../Common/Common";
import { FaArrowLeftLong } from "react-icons/fa6";
import { ContactAgentModal, StateCounties } from "../../Components/Model/CustomModal";
import { useEffect, useState } from "react";
import {
  DatePicker,
  Dropdown1,
  Dropdown2,
  FileUploadEco,
} from "../../Components/Dropdown/Dropdown";
import { API_URLS } from "../../Apis/api";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Check from "../../Utiles/Check";
import { useNavigate } from "react-router";
const { AuthApi, DropdownApi, addlistingApi } = API_URLS;

const step1Schema = (checkemail) => yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  companyName: yup.string().required("Business Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phonenumeber: yup.string().required("Phone Number is required"),
  address1: yup.string().required("Business Address is required"),
  profileImg: yup
    .string()
    .required("Profile Photo is required"),
  zipCode:yup.string().required("zipCode is required"),
  password: checkemail === 1 ? yup.string().required("password is required") :  yup.string().notRequired()
});

const step1Schema_phone = yup.object().shape({
  phonenumeber: yup.string().required("Phone Number is required"),
});

const step1Schema_email = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
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
  selectedYearexperience: yup
    .string()
    .required("Years of Experience is required"),
  selectedIndustryMembership: yup
    .array()
    .min(1, "Please select at least one Industry Memberships")
    .required("Industry Memberships is required"),
});


const validationSchema_2 = yup.object().shape({
  selectedState: yup
    .array()
    .min(1, "Please select at least one state")
    .required("State selection is required"),
  selectedCountry: yup
    .array()
    .min(1, "Please select at least one country")
    .required("Country selection is required"),
  selectedYearexperience: yup
    .string()
    .required("Years of Experience is required"),
  selectedIndustryMembership: yup
    .array()
    .min(1, "Please select at least one Industry Memberships")
    .required("Industry Memberships is required"),
  licenseno: yup
    .string()
    .required("Bar License Number is required"),
  selectedlicenseState: yup
    .string()
    .required("State(s) Licensed is required"),
});

const validationSchema_3 = yup.object().shape({
  // selectedAve_time: yup
  //   .string()
  //   .required("Real Estate Legal Appraisals is required"),
  selectedService_provide: yup
    .array()
    .min(1, "Please select at least one real estate legal services")
    .required("real estate legal services is required"),
  selectedPrice_start_from: yup
    .string()
    .required("Price Start From is required"),
  selectedSpecialize: yup
    .array()
    .min(1, "Please select at least one Specialize")
    .required("Specialize is required"),
})

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

const validationSchema_5 = yup.object().shape({
  selectedTurnaroundTime: yup
    .array()
    .min(1, "Please select at least one Turnaround Time")
    .required("Turnaround Time is required"),
})
const validationSchema_5_price = yup.object().shape({
  selectedTurnaroundTime: yup
    .array()
    .min(1, "Please select at least one Turnaround Time")
    .required("Turnaround Time is required"),
  price: yup
    .number()
    .required("Price is required"),
})
const validationSchema_5_expedit = yup.object().shape({
  selectedTurnaroundTime: yup
    .array()
    .min(1, "Please select at least one Turnaround Time")
    .required("Turnaround Time is required"),
  expedit: yup
    .number()
    .required("Expedited is required"),
})
const validationSchema_5_both = yup.object().shape({
  selectedTurnaroundTime: yup
    .array()
    .min(1, "Please select at least one Turnaround Time")
    .required("Turnaround Time is required"),
  expedit: yup
    .number()
    .required("Expedited is required"),
  price: yup
    .number()
    .required("Price is required"),
})


const validationSchema_6 = yup.object().shape({
  client_type: yup
    .array()
    .min(1, "Please select at least one types of clients")
    .required("types of clients is required"),
  appraisals: yup
    .string()
    .required("appraisals is required"),
})

const validationSchema6_bilingualData = yup.object().shape({
  client_type: yup
    .array()
    .min(1, "Please select at least one types of clients")
    .required("types of clients is required"),
  appraisals: yup
    .string()
    .required("appraisals is required"),
  bilingualData: yup
    .array()
    .min(1, "Please select at least one Types of Bilingual Capabilities")
    .required("Bilingual Capabilities is required"),
});

const validationSchema_7 = yup.object().shape({
  client_contact: yup.array()
    .min(1, "Please select at least one Type of Contact to you")
    .required("clients to contact you is required"),
})

const validationSchema_7_media = yup.object().shape({
  client_contact: yup.array()
    .min(1, "Please select at least one Type of Contact to you")
    .required("clients to contact you is required"),
  
  facebook: yup.string().url('Invalid URL format'),
  instagram: yup.string().url('Invalid URL format'),
  linkedin: yup.string().url('Invalid URL format'),
  twitter: yup.string().url('Invalid URL format'),
  youtube: yup.string().url('Invalid URL format'),
   
   
  social_media: yup.mixed().test(
    "at-least-one-social",
    "At least one social media link is required",
    function () {
      const { facebook, instagram, linkedin, twitter, youtube } = this.parent;
      return facebook || instagram || linkedin || twitter || youtube;
    }
  ),
});


const validationSchema_8 = yup.object().shape({
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


export default function SurveyorCompany2() {

  //   const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLicensed, setIsLicensed] = useState(null);
  const [ispricing, setPricing] = useState(false);
  const [expedited, setExpedited] = useState(false);
  const [checkemail, setCheckEmail] = useState(null);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [selectedAve_time, setSelectedAve_time] = useState("");
  const [selectedService_provide, setSelectedService_provide] = useState([]);
  const [selectedPrice_start_from, setSelectedPrice_start_from] = useState("")
  const [surveying, setSurveying] = useState(false)
  const [bio, setBio] = useState("");
  const [aboutBusiness, setAboutBusiness] = useState("")
  const [selectedSpecialize, setSelectedSpecialize] = useState([])
  // const [insurance, setInsurance] = useState(null);
  const [virtual_consultant, setvirtual_consultant] = useState(null);
  const [showOtpFields, setShowOtpFields] = useState(false);
  const [profileImg, setProfileImg] = useState("");
  const [price, setPrice] = useState()
  const [expedit, setExpedit] = useState()
  const [selectedlicenseState, setSelectedlicenseState] = useState([]);
  const [selectedYearexperience, setSelectedYearexperience] = useState("");
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const [selectedIndustryMembership, setSelectedIndustryMembership] = useState([]);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [phone, setPhone] = useState("");
  const [showOtpFields1, setShowOtpFields1] = useState(false);
  const [phonenumeber, setPhonenumber] = useState("");
  const [otp1, setOtp1] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [socialmedia, setsocialmedia] = useState(false);
  const [facebook, setfacebook] = useState("");
  const [instagram, setinstagram] = useState("");
  const [linkedin, setlinkedin] = useState("");
  const [twitter, settwitter] = useState("");
  const [youtube, setyoutube] = useState("");
  const [licenseno, setLicenseno] = useState("");
  const [reviews, setreviews] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [address1, setAddress1] = useState("");
  const [website, setwebsite] = useState("");
  const [states, setStates] = useState([]);
  const [country, setCountry] = useState([]);
  const [client_type, setclient_type] = useState([]);
  const [client_contact, setclient_contact] = useState([]);
  const [appraisals, setAppraisals] = useState('')
  const [selectedState, setSelectedState] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [capabilities, setCapabilities] = useState(false)
  const [bilingualData, setBilingualdata] = useState([])
  const [stateId, setStateId] = useState("");
  const [companyLogo, setCompanyLogo] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [status, setStatus] = useState(false)
  const [terms, setTerms] = useState('')
  const [countryId, setCountryId] = useState("");
  const [description, setdescription] = useState("");
  const [selectedTurnaroundTime, setSelectedTurnaroundTime] = useState([])
  const [client_testimonial, setclient_testimonial] = useState("");
  const [error, setErrors] = useState({});
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
  const navigate = useNavigate()
  const [minchar, serMinchar] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [allData, setAllData] = useState([]);
  const [zipCode, setZipCode] = useState("");
  const [password, setPassword] = useState("");
  // Next Step
  
  const nextStep = async (e) => {

    if (step === 1) {
      try {

        const formData = {
          firstName,
          lastName,
          companyName,
          email,
          profileImg,
          phonenumeber,
          address1,
          zipCode,
          password
        }
        await step1Schema(checkemail).validate(formData, { abortEarly: false });
        setStep(step + 1);
        setErrors({});

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
          selectedIndustryMembership,
          selectedYearexperience,
        }
        const formData_2 = {
          selectedState,
          selectedCountry,
          selectedIndustryMembership,
          selectedYearexperience,
          licenseno,
          selectedlicenseState,
        };

        if (isLicensed) {
          await validationSchema_2.validate(formData_2, { abortEarly: false });
          setStep(step + 1);
          setErrors({});
        } else {
          await validationSchema.validate(formData, { abortEarly: false });

          setStep(step + 1);
          setErrors({});
        }
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
        // Assuming you have these state variables or values
        await validationSchema_3.validate({
          //  selectedAve_time, 
          selectedService_provide, selectedPrice_start_from, selectedSpecialize
        }, { abortEarly: false });
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
          selectedTurnaroundTime,
        }
        const formData_2 = {
          selectedTurnaroundTime,
          price,
        };
        const formData_3 = {
          selectedTurnaroundTime,
          expedit,
        };
        const formData_4 = {
          selectedTurnaroundTime,
          expedit,
          price,
        };

        if (ispricing && !expedited) {
          await validationSchema_5_price.validate(formData_2, { abortEarly: false });
          setStep(step + 1);
          setErrors({});
        } else if (expedited && !ispricing) {
          await validationSchema_5_expedit.validate(formData_3, { abortEarly: false });
          setStep(step + 1);
          setErrors({});
        } else if (expedited && ispricing) {
          await validationSchema_5_both.validate(formData_4, { abortEarly: false });
          setStep(step + 1);
          setErrors({});
        }
        else {
          await validationSchema_5.validate(formData, { abortEarly: false });
          setStep(step + 1);
          setErrors({});
        }
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
        // Assuming you have these state variables or values

        const formData = {
          client_type,
          appraisals
        }

        const formData2 = {
          client_type,
          appraisals,
          bilingualData,
        }
        if (capabilities) {
          await validationSchema6_bilingualData.validate(formData2, { abortEarly: false });

        } else {
          await validationSchema_6.validate(formData, { abortEarly: false });
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

    } else if (step === 7) {
      e.preventDefault();
      try {
        const formData = {
          client_contact,
        }
        const formData_2 = {
          client_contact,
          facebook,
          instagram,
          linkedin,
          twitter,
          youtube,
        };

        if (socialmedia) {
          await validationSchema_7_media.validate(formData_2, { abortEarly: false });
          setStep(step + 1);
          setErrors({});
        } else {
          await validationSchema_7.validate(formData, { abortEarly: false });
          setStep(step + 1);
          setErrors({});
        }
      } catch (err) {
        console.log(err)
        const newErrors = {};
        err.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      }

    } else if (step === 8) {
      e.preventDefault();
      try {
        // Validate all fields
        await
          validationSchema_8.validate(
            { companyLogo, coverImage, terms, bio, aboutBusiness },
            { abortEarly: false }
          );
        handleSave(); // Jab step 5 ho tab handleSave call hoga
        setErrors({});
      } catch (err) {
        console.log(err)
        const newErrors = {};
        err.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      }
    }
  };


  const TypesofServices = [
    "Boundary Surveys",
    "ALTA/NSPS Land Title Surveys",
    "Topographic Surveys",
    "Construction Staking",
    "Subdivision Surveys",
    "Flood Elevation Certificates",
  ];

  const apprsisalAll = [
    "<10",
    "10-25",
    "25-50",
    "50-100",
    "100+",
  ]


  const typesofproperties = [
    'Residential',
    'Commercial',
    'Industrial',
    'Agricultural',
    'Government',
    'Infrastructure'
  ]

  // const 

  const Experience = [
    "Less than 1 year",
    "1-3 years",
    "3-5 years",
    "5-10 years",
    "10+ years",
  ];
  const average = [
    "Within an hour",
    "Same day",
    "Within 24 hours",
    "More than 24 hours",
  ];
  const Specializations = [
    "Real Estate Law",
    "Title & Escrow",
    "Landlord-Tenant Law",
    "Commercial Real Estate Law",
    "Foreclosure Defense",
    "Construction Law",
  ];

  const bilingualServices = [
    'English',
    'French',
    'Russian',
    'Chinese(Mandarin)'
  ]

  const startPrice = [
    '$100K',
    '$100K-$250K',
    '$250K-$500K',
    '$500K-$1M',
    '$1M+',
  ]

  const Licensed = [
    "Alaska",
    "Alabama",
    "Arkansas",
    "Arizona",
    "California",
    "Colorado",
  ];

  const Industry = ["ALTA", "ABA", "State Bar Associations", "Etc"];
  // Previous Step
  const prevStep = () => {
    if (step > 1) setStep(step - 1);
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
  // const handleStateChange = (selectedName) => {
  //   const selected = states.find((state) => state.name === selectedName);
  //   if (selected) {
  //     setStateId(selected.id);
  //     setSelectedState(selected.name);
  //   }
  // };
  // const handleCountryChange = (selectedName) => {
  //   const selected = country.find((country) => country.name === selectedName);
  //   if (selected) {
  //     setCountryId(selected.id);
  //     setSelectedCountry(selected.name);
  //   }
  // };

  const handleStateChange = (selectedNames) => {
    const selectedStatesData = states.filter((state) =>
      selectedNames.includes(state.name)
    );

    const selectedStateIds = selectedStatesData.map((state) => state.id); // Extract IDs correctly

    console.log("selectedStateIds", selectedStateIds);

    if (selectedStateIds.length > 0) {
      fetchCountry(selectedStateIds); // Pass correct state IDs
    }else {
      setCountry([]); 
      setSelectedCountry([]); 
    }

    //setSelectedState(selectedStateIds); // Store selected state IDs correctly

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

  const handleLisStateChange = (selectedName) => {



    const selectedStatesData = country.filter((country) =>
      selectedName.includes(country.name)
    );


    setSelectedlicenseState(selectedStatesData.map((state) => state.id));
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
    console.log("country.dialCode ", country.dialCode);
    setCountryCode(`${country.dialCode}`);
    setPhone(phone);
    let cleanPhone = phone
      .replace(new RegExp(`^\\+?${country.dialCode}`), "")
      .trim();
    console.log("cleanPhone ", cleanPhone);

    setPhonenumber(cleanPhone);
  };

  const handleGetEmailOtp = async () => {
    try {
      await step1Schema_email.validate({ email }, { abortEarly: false });
      const response = await apiRequestPost(AuthApi.check_email, { email });
      console.log("response", response);
      if (response && response.success) {
        setShowOtpFields(true);
        showToast(response);
        setCheckEmail(response?.data?.result)
      } else {
        console.error("Failed to send OTP for email:", response?.message);
        showToast(response);
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 422) {
          console.error("422 Error: Invalid email or not found");
          showToast({ success: false, message: "Invalid email or not found." });
          setErrors({ email: "Invalid email or not found." });
        } else {
          showToast({ success: false, message: "Something went wrong. Try again." });
        }
      } else {
        showToast({ success: false, message: "An unexpected error occurred." });
      }

      if (err.inner) {
        const newErrors = {};
        err.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
        console.error("Error sending OTP:", err);
      }
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


  const handleCheckboxChange = (day) => {
    const isSelected = selectedTimes.some((time) => time.day === day.day);
    if (isSelected) {
      // Remove the day from selectedTimes
      setSelectedTimes(selectedTimes.filter((time) => time.day !== day.day));
    } else {
      // Add the day to selectedTimes with default times
      setSelectedTimes([...selectedTimes, { ...day, from: '', to: '' }]);
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


  const handleSave = async () => {
    const AUTHTOKEN = localStorage.getItem("AUTHTOKEN");

    const formData = new FormData();

    formData.append(
      "business_type",
      localStorage.getItem("selectedBusiness") || ""
    );

    formData.append("first_name", firstName || "");
    formData.append("last_name", lastName || "");
    formData.append("business_name", companyName || "");
    formData.append("business_address", address1 || "");
    formData.append("website", website || "");
    formData.append("country_code", countryCode || "");
    formData.append("phone", phonenumeber || "");
    formData.append("email", email || "");
    formData.append("image", profileImg || "");
    formData.append("password", password || "");
    formData.append("zip_code", zipCode || "")

    formData.append("states", Object.values(selectedState).join(",") || "");
    formData.append("counties", Object.values(selectedCountry).join(",") || "");
    formData.append(
      "licenses",
      isLicensed === "yes" ? 1 : isLicensed === "no" ? 0 : null
    );
    formData.append(
      "year_experience",
      selectedYearexperience || ""
    );
    formData.append(
      "certification_specialization",
      Object.values(selectedSpecializations).join(",") || ""
    );
    formData.append(
      "industry_membership",
      Object.values(selectedIndustryMembership).join(",") || ""
    );
    formData.append("license_no", licenseno || "");
    formData.append(
      "license_state",
      Object.values(selectedlicenseState).join(",") || ""
    );


    formData.append(
      "type_of_services",
      Object.values(selectedService_provide).join(",") || ""
    );
    formData.append(
      "service_start_from", selectedPrice_start_from || ""
    );
    formData.append(
      "clients_do_you_serves",
      Object.values(selectedSpecialize).join(",") || ""
    );
    formData.append('digital_surveying_services', surveying ? 1 : 0)



    const allDays = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ];


    const allDaysWithTimes = allDays.map(day => {
      const selectedDay = selectedTimes.find(item => item.day === day);

      if (selectedDay) {
        return { day, from: selectedDay.from, to: selectedDay.to };
      } else {
        return { day, from: null, to: null };
      }
    });


    allDaysWithTimes?.forEach((item, index) => {
      formData.append(`working_hours[${index}][day]`, item.day);
      formData.append(`working_hours[${index}][from]`, convertTo24HourFormat(item.from));
      formData.append(`working_hours[${index}][to]`, convertTo24HourFormat(item.to));
    });

    formData.append("time_zone", timeZone || "");


    formData.append("ave_time", Object.values(selectedTurnaroundTime).join(",") || "");
    formData.append('rus_services', expedited ? 1 : 0)
    formData.append('additional_cost', expedit ? 1 : 0)


    formData.append(
      "client_type",
      Object.values(client_type).join(",") || ""
    );
    formData.append(
      "transaction_per_month", appraisals || ""
    );
    formData.append("bilingual_services", capabilities ? 1 : 0);
    formData.append("bilingual_service_list", Object.values(bilingualData).join(",") || "");


    formData.append(
      "social_media",
      socialmedia === true ? 1 : socialmedia === false ? 0 : null
    );
    formData.append("facebook", facebook || "");
    formData.append("instagram", instagram || "");
    formData.append("linkedin", linkedin || "");
    formData.append("twitter", twitter || "");
    formData.append("youtube", youtube || "");
    formData.append("client_contact", Object.values(client_contact).join(",") || "");


    formData.append("short_bio", bio || "");
    formData.append("about_us", aboutBusiness || "");
    if (companyLogo) formData.append("company_logo", companyLogo);
    if (coverImage) formData.append("cover_image", coverImage);


    try {
      const response = await apiRequestPost1(
        addlistingApi.AddTitleAbstractor,
        formData,
        AUTHTOKEN,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            // Accept: "application/json",
          },
        }
      );

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

  const resetAll = () => {
    setPhone("")
    setShowOtpFields1(false)
  }

  const resetAll_2 = () => {
    setEmail("")
    setShowOtpFields(false)
  }

  const handleChange = (e) => {
    const inputValue = e.target.value;

    setAboutBusiness(inputValue);

    if (inputValue.length < 50) {
      serMinchar("Please enter at least 50 characters.");
    } else {
      serMinchar("");
      setAboutBusiness(inputValue);
    }
  };

  const handleAll = (e) => {
    setAddress1(e?.description)
    const addressComponents = e.address_components || [];

    const details = {
      zipCode: '',
    };

    addressComponents.forEach(component => {
      if (component.types.includes('postal_code')) {
        details.zipCode = component.long_name;
      }
    });

    setZipCode(details?.zipCode)
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

                      <h2 className=" ">Basic Surveyor Information</h2>
                      <span className="text-gray-500  ">
                        <span className="text-[var(--primary-color)]">
                          {step}
                        </span>
                        /8
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
                          Profile Photo <span className="text-red-500">*</span>
                        </label>
                        <FileUploadEco
                          type="text"
                          placeholder="Upload your photo"
                          onFileSelect={(e) => setProfileImg(e)}
                        />
                        {error.profileImg && <p className="text-sm text-red-500">{error.profileImg}</p>}
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
                          set={(e) => handleAll(e)}
                          type='text'
                          value={address1}
                          placeholder="Please provide your physical address (or main office location)."
                        />
                        {error.address1 && <p className="text-sm text-red-500">{error.address1}</p>}
                      </div>
                      <div className="flex flex-col gap-2">
                        {" "}
                        <label className="text-[var(--lable)] block mb-1">
                          ZIP Code <span className="text-red-500">*</span>
                        </label>
                        <InputField
                          value={zipCode}
                          onChange={(e) => setZipCode(e.target.value)}
                          type="number"
                          placeholder="Enter ZIP"
                        />
                        {error.zipCode && zipCode?.trim() === "" && (
                          <p className="text-red-500 text-sm ms-2">{error?.zipCode}</p>
                        )}
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

                      {checkemail === 1 && (
                        <div className="flex flex-col gap-2">
                        {" "}
                        <label className="text-gray-800">
                          Password{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <InputField
                          placeholder="Enter your Password."
                          value={password}
                          type="password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      )}
                      {error.password && <p className="text-sm text-red-500">{error.password}</p>}
                      
                      {status === 422 && (
                        <p className="text-sm text-red-500">{error}</p>
                      )}

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
                      <h2 className=" ">Licensing & Certifications</h2>
                      <span className="text-gray-500  ">
                        <span className="text-[var(--primary-color)]">
                          {step}
                        </span>
                        /8
                      </span>
                    </div>
                    <div className="space-y-6 sm:space-y-6 text-[14px] min-[1441px]:text-[18px] font-normal">
                      <div className="grid grid-cols-1 gap-5">
                        <div className="flex flex-col gap-2">
                          {" "}
                          <label className="text-[var(--lable)] block mb-1" onClick={() => setShowModal(true)}>
                            What States and Counties do you serve? <span className="text-red-500">*</span>
                          </label>
                          <div onClick={() => setShowModal(true)} className="w-full h-14 p-4 text-lg text-[#222] bg-[#e9eaf0] rounded-[15px] outline-none 
                                      shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,1),2px_2px_9px_rgba(19,40,109,0.1)] 
                                      focus:border-[#6c63ff] placeholder:text-[#999] focus:placeholder:text-[#555]   
                                      max-[1440px]:h-10 max-[1440px]:p-2 max-[1440px]:text-sm max-[1440px]:rounded-[10px] 
                                      max-[1440px]:placeholder:text-xs
                                      [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none
                                      appearance-none">
                            <h1 className="text-gray-500">{selectedState.length > 0 ? selectedState.map(list => list.short_code).join(", ") : 'Select State and Counties'}</h1>
                          </div>
                          {/* <Dropdown1
                            options={states.map((state) => state.name)}
                            placeholder={"Select State"}
                            onChange={handleStateChange}
                          /> */}
                          {showModal && <StateCounties show={showModal} allData={allData} setAllData={setAllData} county={selectedCountry} state={selectedState} setConty={setSelectedCountry} setState={setSelectedState} handleStateChange={handleStateChange} states={states} counties={country} onClose={() => setShowModal(false)} />}
                          {error.selectedState && <p className="text-sm text-red-500">{error.selectedState}</p>}
                          {/* {!error.selectedState && <p className="text-sm text-red-500">{error.selectedCountry}</p>} */}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="">
                          {" "}
                          <p>Are you a licensed land surveyor?  </p>
                          <div className="flex ms-2 mt-2">
                            {" "}
                            <label className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="radio"
                                name="contactMethod"
                                value="yes"
                                checked={isLicensed}
                                onChange={() => setIsLicensed(true)}
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
                                checked={!isLicensed}
                                onChange={() => setIsLicensed(false)}
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
                      {isLicensed && (
                        <>
                          <div className="flex flex-col gap-2">
                            {" "}
                            <label className="text-gray-800 block mb-1">
                              Bar License Number{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <InputField
                              type="text"
                              placeholder="Please provide your bar license number."
                              value={licenseno}
                              onChange={(e) => setLicenseno(e.target.value)}
                            />
                            {error.licenseno && <p className="text-sm text-red-500">{error.licenseno}</p>}
                          </div>

                          <div className="flex flex-col gap-2">
                            {" "}
                            <label className="text-gray-800 block mb-1">
                              State(s) Licensed In{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            {/* <InputField
                              type="text"
                              placeholder="Select States"
                            /> */}
                            <Dropdown1
                              options={states.map((state) => state.name)}
                              placeholder={"Select States"}
                              onChange={handleLisStateChange}
                            />
                            {error.selectedlicenseState && <p className="text-sm text-red-500">{error.selectedlicenseState}</p>}
                          </div>
                        </>
                      )}

                      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-2">
                          {" "}
                          <label className="text-gray-800 block mb-1">
                            Years of Experience {" "}
                            <span className="text-red-500">*</span>
                          </label>
                          {/* <Dropdown2
                            options={Experience}
                            onChange={(value) =>
                              setSelectedYearexperience(value)
                            }
                            placeholder="Select all that apply"

                          /> */}
                          <InputField value={selectedYearexperience} type='number'
                          onChange={(e) => setSelectedYearexperience(e.target.value)} placeholder="How many years have you been in operation?" />
                          {error.selectedYearexperience && <p className="text-sm text-red-500">{error.selectedYearexperience}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                          {" "}
                          <label className="text-gray-800 block mb-1">
                            Certifications & Specializations
                            <span className="text-[10px]">(Optional)</span>

                          </label>
                          <Dropdown1
                            options={Specializations}
                            onChange={(value) =>
                              setSelectedSpecializations(value)
                            }
                            placeholder="Select all that apply"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        {" "}
                        <label className="text-gray-800 block mb-1">
                          Industry Memberships{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <Dropdown1
                          options={Industry}
                          onChange={(value) =>
                            setSelectedIndustryMembership(value)
                          }
                          placeholder="Select all that apply"
                        />
                        {error.selectedIndustryMembership && <p className="text-sm text-red-500">{error.selectedIndustryMembership}</p>}
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:gap-5 w-full max-w-[300px] sm:max-w-[400px] h-[56px] mx-auto rounded-[10px] p-3 sm:p-4 ">
                        <button
                          className="bg-[var(--primary-color)] text-white py-2 rounded-[10px] w-full flex items-center justify-center gap-x-2
                   cursor-pointer text-[14px] sm:text-[18px] font-normal"
                          onClick={nextStep}
                        >
                          {step === 7 ? "Submit" : "Next"}
                        </button>
                      </div>
                    </div>
                  </>
                )}
                {step === 3 && (
                  <>
                    <div className="flex justify-between items-center mb-4 text-[22px]  min-[1025px]:text-[26px] min-[1441px]:text-[32px] p-1 text-center font-semibold">
                      {step > 1 && <FaArrowLeftLong onClick={prevStep} />}
                      <h2 className=" ">Surveying Services Offered</h2>
                      <span className="text-gray-500  ">
                        <span className="text-[var(--primary-color)]">
                          {step}
                        </span>
                        /8
                      </span>
                    </div>
                    <div className="space-y-6 sm:space-y-6 text-[14px] min-[1441px]:text-[18px] font-normal">
                      {/* <div className="flex flex-col gap-2">
                        {" "}
                        <label className="text-gray-800 block mb-1">
                          What is your average turnaround time for real estate
                          appraisals? <span className="text-red-500">*</span>
                        </label>
                        <Dropdown2
                          options={average}
                          placeholder="Select one"
                          onChange={(value) => setSelectedAve_time(value)}
                        />
                        {error.selectedAve_time && <p className="text-sm text-red-500">{error.selectedAve_time}</p>}
                      </div> */}
                      <div className="flex flex-col gap-2">
                        {" "}
                        <label className="text-gray-800 block mb-1">
                          What type of appraisal services do you provide?
                          <span className="text-red-500">*</span>
                        </label>
                        <Dropdown1
                          options={TypesofServices}
                          placeholder="Select all that apply."
                          onChange={(value) =>
                            setSelectedService_provide(value)
                          }
                        />
                        {error.selectedService_provide && <p className="text-sm text-red-500">{error.selectedService_provide}</p>}
                      </div>
                      <div className="flex flex-col gap-2">
                        {" "}
                        <label className="text-gray-800 block mb-1">
                          Price Start From
                          <span className="text-red-500">*</span>
                        </label>
                        <Dropdown2
                          options={startPrice}
                          placeholder="Select Range"
                          onChange={(value) => setSelectedPrice_start_from(value)}
                        />
                        {error.selectedPrice_start_from && <p className="text-sm text-red-500">{error.selectedPrice_start_from}</p>}
                      </div>
                      <div className="flex flex-col gap-2">
                        {" "}
                        <label className="text-gray-800 block mb-1">
                          Do you specialize in specific types of properties?{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <Dropdown1
                          options={typesofproperties}
                          placeholder="Residential, Commercial, Industrial..."
                          onChange={(value) => setSelectedSpecialize(value)}
                        />
                        {error.selectedSpecialize && <p className="text-sm text-red-500">{error.selectedSpecialize}</p>}
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="">
                          {" "}
                          <p>Do you offer remote or digital surveying services?</p>
                          <div className="flex ms-2 mt-2">
                            {" "}
                            <label className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="radio"
                                name="consultations"
                                value="yes"
                                checked={surveying}
                                onChange={() => setSurveying(true)}
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
                                name="consultations"
                                value="no"
                                checked={!surveying}
                                onChange={() => setSurveying(false)}
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
                          {step === 7 ? "Submit" : "Next"}
                        </button>
                      </div>
                    </div>
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
                        /8
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
                      <h2 className=" ">Pricing & Turnaround Times</h2>
                      <span className="text-gray-500  ">
                        <span className="text-[var(--primary-color)]">
                          {step}
                        </span>
                        /8
                      </span>
                    </div>
                    <form className="space-y-6 sm:space-y-6 text-[14px] min-[1441px]:text-[18px] font-normal">
                      <div className="flex flex-col gap-2">
                        {" "}
                        <label className="text-gray-800 block mb-1">
                          What is your typical turnaround time for surveys?
                          <span className="text-red-500">*</span>
                        </label>
                        <Dropdown1
                          options={TypesofServices}
                          placeholder="24 hours, 48 hours..."
                          value={selectedTurnaroundTime}
                          onChange={setSelectedTurnaroundTime}
                        />
                        {error.selectedTurnaroundTime && <p className="text-sm text-red-500">{error.selectedTurnaroundTime}</p>}
                      </div>

                      {/* <div className="flex flex-col gap-2">
                        <div className="">
                          {" "}
                          <p>Do you have standard pricing for your services?</p>
                          <div className="flex ms-2 mt-2">
                            {" "}
                            <label className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="radio"
                                name="consultations"
                                value="yes"
                                checked={ispricing}
                                onChange={() => setPricing(true)}
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
                                name="consultations"
                                value="no"
                                checked={!ispricing}
                                onChange={() => setPricing(false)}
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
                      {ispricing && (
                        <div className="flex flex-col gap-2">
                          <InputField
                            type="text"
                            placeholder="provide optional file upload for pricing sheet"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                          />
                          {error.price && <p className="text-sm text-red-500">{error.price}</p>}
                        </div>
                      )} */}

                      <div className="flex flex-col gap-2">
                        <div className="">
                          {" "}
                          <p>Do you offer expedited/rush services?</p>
                          <div className="flex ms-2 mt-2">
                            {" "}
                            <label className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="radio"
                                name="consultation"
                                value="yes"
                                checked={expedited}
                                onChange={() => setExpedited(true)}
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
                                name="consultation"
                                value="no"
                                checked={!expedited}
                                onChange={() => setExpedited(false)}
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
                      {expedited && (
                        <div className="flex flex-col gap-2">
                          <InputField
                            type="number"
                            placeholder="Specify additional cost"
                            value={expedit}
                            onChange={(e) => setExpedit(e.target.value)}
                          />
                          {error.expedit && <p className="text-sm text-red-500">{error.expedit}</p>}
                        </div>
                      )}

                      <div className="grid grid-cols-1 gap-4 sm:gap-5 w-full max-w-[300px] sm:max-w-[400px] h-[56px] mx-auto rounded-[10px] p-3 sm:p-4 ">
                        <button
                          className="bg-[var(--primary-color)] text-white py-2 rounded-[10px] w-full flex items-center justify-center gap-x-2
                   cursor-pointer text-[14px] sm:text-[18px] font-normal"
                          onClick={nextStep}
                        >
                          {step === 7 ? "Submit" : "Next"}
                        </button>
                      </div>
                    </form>
                  </>
                )}
                {step === 6 && (
                  <>

                    <div className="flex justify-between items-center mb-4 text-[22px]  min-[1025px]:text-[26px] min-[1441px]:text-[32px] p-1 text-center font-semibold">
                      {step > 1 && <FaArrowLeftLong onClick={prevStep} />}
                      <h2 className=" ">Client & Project Details</h2>
                      <span className="text-gray-500  ">
                        <span className="text-[var(--primary-color)]">
                          {step}
                        </span>
                        /8
                      </span>
                    </div>
                    <div className="space-y-6 sm:space-y-6 text-[14px] min-[1441px]:text-[18px] font-normal">
                      <CheckBoxGroup
                        label="What types of clients do you serve?"
                        options={[
                          "Mortgage Lenders",
                          "Real Estate Agents",
                          "Homeowners",
                          "Investors",
                          "Government Agencies",
                          "Law Firms",
                          "Other",
                        ]}
                        onChange={setclient_type}
                      />
                      {error.client_type && <p className="text-sm text-red-500">{error.client_type}</p>}
                      <div className="flex flex-col gap-2">
                        {" "}
                        <label className="text-gray-800 block mb-1">
                          How many surveys do you typically complete per month?<span className="text-red-500">*</span>
                        </label>
                        <Dropdown2
                          options={apprsisalAll}
                          placeholder="Select all that apply"
                          onChange={setAppraisals}
                        />
                        {error.appraisals && <p className="text-sm text-red-500">{error.appraisals}</p>}
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="">
                          {" "}
                          <p>Do you have bilingual capabilities?</p>
                          <div className="flex ms-2 mt-2">
                            {" "}
                            <label className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="radio"
                                name="capabilities"
                                value="yes"
                                checked={capabilities}
                                onChange={() => setCapabilities(true)}
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
                                name="capabilities"
                                value="no"
                                checked={!capabilities}
                                onChange={() => setCapabilities(!true)}
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
                      {capabilities &&
                        <>
                          <Dropdown1
                            options={bilingualServices}
                            onChange={(value) => setBilingualdata(value)}
                            placeholder="Select Bilingual Capabilities"
                          />
                          {error.bilingualData && <p className="text-sm text-red-500">{error.bilingualData}</p>}
                        </>
                      }
                      {/* <div className="flex flex-col gap-2">
                        {" "}
                        <label className="text-gray-800 block mb-1">
                          Can you provide client testimonials or references?{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <InputField
                          type="text"
                          placeholder="File upload or link option."
                        />
                      </div> */}

                      <div className="grid grid-cols-1 gap-4 sm:gap-5 w-full max-w-[300px] sm:max-w-[400px] h-[56px] mx-auto rounded-[10px] p-3 sm:p-4 ">
                        <button
                          className="bg-[var(--primary-color)] text-white py-2 rounded-[10px] w-full flex items-center justify-center gap-x-2
                   cursor-pointer text-[14px] sm:text-[18px] font-normal"
                          onClick={nextStep}
                        >
                          {step === 7 ? "Done" : "Next"}
                        </button>
                      </div>
                    </div>
                  </>
                )}
                {step === 7 && (
                  <>
                    <div className="flex justify-between items-center mb-4 text-[22px]  min-[1025px]:text-[26px] min-[1441px]:text-[32px] p-1 text-center font-semibold">
                      {step > 1 && <FaArrowLeftLong onClick={prevStep} />}
                      <h2 className=" ">Marketing & Online Presence</h2>
                      <span className="text-gray-500  ">
                        <span className="text-[var(--primary-color)]">
                          {step}
                        </span>
                        /8
                      </span>
                    </div>
                    <form className="space-y-6 sm:space-y-6 text-[14px] min-[1441px]:text-[18px] font-normal">
                      <div className="flex flex-col gap-2">
                        <div className="">
                          {" "}
                          <p>Do you use social media for business?</p>
                          <div className="flex ms-2 mt-2">
                            {" "}
                            <label className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="radio"
                                name="socialmedia"
                                value="yes"
                                checked={socialmedia}
                                onChange={() => setsocialmedia(true)}
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
                                name="socialmedia"
                                value="no"
                                checked={!socialmedia}
                                onChange={() => setsocialmedia(false)}
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
                      {socialmedia == true && (
                        <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-5 gap-5">
                          <div className="flex flex-col gap-2">
                            {" "}
                            <label className="text-gray-800 block mb-1">
                              Facebook <span className="text-red-500">*</span>
                            </label>
                            <InputField type="text" placeholder="Enter link" value={facebook}
                              onChange={(e) => setfacebook(e.target.value)} />
                            {error.facebook && <p className="text-sm text-red-500">{error.facebook}</p>}
                          </div>
                          <div className="flex flex-col gap-2">
                            {" "}
                            <label className="text-gray-800 block mb-1">
                              Instagram <span className="text-red-500">*</span>
                            </label>
                            <InputField type="text" placeholder="Enter link" value={instagram}
                              onChange={(e) => setinstagram(e.target.value)} />
                            {error.instagram && <p className="text-sm text-red-500">{error.instagram}</p>}
                          </div>
                          <div className="flex flex-col gap-2">
                            {" "}
                            <label className="text-gray-800 block mb-1">
                              LinkedIn <span className="text-red-500">*</span>
                            </label>
                            <InputField type="text" placeholder="Enter link" value={linkedin}
                              onChange={(e) => setlinkedin(e.target.value)} />
                            {error.linkedin && <p className="text-sm text-red-500">{error.linkedin}</p>}
                          </div>
                          <div className="flex flex-col gap-2">
                            {" "}
                            <label className="text-gray-800 block mb-1">
                              Twitter <span className="text-red-500">*</span>
                            </label>
                            <InputField type="text" placeholder="Enter link" value={twitter}
                              onChange={(e) => settwitter(e.target.value)} />
                            {error.twitter && <p className="text-sm text-red-500">{error.twitter}</p>}
                          </div>
                          <div className="flex flex-col gap-2">
                            {" "}
                            <label className="text-gray-800 block mb-1">
                              YouTube <span className="text-red-500">*</span>
                            </label>
                            <InputField type="text" placeholder="Enter link" value={youtube}
                              onChange={(e) => setyoutube(e.target.value)} />
                            {error.youtube && <p className="text-sm text-red-500">{error.youtube}</p>}
                          </div>
                        </div>
                      )}
                      {error.social_media && <p className="text-sm text-red-500">{error?.social_media}</p>}
                      {/* <div className="flex flex-col gap-2">
                        <div className="">
                          {" "}
                          <p>
                            Do you have client reviews on legal platforms{" "}
                            <span className="text-[14px]">
                              (Avvo, Martindale-Hubbell, Google, etc.)
                            </span>
                            ? <span className="text-red-500">*</span>
                          </p>
                          <div className="flex ms-2 mt-2">
                            {" "}
                            <label className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="radio"
                                name="reviews"
                                value="yes"
                                onChange={() => setreviews(true)}
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
                                name="reviews"
                                value="no"
                                onChange={() => setreviews(false)}
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
                      {reviews == true && (
                        <InputField type="text" placeholder="Provide links" />
                      )} */}

                      {/* <div className="flex flex-col gap-2">
                        {" "}
                        <label className="text-gray-800 block mb-1">
                          Would you like to upload a short bio or introduction
                          video? <span className="text-red-500">*</span>
                        </label>
                        <InputField
                          type="text"
                          placeholder="Optional file upload or YouTube link."
                        />
                      </div> */}

                      <CheckBoxGroup
                        label="What is the best way for clients to contact you?"
                        options={[
                          "Phone",
                          "Email",
                          "Text",
                          "Available by Appointment ",
                          "Other",
                        ]}
                        onChange={setclient_contact}
                      />
                      {error.client_contact && <p className="text-sm text-red-500">{error.client_contact}</p>}
                      <div className="grid grid-cols-1 gap-4 sm:gap-5 w-full max-w-[300px] sm:max-w-[400px] h-[56px] mx-auto rounded-[10px] p-3 sm:p-4 ">
                        <button
                          className="bg-[var(--primary-color)] text-white py-2 rounded-[10px] w-full flex items-center justify-center gap-x-2
                   cursor-pointer text-[14px] sm:text-[18px] font-normal"
                          onClick={nextStep}
                        >
                          {step === 7 ? "Done" : "Next"}
                        </button>
                      </div>
                    </form>
                  </>
                )}
                {step === 8 && (
                  <>

                    <div className="flex justify-between items-center mb-4 text-[22px]  min-[1025px]:text-[26px] min-[1441px]:text-[32px] p-1 text-center font-semibold">
                      {step > 1 && <FaArrowLeftLong onClick={prevStep} />}
                      <h2 className=" ">Additional Information</h2>
                      <span className="text-gray-500  ">
                        <span className="text-[var(--primary-color)]">
                          {step}
                        </span>
                        /8
                      </span>
                    </div>
                    <form className="space-y-6 sm:space-y-6 text-[14px] min-[1441px]:text-[18px] font-normal">
                      {/* <CheckBoxGroup
                        label="Do you work with specific types of clients?"
                        options={[
                          "Phone",
                          "Email",
                          "Text",
                          "Social Media",
                          "Other",
                        ]}
                        onChange={setclient_contact} 
                      /> */}
                      <div className="flex flex-col gap-2">
                        {" "}
                        <label className="text-gray-800 block mb-1">
                          Short Bio <span className="text-red-500">*</span>
                        </label>
                        <InputField
                          type="text"
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          placeholder="Enter your short bio"
                        />
                        {error.bio && <p className="text-sm text-red-500">{error.bio}</p>}
                      </div>

                      <div className="flex flex-col gap-2">
                        {" "}
                        <label className="text-gray-800 block mb-1">
                          About Business <span className="text-red-500">*</span>
                        </label>
                        <CustomTextArea
                          placeholder="Write Here..."
                          value={aboutBusiness}
                          onChange={handleChange}
                        />
                        {minchar && <h6 style={{ color: "red" }}>{minchar}</h6>}
                        {error.aboutBusiness && <p className="text-sm text-red-500">{error.aboutBusiness}</p>}
                      </div>
                      <div className="flex flex-col gap-2">
                        {" "}
                        <label className="text-gray-800 block mb-1">
                          Add Company Logo
                        </label>
                        <FileUploadImage
                          type="text"
                          // placeholder="Enter your first name"
                          onFileSelect={(file) => setCompanyLogo(file)}
                          selectedFile={companyLogo}
                        />
                        {error.companyLogo && <p className="text-sm text-red-500">{error.companyLogo}</p>}
                      </div>

                      <div className="flex flex-col gap-2">
                        {" "}
                        <label className="text-gray-800 block mb-1">
                          Add Cover Image
                        </label>
                        <FileUploadImage
                          type="text"
                          // placeholder="Enter your first name"
                          onFileSelect={(file) => setCoverImage(file)}
                          selectedFile={coverImage}
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
                          <span className="text-gray-700">
                            Do you agree to our listing terms and conditions?
                          </span>
                        </label>
                        {error.terms && <p className="text-sm text-red-500">{error.terms}</p>}
                      </div>
                      {/* <div className="flex flex-col gap-2">
                        <div className="flex">
                          {" "}
                          <p>
                            Do we have permission to contact you regarding your
                            listing?
                          </p>
                          <div className="flex ms-2">
                            {" "}
                            <label className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="radio"
                                name="contactMethod"
                                value="yes"
                                checked={status}
                                onChange={() => setStatus(true)}
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
                                checked={!status}
                                onChange={() => setStatus(false)}
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
                      </div> */}

                      <div className="grid grid-cols-1 gap-4 sm:gap-5 w-full max-w-[300px] sm:max-w-[400px] h-[56px] mx-auto rounded-[10px] p-3 sm:p-4 ">
                        <button
                          className="bg-[var(--primary-color)] text-white py-2 rounded-[10px] w-full flex items-center justify-center gap-x-2
                   cursor-pointer text-[14px] sm:text-[18px] font-normal"
                          onClick={nextStep}
                        >
                          {step === 8 ? "Done" : "Next"}
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
