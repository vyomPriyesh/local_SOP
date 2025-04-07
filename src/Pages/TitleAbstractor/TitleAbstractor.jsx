import Navbar from "../../Components/TopHeader/NavBar";
import TopHeader from "../../Components/TopHeader/TopHeader";
import home1 from "../../Images/Group.png";
import { useForm, Controller, set } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import icon from '../../assets/icon_2.svg'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from "yup";
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
  InputField2,
} from "../../Components/Input/Input";
import { showToast } from "../../Common/toastService";

import { FaArrowLeftLong, FaEyeLowVision } from "react-icons/fa6";
import { apiRequestPost, apiRequestGet, apiRequestPost1 } from "../../Common/Common";
import { useEffect, useState } from "react";
import { DatePicker, Dropdown, Dropdown1, Dropdown2, FileUploadEco } from "../../Components/Dropdown/Dropdown";
import { API_URLS } from "../../Apis/api";
import { comment } from "postcss";
import { ToggleSwitch } from "flowbite-react";
import Check from "../../Utiles/Check";
import { MdOutlineUploadFile } from "react-icons/md";
import { StateCounties } from "../../Components/Model/CustomModal";
import { FaEye } from "react-icons/fa";
// import { useNavigate } from "react-router";
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
const step1Schema = (checkemail) => yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  companyName: yup.string().required("Company Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phonenumeber: yup.string().required("Phone Number is required"),
  address1: yup.string().required("Address is required"),
  zipCode: yup.string().required("Zip Code is required"),
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
    // .min(1, "Please select at least one state")
    .min(1, "Please select State and Counties")
    .required("State selection is required"),
  // selectedCountry: yup
  //   .array()
  //   .min(1, "Please select State and Counties")
  //   .required("State selection is required"),
  yearexperience: yup
    .number()
    .typeError("Years in Business must be a number")
    .required("Years in Business is required")
    .min(0, "Years in Business cannot be negative"),
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

const validationSchema_insurance = yup.object().shape({
  selectedState: yup
    .array()
    .min(1, "Please select State and Counties")
    .required("State selection is required"),
  // selectedCountry: yup
  //   .array()
  //   .min(1, "Please select State and Counties")
  //   .required("State selection is required"),
  yearexperience: yup
    .number()
    .typeError("Years in Business must be a number")
    .required("Years in Business is required")
    .min(0, "Years in Business cannot be negative"),
  insurance_company: yup.string().required("E&O Insurance is required"),
  eoFileName: yup.string().required("E&O Policy is required"),
  Coverage: yup.string().required("Coverage is required"),
  Start_Date: yup.string().required("Start Date is required"),
  Expiry_date: yup.string()
    .required("Expiry Date is required")
    .test(
      'is-after-start',
      'Expiry date must be after start date',
      function (value) {
        const { Start_Date } = this.parent;
        if (!Start_Date || !value) return true;
        return new Date(value) > new Date(Start_Date);
      }
    ),
  // certification: yup.string().required("Licenses & Certifications is required"),
});

const validationSchema3 = yup.object().shape({
  selectedbusinessTypes: yup
    .string()
    .required("your average turnaround time is required"),
  selectedServices: yup
    .array()
    .min(1, "Please select at least one Types of Services")
    .required("Types of Services is required"),
  specific: yup
    .array()
    .min(1, "Please select at least one Types of Services")
    .required("Specific Property of types is required"),
  // selectedSpecializations: yup
  //   .array()
  //   .min(1, "Please select at least one Specializations")
  //   .required("Specializations is required"),
  selectedvolume_capacity: yup
    .string()
    .required("Volume-Capacity is required"),
  // serviceStart: yup
  //   .string()
  //   .required("Service Start From is required"),
  // spreadsheetFileName: yup
  //   .string()
  //   .required('A file is required'),
  // selectedWorkingHours: yup
  //   .array()
  //   .min(1, "Please select at least one Working Hours")
  //   .required("Working Hours is required"),
});

const validationSchema3_bilingualData = yup.object().shape({
  selectedbusinessTypes: yup
    .string()
    .required("your average turnaround time is required"),
  selectedServices: yup
    .array()
    .min(1, "Please select at least one Types of Services")
    .required("Types of Services is required"),
  specific: yup
    .array()
    .min(1, "Please select at least one Types of Services")
    .required("Specific Property of types is required"),
  // selectedSpecializations: yup
  //   .array()
  //   .min(1, "Please select at least one Specializations")
  //   .required("Specializations is required"),
  selectedvolume_capacity: yup
    .string()
    .required("Volume-Capacity is required"),
  serviceStart: yup
    .string()
    .required("Service Start From is required"),
  bilingualData: yup
    .array()
    .min(1, "Please select at least one Types of Bilingual Services")
    .required("Bilingual Services is required"),
  // spreadsheetFileName: yup
  //   .string()
  //   .required('A file is required'),
  // selectedWorkingHours: yup
  //   .array()
  //   .min(1, "Please select at least one Working Hours")
  //   .required("Working Hours is required"),
});

const validationSchema4 = yup.object().shape({
  client_contact: yup
    .array()
    .min(1, "Please select at least one clients to contact")
    .required("clients to contact is required"),

});

const validationSchema4_media = yup.object().shape({
  client_contact: yup
    .array()
    .min(1, "Please select at least one clients to contact")
    .required("clients to contact is required"),

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
  // comment: yup
  //   .string()
  //   .required("Comment is required"),
  // industry_affiliations: yup
  //   .string()
  //   .required("Industry Affiliations is required"),
  //   facebook: yup.string()
  //     .url('Invalid URL format') // Validate URL format
  //     .required('URL is required'),
  //   instagram: yup.string()
  //     .url('Invalid URL format') // Validate URL format
  //     .required('URL is required'),
  //   linkedin: yup.string()
  //     .url('Invalid URL format') // Validate URL format
  //     .required('URL is required'),
  //   twitter: yup.string()
  //     .url('Invalid URL format') // Validate URL format
  //     .required('URL is required'),
  //   youtube: yup.string()
  //     .url('Invalid URL format') // Validate URL format
  //     .required('URL is required'),
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


export default function TitleAbstractor() {
  // const navigate = useNavigate();

  // const {
  //   register,
  //   handleSubmit,
  //   control,
  //   formState: { errors },
  //   trigger,
  // } = useForm({
  //   resolver: yupResolver(step1Schema),
  // });



  const navigate = useNavigate();

  const [step, setStep] = useState(2);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [address1, setAddress1] = useState("");
  const [zipCode, setZipCode] = useState("");

  const [website, setwebsite] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

  const [selectedState, setSelectedState] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [yearexperience, setyearexperience] = useState("");
  const [certification, setcertification] = useState("");
  const [membership, setMembership] = useState([])
  const [insurance_company, setinsurance_company] = useState("");
  const [eoFileName, setEoFileName] = useState("");
  const [Coverage, setCoverage] = useState("");
  const [Start_Date, setStart_Date] = useState("");
  const [Expiry_date, setExpiry_date] = useState("");
  const [xlsx, setXlsx] = useState("")
  const [allData, setAllData] = useState([]);

  const [selectedbusinessTypes, setSelectedbusinessTypes] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [specific, setSpecific] = useState([])
  const [selectedvolume_capacity, setSelectedvolume_capacity] = useState("")
  const [serviceStart, setServicestart] = useState("")
  const [bilingual, setBilingual] = useState("no")
  const [bilingualData, setBilingualdata] = useState([])


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

  const [facebook, setfacebook] = useState("");
  const [instagram, setinstagram] = useState("");
  const [linkedin, setlinkedin] = useState("");
  const [twitter, settwitter] = useState("");
  const [youtube, setyoutube] = useState("");
  const [client_contact, setClient_contact] = useState([])

  const [bio, setBio] = useState("");
  const [aboutBusiness, setAboutBusiness] = useState("")

  const [otp, setOtp] = useState("");
  const [insurance, setInsurance] = useState('no');
  const [showOtpFields, setShowOtpFields] = useState(false);
  const [showOtpFields1, setShowOtpFields1] = useState(false);
  const [phonenumeber, setPhonenumber] = useState("");
  const [otp1, setOtp1] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [states, setStates] = useState([]);
  const [country, setCountry] = useState([]);


  const [selectedWorkingHours, setSelectedWorkingHours] = useState([]);
  const [selectedSpecializations, setSpecializations] = useState([]);
  const [client_testimonial, setclient_testimonial] = useState("")
  const [socialmedia, setsocialmedia] = useState(false);

  const [comment, setComment] = useState("");

  const [industry_affiliations, setiIndustry_affiliations] = useState("")
  const [companyLogo, setCompanyLogo] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [status, setStatus] = useState(false)
  const [spreadsheetFileName, setSpreadsheetFileName] = useState("");
  const [terms, setTerms] = useState('')
  const [error, setErrors] = useState({});
  const [minchar, serMinchar] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [checkemail, setCheckEmail] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  

  const close = ()=>{
    setAllData([])
    setShowModal(false)
  }

  console.log(allData)
  
  
  // Example usage
  const nextStep = async (e) => {
    if (step === 1) {
      try {

        const formData = {
          firstName,
          lastName,
          companyName,
          email,
          phonenumeber,
          address1,
          zipCode,
          password
        }
        await step1Schema(checkemail).validate(formData, { abortEarly: false });


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
        console.log(err)
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
          // selectedCountry,
          yearexperience,
        }
        const formData_2 = {
          selectedState,
          // selectedCountry,
          yearexperience,
          insurance_company,
          eoFileName,
          Coverage,
          Start_Date,
          Expiry_date
        };

        if (insurance === 'yes') {
          await validationSchema_insurance.validate(formData_2, { abortEarly: false });
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

        const formData = {
          selectedbusinessTypes,
          selectedServices,
          specific,
          // serviceStart,
          selectedvolume_capacity,
        }
        // const formData_2 = {
        //   selectedbusinessTypes,
        //   selectedServices,
        //   specific,
        //   // serviceStart,
        //   selectedvolume_capacity,
        //   bilingualData
        // };

        // if (bilingual === 'yes') {
        //   await validationSchema3_bilingualData.validate(formData_2, { abortEarly: false });
        //   setStep(step + 1);
        //   setErrors({});
        // } else {
          await validationSchema3.validate(formData, { abortEarly: false });

          setStep(step + 1);
          setErrors({});
        // }
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
        // Validate all fields

        const formData = {
          client_contact,
        }

        const formData_2 = {
          client_contact,
          // comment,
          // industry_affiliations,
          facebook,
          instagram,
          linkedin,
          twitter,
          youtube,
        };


        if (socialmedia) {
          await validationSchema4_media.validate(formData_2, { abortEarly: false });
          setStep(step + 1);
          setErrors({});
        } else {
          await validationSchema4.validate(formData, { abortEarly: false });

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
    //fetchCountry();
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

      // for (let id of stateId) {
      const response = await apiRequestGet(DropdownApi.getCountryCityUrl(stateId));
      if (response && response.data.result) {
        const stateNames = response.data.result.map(state => ({ name: state.name, id: state.id }));
        Country = [...stateNames]
        // console.log("response.data.result.name",response.data.result)
        // }
        setCountry(Country);
      }
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  }
  // const handleStateChange = (selectedName) => {
  //   const selected = states.find((state) => state.name === selectedName);
  //   if (selected) {
  //     setStateId(selected.id);
  //     setSelectedState(selected.name);
  //   }
  // };


  const handleStateChange = (selectedNames) => {
    const selectedStatesData = states.filter((state) =>
      selectedNames.includes(state.name)
    );

    const selectedStateIds = selectedStatesData.map((state) => state.id); // Extract IDs correctly

    if (selectedStateIds.length > 0) {
      fetchCountry(selectedStateIds); // Pass correct state IDs
    } else {
      setCountry([]);
      setSelectedCountry([]);
    }

    setErrors({
      ...error,
      state: ''
    });
  };

  const handleMembership = (data) => {
    setMembership([...data])
  }


  // const handleCountryChange = (selectedName) => {
  //   const selected = country.find((country) => country.name === selectedName);
  //   if (selected) {
  //     setCountryId(selected.id);
  //     setSelectedCountry(selected.name);
  //   }
  // };

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
  const businessTypes = ["24 hours", "48 hours", "3-5 days", "more then 5 days", "Varies by state"];

  const TypesofServices = [
    "Select All",
    "Title Search",
    "Doc Retrieval ",
    "Municipal Lean Search",
    "Judgement Search",
    "REO",
  ];


  const industryMembership = [
    'ALTA',
    'TTA',
    'Etc',
  ]

  const Specializations = [
    "Select All",
    "Commercial",
    "Residential",
    "Foreclosures",
  ];
  const WorkingHours = [
    "1 Hours",
    "2 Hours",
    "5 Hours",
    "7 Hours",
    "8 Hours",
    "10 Hours",
  ];

  const bilingualServices = [
    'English',
    'French',
    'Russian',
    'Chinese(Mandarin)'
  ]

  const VolumeCapacity = [
    "<10",
    "10-25",
    "25-50",
    "50-100",
    "100+",
  ];

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
    formData.append("first_name", firstName || "");
    formData.append("last_name", lastName || "");
    formData.append("business_name", companyName || "");
    formData.append("business_address", address1 || "");
    formData.append("website", website || "");
    formData.append("country_code", countryCode || "");
    formData.append("phone", phonenumeber || "");
    formData.append("email", email || "");
    formData.append("password", password || "");
    formData.append("zip_code", zipCode || "");

    formData.append("states", selectedState.map(list => list.id).join(",") || "");
    formData.append("counties", selectedCountry.map(list => list.id).join(",") || "");
    formData.append("year_experience", yearexperience || "");
    formData.append("certification", certification || "");
    formData.append("industry_membership", Object.values(membership).join(",") || "");

    formData.append("e_o_insurance", insurance === "yes" ? 1 : insurance === "no" ? 0 : null);
    formData.append("insurance_company_name", insurance_company || "");
    if (eoFileName) formData.append("insurance_policy", eoFileName);
    formData.append("coverage", Coverage || "");
    formData.append("start_date", Start_Date || "");
    formData.append("expire_date", Expiry_date || "");


    formData.append("business_type", localStorage.getItem("selectedBusiness") || "");
    formData.append("commitments", selectedbusinessTypes || "");
    formData.append("type_of_services", Object.values(selectedServices).join(",") || "");
    formData.append("property_types", Object.values(specific).join(",") || "");
    formData.append("volume_capacity", selectedvolume_capacity || "");
    formData.append("service_start_from", serviceStart || "");
    formData.append("bilingual_services", bilingual === "yes" ? 1 : bilingual === "no" ? 0 : null);
    formData.append("bilingual_service_list", Object.values(bilingualData).join(",") || "");

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

    // Object.keys(payload).forEach((key) => {
    //   if (payload[key] !== null && payload[key] !== undefined) {
    //     formData.append(key, payload[key]);
    //   }
    // })




    try {
      const response = await apiRequestPost1(addlistingApi.AddTitleAbstractor, formData, AUTHTOKEN, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // Accept: "application/json",
        },
      });

      if (response && response.success) {
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
  // Previous Step  

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
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
      // console.log("payload", payload)

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
    setPhonenumber(cleanPhone);
  };

  const handleGetEmailOtp = async () => {
    try {
      await step1Schema_email.validate({ email }, { abortEarly: false });
      const response = await apiRequestPost(AuthApi.check_email, { email });
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

  const handleChangecontact = (option) => {
    const updatedSelection = client_contact.includes(option)
      ? client_contact.filter((item) => item !== option)
      : [...client_contact, option];

    setClient_contact(updatedSelection)
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
        'application/vnd.ms-excel', // .xls
        'application/vnd.ms-excel.sheet.macroEnabled.12', // .xlsm
        'application/vnd.ms-excel.addin.macroEnabled.12', // .xlam
        'application/vnd.ms-excel.template.macroEnabled.12', // .xltm
        'text/csv', // .csv
        'application/vnd.oasis.opendocument.spreadsheet', // .ods
      ];

      const validExtensions = ['.xlsx', '.xls', '.xlsm', '.xlam', '.xltm', '.csv', '.ods'];
      const fileExtension = file.name.split('.').pop().toLowerCase();

      if (validTypes.includes(file.type) || validExtensions.includes(`.${fileExtension}`)) {
        setXlsx(file); // Parent ko file name bhejna
      } else {
        alert("Only Excel files are allowed (e.g., .xlsx, .xls, .csv, .ods)!");
      }
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
              <div className="flex justify-center items-center p-4 md:p-6">
                <img
                  src={home1}
                  alt="Signup Illustration"
                  className="w-[635px] h-[542px] object-contain"
                />
              </div>

              {/* Right Side - Signup Form */}
              <div className="space-y-6 sm:space-y-4 bg-[#F7FBFE] p-6 sm:p-8 rounded-[20px] shadow-[0px_0px_40px_0px_rgba(0,30,108,0.2)] xl:w-[600px] 2xl:w-[789px] h-auto flex flex-col justify-start">
                {step === 1 && (
                  <>
                    <div className="flex justify-between items-center mb-4 text-[22px]  min-[1025px]:text-[26px] min-[1441px]:text-[32px] p-3 text-center font-semibold">
                      <FaArrowLeftLong onClick={prevStep} />

                      <h2 className=" ">Basic Abstractor Information</h2>
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
                        {/* {address1?.length == 0 && */}
                        <Check
                          set={(e) => handleAll(e)}
                          // set={(e) => setAddress1(e?.description)}
                          type='text'
                          value={address1}
                          placeholder="Please provide your physical address (or main office location)."
                        />
                        {/* }
                        {address1?.length != 0 &&
                          <InputField
                            placeholder="Please provide your physical address (or main office location)."
                            value={address1}
                            type='text'
                            onChange={(e) => {
                              if (address1?.length != 0) {
                                setTimeout(() => setAddress1(e.target.value), 10);
                              }
                            }}
                          />
                        } */}
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
                          <p className="text-red-500 text-sm ms-2">{error.zipCode}</p>
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
                              <CustomInput2
                                setAgain={resetAll_2}
                                placeholder={email}
                                value={email}
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
                      <h2 className=" ">Business Credentials & Experience</h2>
                      <span className="text-gray-500  ">
                        <span className="text-[var(--primary-color)]">
                          {step}
                        </span>
                        /6
                      </span>
                    </div>
                    <form className="space-y-6 sm:space-y-5 text-[14px] min-[1441px]:text-[18px] font-normal">
                      <div className="grid grid-cols-1  gap-5">
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
                          {showModal && <StateCounties show={showModal} allData={allData} setAllData={setAllData} county={selectedCountry} state={selectedState} setConty={setSelectedCountry} setState={setSelectedState} handleStateChange={handleStateChange} states={states} counties={country} close={() => setShowModal(false)} onClose={close} />}
                          {error.selectedState && <p className="text-sm text-red-500">{error.selectedState}</p>}
                          {/* {!error.selectedState && <p className="text-sm text-red-500">{error.selectedCountry}</p>} */}
                        </div>
                        {/* <div className="flex flex-col gap-2">
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
                        </div> */}
                      </div>
                      {/* <h1 className="text-center text-base text-[#6C6C6C] capitalize">or</h1>
                      <div className="flex flex-col gap-2">
                        {" "}
                        <div className="flex flex-row justify-between">
                          <label className="text-gray-800">
                            Update Service Area Via Spreadsheets  <span className="text-red-500">*</span>
                          </label>
                          <Link to='http://192.168.29.213:5000/sample/state_county.xlsx' className="text-xs text-[#1079E0] flex flex-row gap-3 text-nowrap place-items-center"><img src={icon} />Download Sample</Link>
                        </div>
                        <label htmlFor="xlsx" className="relative w-full h-14 p-4 pr-10 text-lg bg-[#e9eaf0] 
                                rounded-[15px] outline-none shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,1),2px_2px_9px_rgba(19,40,109,0.1)]
                                focus:border-[#6c63ff] cursor-pointer flex items-center justify-between max-[1440px]:text-xs max-[1440px]:h-10 max-[1440px]:p-2 max-[1440px]:rounded-[10px]">
                          <input type="file" id="xlsx" className="hidden" onChange={handleFileChange} />
                          <span className="text-gray-500 text-lg max-[1440px]:text-xs">
                            {xlsx?.name || 'Upload Spreadsheets'}
                          </span>
                          <MdOutlineUploadFile
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-[24px] h-[24px] bg-[#e9eaf0] rounded-full 
                                  shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.8),4px_4px_6px_rgba(19,40,109,0.15)] 
                                  flex items-center justify-center transition-transform duration-200 text-[var(--primary-color)] p-1"
                          />
                        </label>
                        {error.profile && <p className="text-sm text-red-500">{error.profile}</p>}/
                      </div> */}
                      <div className="flex flex-col gap-2">
                        {" "}
                        <label className="text-[var(--lable)]">
                          Years in Business <span className="text-red-500">*</span>
                        </label>
                        <InputField value={yearexperience} type='number'
                          onChange={(e) => setyearexperience(e.target.value)} placeholder="How many years have you been in operation?" />
                        {error.yearexperience && <p className="text-sm text-red-500">{error.yearexperience}</p>}
                      </div>

                      {/* <div className="flex flex-col gap-2">
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
                      </div> */}
                      <div className="flex flex-col gap-2">
                        {" "}
                        <label className="text-[var(--lable)] block mb-1">
                          Industry Memberships (Optional)
                        </label>
                        <Dropdown1
                          options={industryMembership}
                          placeholder={"Are You a member of any professional associations?"}
                          onChange={handleMembership}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex">
                          {" "}
                          <p>
                            Do we have E&O Insurance ?
                          </p>
                          <div className="flex ms-2">
                            {" "}
                            <label className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="radio"
                                name="insurance"
                                value="yes"
                                checked={insurance === "yes"}
                                onChange={() => setInsurance("yes")}
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
                                name="insurance"
                                value="no"
                                checked={insurance === "no"}
                                onChange={() => setInsurance("no")}
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





                      {insurance === "yes" && (
                        <>   <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                          <div className="flex flex-col gap-2">
                            {" "}
                            <label className="text-[var(--lable)] block mb-1">
                              E&O Insurance<span className="text-red-500">*</span>
                            </label>
                            <InputField
                              type="text"
                              value={insurance_company}
                              onChange={(e) => setinsurance_company(e.target.value)}
                              placeholder="Insurance company name "
                            />
                            {error.insurance_company && <p className="text-sm text-red-500">{error.insurance_company}</p>}
                          </div>
                          <div className="flex flex-col gap-2">
                            {" "}
                            <label className="text-[var(--lable)] block mb-1">
                              Upload E&O <span className="text-red-500">*</span>
                            </label>
                            <FileUploadEco onFileSelect={(file) => setEoFileName(file)} />
                            {error.eoFileName && <p className="text-sm text-red-500">{error.eoFileName}</p>}
                          </div>
                        </div>
                          <div className="grid grid-cols-1  xl:grid-cols-3 gap-5">
                            <div className="flex flex-col gap-2">
                              {" "}
                              <label className="text-[var(--lable)] block mb-1">
                                Coverage (in $)<span className="text-red-500">*</span>
                              </label>
                              <InputField2
                                value={Coverage}
                                onChange={(e) => setCoverage(e.target.value)}
                                type="number"
                                placeholder="e.g. $1,00,000"
                              />
                              {error.Coverage && <p className="text-sm text-red-500">{error.Coverage}</p>}
                            </div>
                            <div className="flex flex-col gap-2">
                              {" "}
                              <label className="text-[var(--lable)] block mb-1">
                                Start Date <span className="text-red-500">*</span>
                              </label>
                              <DatePicker value={Start_Date}
                                onChange={(e) => setStart_Date(e.target.value)} id="startDatePicker" />
                              {error.Start_Date && <p className="text-sm text-red-500">{error.Start_Date}</p>}
                            </div>

                            <div className="flex flex-col gap-2">
                              {" "}
                              <label className="text-[var(--lable)] block mb-1">
                                Expiry date <span className="text-red-500">*</span>
                              </label>
                              <DatePicker value={Expiry_date}
                                onChange={(e) => setExpiry_date(e.target.value)} id="expiryDatePicker" />
                              {error.Expiry_date && <p className="text-sm text-red-500">{error.Expiry_date}</p>}
                            </div>
                          </div></>
                      )}
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
                      <div className="flex flex-col gap-2">
                        {" "}
                        <label className="text-[var(--lable)] block mb-1">
                          What is your average turnaround time for title
                          commitments? <span className="text-red-500">*</span>
                        </label>
                        <Dropdown2
                          options={businessTypes}
                          onChange={(value) => setSelectedbusinessTypes(value)}
                          placeholder="Select one"
                        />
                        {error?.selectedbusinessTypes && <p className="text-sm text-red-500">{error?.selectedbusinessTypes}</p>}
                      </div>
                      <div className="flex flex-col gap-2">
                        {" "}
                        <label className="text-[var(--lable)] block mb-1">
                          Types of Services
                          <span className="text-red-500">*</span>
                        </label>
                        <Dropdown1
                          options={TypesofServices}
                          onChange={(value) => setSelectedServices(value)}
                          placeholder="Which of the following services do you offer?"
                        />
                        {error.selectedServices && <p className="text-sm text-red-500">{error.selectedServices}</p>}
                      </div>
                      {/* <div className="flex flex-col gap-2">
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
                      } */}

                      {/* <div className="flex flex-col gap-2">
                        {" "}
                        <label className="text-[var(--lable)] block mb-1">
                          Specializations{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <Dropdown1
                          options={Specializations}
                          onChange={(value) => setSpecializations(value)}
                          placeholder="Select Specialization"
                        />
                        {error.selectedSpecializations && <p className="text-sm text-red-500">{error.selectedSpecializations}</p>}
                      </div> */}
                      <div className="flex flex-col gap-2">
                        {" "}
                        <label className="text-[var(--lable)] block mb-1">
                          Specific Property of types{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <Dropdown1
                          options={Specializations}
                          onChange={(value) => setSpecific(value)}
                          placeholder="Select Specialization"
                        />
                        {error.specific && <p className="text-sm text-red-500">{error.specific}</p>}
                      </div>

                      {/* <div className="flex flex-col gap-2">
                        {" "}
                        <label className="text-[var(--lable)] block mb-1">
                          Volume-Capacity{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <Dropdown2
                          options={VolumeCapacity}
                          onChange={(value) => setSelectedvolume_capacity(value)}
                          placeholder="Approximately how many title projects do you handle per day?"
                        />
                        {error.selectedvolume_capacity && <p className="text-sm text-red-500">{error.selectedvolume_capacity}</p>}
                      </div> */}

                      {/*<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-2">
                          {" "}
                          <label className="text-[var(--lable)] block mb-1">
                            Service Area <span className="text-red-500">*</span>
                          </label>
                          <FileUpload onFileSelect={(file) => setSpreadsheetFileName(file)} />
                          {error.spreadsheetFileName && <p className="text-sm text-red-500">{error.spreadsheetFileName}</p>}
                        </div> */}

                        <div className="flex flex-col gap-2">
                          {" "}
                          <label className="text-[var(--lable)] block mb-1">
                            Volume-Capacity{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <Dropdown2
                            options={VolumeCapacity}
                            onChange={(value) => setSelectedvolume_capacity(value)}
                            placeholder="Projects do you handle per day?"
                          />
                          {error.selectedvolume_capacity && <p className="text-sm text-red-500">{error.selectedvolume_capacity}</p>}
                        </div>
                        {/* <div className="flex flex-col gap-2">
                          {" "}
                          <label className="text-[var(--lable)]">
                            Service Start From <span className="text-red-500">*</span>
                          </label>
                          <InputField2 value={serviceStart} type='text'
                            onChange={(e) => setServicestart(e.target.value)} placeholder="E.g. $80, $100" />
                          {error.serviceStart && <p className="text-sm text-red-500">{error.serviceStart}</p>}
                        </div> */}
                        {/* <div className="flex flex-col gap-2">
                          {" "}
                          <label className="text-[var(--lable)] block mb-1">
                            Working Hours{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <Dropdown1
                            options={WorkingHours}
                            placeholder="Operating hours or availability"
                            onChange={(value) => setSelectedWorkingHours(value)}
                          />
                          {error.selectedWorkingHours && <p className="text-sm text-red-500">{error.selectedWorkingHours}</p>}
                        </div> 
                      </div>*/}

                      <div className="grid grid-cols-1 gap-4 sm:gap-5 w-full max-w-[300px] sm:max-w-[400px] h-[56px] mx-auto rounded-[10px] p-3 sm:p-4 ">
                        <button
                          className="bg-[var(--primary-color)] text-white py-2 rounded-[10px] w-full flex items-center justify-center gap-x-2 cursor-pointer text-[14px] sm:text-[18px] font-normal"
                          onClick={nextStep}
                        >
                          {step === 4 ? "Submit" : "Next"}

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
                      <h2 className=" ">Marketing & Online Presence</h2>
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
                        <label className="text-[var(--lable)] block mb-1">
                          Client Testimonials/References (Optional){" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <InputField
                          value={client_testimonial}
                          onChange={(e) => setclient_testimonial(e.target.value)}
                          type="text"
                          placeholder="Upload a file or enter a link to testimonial"
                        />
                      </div> */}
                      {/* <div className="flex flex-col gap-2">
                        {" "}
                        <label className="text-[var(--lable)] block mb-1">
                          Social Media Links (Optional){" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <InputField
                          type="text"
                          placeholder="If applicable, please share your business’s social media profiles."
                        />
                      </div> */}
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
                                checked={socialmedia}
                                value="yes"
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
                                checked={!socialmedia}
                                value="no"
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
                              Facebook
                            </label>
                            <InputField
                              type="text"
                              placeholder="Enter link"
                              value={facebook}
                              onChange={(e) => setfacebook(e.target.value)}
                            />
                            {error.facebook && <p className="text-sm text-red-500">{error?.facebook}</p>}
                          </div>
                          <div className="flex flex-col gap-2">
                            {" "}
                            <label className="text-gray-800 block mb-1">
                              Instagram
                            </label>
                            <InputField
                              type="text"
                              placeholder="Enter link"
                              value={instagram}
                              onChange={(e) => setinstagram(e.target.value)}
                            />
                            {error.instagram && <p className="text-sm text-red-500">{error.instagram}</p>}
                          </div>
                          <div className="flex flex-col gap-2">
                            {" "}
                            <label className="text-gray-800 block mb-1">
                              LinkedIn
                            </label>
                            <InputField
                              type="text"
                              placeholder="Enter link"
                              value={linkedin}
                              onChange={(e) => setlinkedin(e.target.value)}
                            />
                            {error.linkedin && <p className="text-sm text-red-500">{error.linkedin}</p>}
                          </div>
                          <div className="flex flex-col gap-2">
                            {" "}
                            <label className="text-gray-800 block mb-1">
                              Twitter
                            </label>
                            <InputField
                              type="text"
                              placeholder="Enter link"
                              value={twitter}
                              onChange={(e) => settwitter(e.target.value)}
                            />
                            {error.twitter && <p className="text-sm text-red-500">{error.twitter}</p>}
                          </div>
                          <div className="flex flex-col gap-2">
                            {" "}
                            <label className="text-gray-800 block mb-1">
                              YouTube
                            </label>
                            <InputField
                              type="text"
                              placeholder="Enter link"
                              value={youtube}
                              onChange={(e) => setyoutube(e.target.value)}
                            />
                            {error.youtube && <p className="text-sm text-red-500">{error.youtube}</p>}
                          </div>
                        </div>
                      )}
                      {error.social_media && <p className="text-sm text-red-500">{error?.social_media}</p>}
                      <div className="flex flex-col gap-2">
                        <div className="">
                          {" "}
                          <p>What is the best way for clients to contact you?</p>
                          <div className="flex ms-2 mt-2">
                            {" "}
                            <label className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="checkbox"
                                name="contact"
                                onChange={() => handleChangecontact('phone')}
                                checked={client_contact.includes('phone')}
                                value="phone"
                                className="appearance-none w-6 h-6 rounded-md border-2 border-white
                                  bg-[#E5E6EB] shadow-[1px_1px_3px_0px_rgba(0,0,0,0.2),-1px_-1px_3px_0px_rgba(255,255,255,0.8)]
                                  checked:bg-blue-500 checked:border-white
                                  checked:shadow-[4px_4px_8px_0px_rgba(0,0,0,0.3),-4px_-4px_8px_0px_rgba(255,255,255,1)] 
                                  relative transition-all duration-200 ease-in-out 
                                  checked:before:content-['✓'] checked:before:absolute checked:before:text-white 
                                  checked:before:text-[12px] checked:before:font-bold checked:before:left-1/2 
                                  checked:before:top-1/2 checked:before:-translate-x-1/2 checked:before:-translate-y-1/2"
                              />
                              <span className="text-gray-700">Phone</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer ms-2">
                              <input
                                type="checkbox"
                                name="contact"
                                onChange={() => handleChangecontact('email')}
                                checked={client_contact.includes('email')}
                                value="email"
                                className="appearance-none w-6 h-6 rounded-md border-2 border-white
                                  bg-[#E5E6EB] shadow-[1px_1px_3px_0px_rgba(0,0,0,0.2),-1px_-1px_3px_0px_rgba(255,255,255,0.8)]
                                  checked:bg-blue-500 checked:border-white
                                  checked:shadow-[4px_4px_8px_0px_rgba(0,0,0,0.3),-4px_-4px_8px_0px_rgba(255,255,255,1)] 
                                  relative transition-all duration-200 ease-in-out 
                                  checked:before:content-['✓'] checked:before:absolute checked:before:text-white 
                                  checked:before:text-[12px] checked:before:font-bold checked:before:left-1/2 
                                  checked:before:top-1/2 checked:before:-translate-x-1/2 checked:before:-translate-y-1/2"
                              />

                              <span className="text-gray-700">Email</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer ms-2">
                              <input
                                type="checkbox"
                                name="contact"
                                onChange={() => handleChangecontact('text')}
                                checked={client_contact.includes('text')}
                                value="text"
                                className="appearance-none w-6 h-6 rounded-md border-2 border-white
                                  bg-[#E5E6EB] shadow-[1px_1px_3px_0px_rgba(0,0,0,0.2),-1px_-1px_3px_0px_rgba(255,255,255,0.8)]
                                  checked:bg-blue-500 checked:border-white
                                  checked:shadow-[4px_4px_8px_0px_rgba(0,0,0,0.3),-4px_-4px_8px_0px_rgba(255,255,255,1)] 
                                  relative transition-all duration-200 ease-in-out 
                                  checked:before:content-['✓'] checked:before:absolute checked:before:text-white 
                                  checked:before:text-[12px] checked:before:font-bold checked:before:left-1/2 
                                  checked:before:top-1/2 checked:before:-translate-x-1/2 checked:before:-translate-y-1/2"
                              />

                              <span className="text-gray-700">Text</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer ms-2">
                              <input
                                type="checkbox"
                                name="contact"
                                onChange={() => handleChangecontact('appointment')}
                                checked={client_contact.includes('appointment')}
                                value="appointment"
                                className="appearance-none w-6 h-6 rounded-md border-2 border-white
                                  bg-[#E5E6EB] shadow-[1px_1px_3px_0px_rgba(0,0,0,0.2),-1px_-1px_3px_0px_rgba(255,255,255,0.8)]
                                  checked:bg-blue-500 checked:border-white
                                  checked:shadow-[4px_4px_8px_0px_rgba(0,0,0,0.3),-4px_-4px_8px_0px_rgba(255,255,255,1)] 
                                  relative transition-all duration-200 ease-in-out 
                                  checked:before:content-['✓'] checked:before:absolute checked:before:text-white 
                                  checked:before:text-[12px] checked:before:font-bold checked:before:left-1/2 
                                  checked:before:top-1/2 checked:before:-translate-x-1/2 checked:before:-translate-y-1/2"
                              />

                              <span className="text-gray-700 text-nowrap">Available by Appointment</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer ms-2">
                              <input
                                type="checkbox"
                                name="contact"
                                onChange={() => handleChangecontact('other')}
                                checked={client_contact.includes('other')}
                                value="other"
                                className="appearance-none w-6 h-6 rounded-md border-2 border-white
                                  bg-[#E5E6EB] shadow-[1px_1px_3px_0px_rgba(0,0,0,0.2),-1px_-1px_3px_0px_rgba(255,255,255,0.8)]
                                  checked:bg-blue-500 checked:border-white
                                  checked:shadow-[4px_4px_8px_0px_rgba(0,0,0,0.3),-4px_-4px_8px_0px_rgba(255,255,255,1)] 
                                  relative transition-all duration-200 ease-in-out 
                                  checked:before:content-['✓'] checked:before:absolute checked:before:text-white 
                                  checked:before:text-[12px] checked:before:font-bold checked:before:left-1/2 
                                  checked:before:top-1/2 checked:before:-translate-x-1/2 checked:before:-translate-y-1/2"
                              />

                              <span className="text-gray-700">Other</span>
                            </label>
                          </div>
                        </div>
                        {error.client_contact && <p className="text-sm text-red-500">{error.client_contact}</p>}
                      </div>
                      {/* <div className="flex flex-col gap-2">
                        {" "}
                        <label className="text-[var(--lable)]">
                          Any Additional Comments or Information{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <InputField value={comment}
                          onChange={(e) => setComment(e.target.value)} placeholder="Is there any other information you’d like potential clients to know?" />
                        {error.comment && <p className="text-sm text-red-500">{error.comment}</p>}
                      </div> */}

                      {/* <div className="flex flex-col gap-2">
                        {" "}
                        <label className="text-[var(--lable)] block mb-1">
                          Industry Affiliations
                          <span className="text-red-500">*</span>
                        </label>
                        <InputField
                          type="text"
                          value={industry_affiliations}
                          onChange={(e) => setiIndustry_affiliations(e.target.value)}
                          placeholder="Are you a member of any industry organizations or associations?"
                        />
                        {error.industry_affiliations && <p className="text-sm text-red-500">{error.industry_affiliations}</p>}
                      </div> */}

                      <div className="grid grid-cols-1 gap-4 sm:gap-5 w-full max-w-[300px] sm:max-w-[400px] h-[56px] mx-auto rounded-[10px] p-3 sm:p-4 ">
                        <button
                          className="bg-[var(--primary-color)] text-white py-2 rounded-[10px] w-full flex items-center justify-center gap-x-2 cursor-pointer text-[14px] sm:text-[18px] font-normal"
                          onClick={nextStep}
                        >
                          {step === 6 ? "Submit" : "Next"}

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
                          onChange={handleChange} placeholder="Write Here..." />
                        {minchar && <h6 style={{ color: "red" }}>{minchar}</h6>}
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
                            onChange={() => setTerms(terms === '1' ? '0' : '1')}
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
                            Do you agree to our listing <a href="/terms-conditions" className="text-[var(--primary-color)] underline" target="_blank">Terms and Conditions</a>?
                          </span>
                        </label>
                        {error.terms && <p className="text-sm text-red-500">{error.terms}</p>}
                      </div>
                      {/* <div className="flex flex-col gap-2">
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
                      </div> */}

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
