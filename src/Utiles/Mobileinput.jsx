import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const Mobileinput = ({ error, msg, setCountryCode, setPhoneNumber, phoneNumber, label, madetory }) => {

    const customStyles = {
        inputStyle: {
            border: '2px solid #C0BDBD',
            minHeight: '40px',
            width: '100%',
            fontSize: '14px',
            boxShadow: 'none',
        },
        dropdownStyle: {
            backgroundColor: 'white',
            border: '1px solid #ccc',
        },
    };

    const [phone, setPhone] = useState('');
    // const [countryCode, setCountryCode] = useState('');
    // const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        if (phoneNumber && phoneNumber.includes("+")) {
            setPhone(phoneNumber)
        }
    }, [phoneNumber])


    const handlePhoneChange = (value, countryData) => {
        setPhone(value);
        setCountryCode('+' + countryData.dialCode);
        setPhoneNumber(value.replace(countryData.dialCode, ''));
    };

    const preferredCountries = ['in', 'cn', 'us'];

    return (
        <div className="flex flex-col w-full gap-2 relative">
            <label className="text-[var(--lable)] block mb-1">
                {label} {madetory && <span className="text-red-500">*</span>}
            </label>
            <div
                className="flex flex-row items-center bg-[#e9eaf0] rounded-[15px] max-[1440px]:p-[12px] min-[1441px]:p-[10px] w-full 
        shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,1),2px_2px_9px_rgba(19,40,109,0.1)] 
        max-[1440px]:rounded-[10px] max-[1440px]:text-sm"
            >

                <PhoneInput
                    country={'us'}
                    value={phone}
                    onlyCountries={["us", "ph", "in"]}
                    countryCodeEditable={false}
                    enableSearch={true}
                    inputClass="!bg-transparent !text-[#222] !outline-none !border-none !text-lg max-[1440px]:!text-xs !important max-[1440px]:!h-[12px] !!important"
                    buttonClass="!bg-transparent !border-none"
                    containerClass="max-[1440px]:!text-xs"
                    dropdownClass="max-[1440px]:!text-xs"
                    onChange={handlePhoneChange}
                // preferredCountries={preferredCountries}
                />
                <button
                    // onClick={handleClick}
                    type="button"
                    className="text-nowrap bg-[var(--primary-color)]
                shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.8),4px_4px_6px_rgba(19,40,109,0.15)]
                text-white px-4 py-1 rounded-lg shadow-mdd text-[14px] 
                
                max-[1440px]:px-3 max-[1440px]:py-0.5 max-[1440px]:text-xs max-[1440px]:rounded-md"
                >
                    Get OTP
                </button>
            </div>
            {/* {error &&
                <span className='text-sm text-red-500 capitalize'>* {msg}</span>
            } */}
        </div>
    );
};

export default Mobileinput;
