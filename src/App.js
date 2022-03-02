import logo from './logo.png';
import './App.css';
import { useState, useEffect } from "react";
import settingIcon from './setting-icon.png'



function App() {


  const [language, setLanguage] = useState("English");
  const [checkedOne, setCheckedOne] = useState(false);
  const [checkedTwo, setCheckedTwo] = useState(false);
  const [checkedThree, setCheckedThree] = useState(false);
  const [checkedFour, setCheckedFour] = useState(false);
  const [checkedFive, setCheckedFive] = useState(false);
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [countries, setCountries] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [suffix, setSuffix] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const getData = () => {
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((res) => {
        setCountries(res)
      })
  }

  const Checkbox = ({ label, value, onChange, name }) => {
    return (
      <label>
        <input type="checkbox" checked={value} onChange={(e) => handleChangeBox(e)} name={name} />
        {label}
      </label>
    )
  };

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if(selectedCountry){
      const countrySelected = countries.find(item => item.name.official == selectedCountry)
      const suffixes = `${countrySelected.idd.root}${countrySelected.idd.suffixes.toString()}`
      setPhoneNumber(suffixes)
      setSuffix(suffixes)
    }
  }, [selectedCountry])

  function handleChangeBox(e) {
    switch (e.target.name) {
      case 'Value 1':
        setCheckedOne(true)
        setCheckedTwo(false)
        setCheckedThree(false)
        setCheckedFour(false)
        setCheckedFive(false)
        break;
      case 'Value 2':
        setCheckedOne(false)
        setCheckedTwo(true)
        setCheckedThree(false)
        setCheckedFour(false)
        setCheckedFive(false)
        break;
      case 'Value 3':
        setCheckedOne(false)
        setCheckedTwo(false)
        setCheckedThree(true)
        setCheckedFour(false)
        setCheckedFive(false)
        break;
      case 'Value 4':
        setCheckedOne(false)
        setCheckedTwo(false)
        setCheckedThree(false)
        setCheckedFour(true)
        setCheckedFive(false)
        break;
      case 'Value 5':
        setCheckedOne(false)
        setCheckedTwo(false)
        setCheckedThree(false)
        setCheckedFour(false)
        setCheckedFive(true)
        break;
    }
  }

  function handleChangeLanguage(e) {
    setLanguage(e.target.value);
  }
  
  function dropDownLanguage() {
    return <div className='language-select'><select value={language}
      onChange={(e) => handleChangeLanguage(e)} >
      <option value="English">English</option>
      <option value="French">French</option>
      <option value="Spain">Spain</option>
    </select></div>
  }

  function dropDownCountry() {
    return <>
      <select value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)} >
        {countries.length > 0 && countries.map(country => {
          return(
            <option value={country.name.official}><img src={country.flags.png}></img></option>
          )
        })}
      </select></>
  }

  function languageSection() {
    return <div className='language-section'>Language: {dropDownLanguage()} <img src={settingIcon} alt="Logo" className='setting-icon' /></div>
  }

  function handleChangePhone(e){
    const phoneNumber = e.target.value.replace(suffix, '')
    setPhoneNumber(`${suffix}${phoneNumber}`)
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <div className='image-content'><img src={logo} alt="Logo" className='logo-header' /></div>
        {languageSection()}
      </header>
      <div className='title-section'>You don't have an account yet, please create a new account</div>
      <form>
        <div className='sub-title-section'>Create New Account</div>
        <div className='sub-title-section'>Title
        </div>
        <div className='sub-title-section'>
          <Checkbox
            label="Mrs"
            value={checkedOne}
            name="Value 1"
          />
          <Checkbox
            label="Ms"
            value={checkedTwo}
            name="Value 2"
          />
          <Checkbox
            label="Mdm"
            value={checkedThree}
            name="Value 3"
          />
          <Checkbox
            label="Mr"
            value={checkedFour}
            name="Value 4"
          />
          <Checkbox
            label="Dr"
            value={checkedFive}
            name="Value 5"
          />
        </div>
        <div className='dual-box'>
          <div className='child-box'>
            <label class="required">Last Name</label>
            <div><input name="last-name" onChange={e => setLastName(e.target.value)} value={lastName} /></div>
          </div>
          <div className='child-box'>
            <label class="required">First Name</label>
            <div><input name="first-name" onChange={e => setFirstName(e.target.value)} value={firstName} /></div>
          </div>
        </div>
        <div className='contact-content'>
        <label class="required">Mobile Number</label>
        <div>
        {dropDownCountry()}
        <div>
            <div><input name="phone-number" onChange={e => handleChangePhone(e)} value={phoneNumber} /></div>
          </div>
        </div>
        
        </div>
      </form>
    </div>
  );
}

export default App;
