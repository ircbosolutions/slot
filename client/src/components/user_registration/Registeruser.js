import React, { Component } from 'react';
import { useState,useEffect } from 'react';
import camImg from '../images/captured_img.png'; 
import Axios from 'axios';
import Captureimg from './Captureimg';
import handImg from '../images/handimg.png';
import attention from '../images/att.png'
import slotLogo from '../images/slotlogo2.png'; 
import DonePop from './DonePop';
import '../user_registration/registeruser.css';
import {Link} from 'react-router-dom';
import ErrorPop from './ErrorPop';
import ConError from './ConError';
const countryset={

 
  'afghanistan':'93',
  'aland islands':'358',
  'albania':'355',
  'algeria':'213',
  'american samoa':'1684',
  'andorra':'376',
  'angola':'244',
  'anguilla':'1264',
  'antarctica':'672',
  'antigua and barbuda':'1268',
  'argentina':'54',
  'armenia':'374',
  'aruba':'297',
  'australia':'61',
  'austria':'43',
  'azerbaijan':'994',
  'bahamas':'1242',
  'bahrain':'973',
  'bangladesh':'880',
  'barbados':'1246',
  'belarus':'375',
  'belgium':'32',
  'belize':'501',
  'benin':'229',
  'bermuda':'1441',
  'bhutan':'975',
  'bolivia':'591',
  'bonaire, Sint eustatius and Saba':'599',
  'bosnia and herzegovina':'387',
  'botswana':'267',
  'bouvet island':'55',
  'brazil':'55',
  'british indian ocean territory':'246',
  'brunei darussalam':'673',
  'bulgaria':'359',
  'burkina faso':'226',
  'burundi':'257',
  'cambodia':'855',
  'cameroon':'237',
  'canada':'1',
  'cape verde':'238',
  'cayman Islands':'1345',
  'central african republic':'236',
  'chad':'235',
  'chile':'56',
  'china':'86',
  'christmas Island':'61',
  'cocos (keeling) Islands':'672',
  'colombia':'57',
  'comoros':'269',
  'congo':'242',
  'congo, democratic Republic of the congo':'242',
  'cook Islands':'682',
  'costa Rica':'506',
  'cote dIvoire':'225',
  'croatia':'385',
  'cuba':'53',
  'curacao':'599',
  'cyprus':'357',
  'czech Republic':'420',
  'denmark':'45',
  'djibouti':'253',
  'dominica':'1767',
  'dominican Republic':'1809',
  'ecuador':'593',
  'egypt':'20',
  'el salvador':'503',
  'equatorial guinea':'240',
  'eritrea':'291',
  'estonia':'372',
  'ethiopia':'251',
  'falkland islands (malvinas)':'500',
  'faroe islands':'298',
  'fiji':'679',
  'finland':'358',
  'france':'33',
  'french guiana':'594',
  'french polynesia':'689',
  'french southern territories':'262',
  'gabon':'241',
  'gambia':'220',
  'georgia':'995',
  'germany':'49',
  'ghana':'233',
  'gibraltar':'350',
  'greece':'30',
  'greenland':'299',
  'grenada':'1473',
  'guadeloupe':'590',
  'guam':'1671',
  'guatemala':'502',
  'guernsey':'44',
  'guinea':'224',
  'guinea-bissau':'245',
  'guyana':'592',
  'haiti':'509',
  'heard island and mcdonald islands':'0',
  'holy see (vatican city state)':'39',
  'honduras':'504',
  'hong kong':'852',
  'hungary':'36',
  'iceland':'354',
  'india':'91',
  'indonesia':'62',
  'iran, islamic Republic of':'98',
  'iraq':'964',
  'ireland':'353',
  'isle of man':'44',
  'israel':'972',
  'italy':'39',
  'jamaica':'1876',
  'japan':'81',
  'jersey':'44',
  'jordan':'962',
  'kazakhstan':'7',
  'kenya':'254',
  'kiribati':'686',
  'korea, democratic peoples republic of':'850',
  'korea, republic of':'82',
  'kosovo':'381',
  'kuwait':'965',
  'kyrgyzstan':'996',
  'lao peoples democratic republic':'856',
  'latvia':'371',
  'lebanon':'961',
  'lesotho':'266',
  'liberia':'231',
  'libyan arab jamahiriya':'218',
  'liechtenstein':'423',
  'lithuania':'370',
  'luxembourg':'352',
  'macao':'853',
  'macedonia, the former yugoslav republic of':'389',
  'madagascar':'261',
  'malawi':'265',
  'malaysia':'60',
  'maldives':'960',
  'mali':'223',
  'malta':'356',
  'marshall islands':'692',
  'martinique':'596',
  'mauritania':'222',
  'mauritius':'230',
  'mayotte':'269',
  'mexico':'52',
  'micronesia, federated states of':'691',
  'moldova, republic of':'373',
  'monaco':'377',
  'mongolia':'976',
  'montenegro':'382',
  'montserrat':'1664',
  'morocco':'212',
  'mozambique':'258',
  'myanmar':'95',
  'namibia':'264',
  'nauru':'674',
  'nepal':'977',
  'netherlands':'31',
  'netherlands antilles':'599',
  'new caledonia':'687',
  'new zealand':'64',
  'nicaragua':'505',
  'niger':'227',
  'nigeria':'234',
  'niue':'683',
  'norfolk island':'672',
  'northern mariana islands':'1670',
  'norway':'47',
  'Oman':'968',
  'pakistan':'92',
  'palau':'680',
  'palestinian territory, Occupied':'970',
  'panama':'507',
  'papua new guinea':'675',
  'paraguay':'595',
  'peru':'51',
  'philippines':'63',
  'pitcairn':'64',
  'poland':'48',
  'portugal':'351',
  'puerto rico':'1787',
  'qatar':'974',
  'reunion':'262',
  'romania':'40',
  'russian federation':'70',
  'rwanda':'250',
  'saint barthelemy':'590',
  'saint helena':'290',
  'saint kitts and nevis':'1869',
  'saint lucia':'1758',
  'saint martin':'590',
  'saint pierre and miquelon':'508',
  'saint vincent and the grenadines':'1784',
  'samoa':'684',
  'san marino':'378',
  'sao tome and principe':'239',
  'saudi arabia':'966',
  'senegal':'221',
  'serbia':'381',
  'serbia and montenegro':'381',
  'seychelles':'248',
  'sierra leone':'232',
  'singapore':'65',
  'sint maarten':'1',
  'slovakia':'421',
  'slovenia':'386',
  'solomon islands':'677',
  'somalia':'252',
  'south africa':'27',
  'south georgia and the south sandwich islands':'500',
  'south sudan':'211',
  'spain':'34',
  'sri lanka':'94',
  'sudan':'249',
  'suriname':'597',
  'svalbard and jan mayen':'47',
  'swaziland':'268',
  'sweden':'46',
  'switzerland':'41',
  'syrian arab republic':'963',
  'taiwan, province of China':'886',
  'tajikistan':'992',
  'tanzania, united republic of':'255',
  'thailand':'66',
  'timor-leste':'670',
  'togo':'228',
  'tokelau':'690',
  'tonga':'676',
  'trinidad and tobago':'1868',
  'tunisia':'216',
  'turkey':'90',
  'turkmenistan':'7370',
  'turks and Caicos islands':'1649',
  'tuvalu':'688',
  'uganda':'256',
  'ukraine':'380',
  'united arab Emirates':'971',
  'united kingdom':'44',
  'united states':'1',
  'united states minor outlying islands':'1',
  'uruguay':'598',
  'uzbekistan':'998',
  'vanuatu':'678',
  'venezuela':'58',
  'viet Nam':'84',
  'virgin islands, british':'1284',
  'virgin islands, u.s.':'1340',
  'wallis and futuna':'681',
  'western sahara':'212',
  'yemen':'967',
  'zambia':'260',
  'zimbabwe':'263'
}
const Registeruser= (props,state) => {



    //for connection error
    const [conError, setConError] = useState(false);
    //for success pop up
    const [successPopup, setSuccessPopup] = useState(false);
    //for Error Pop up
    const [errorPopup, setErrorPopup] = useState(false);
    //for customer id
    const [custId, setCustId] = useState();
    //for form data
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [businessMail, setBusinessMail] = useState();
    const [contactNumber, setContactNumber] = useState();
    const [country, setCountry] = useState();
    const [pincode, setPincode] = useState();
    const [city, setCity] = useState();
    const [address, setAddress] = useState();
    const [town, setTown] = useState();
    const [landmark, setLandmark] = useState();
    const [contactcode, setContactcode] = useState();


    const submitData =async (e)=>{
     e.preventDefault()

     let image= localStorage.getItem("user_image")
      if(!image||!firstName||!lastName||!businessMail){
        setErrorPopup(true)
    }else{
      
      

      Axios.post('http://localhost:3002/api/insert',
      {
       firstName:firstName,
       lastName:lastName,
       businessMail:businessMail,
       contactNumber:`+${contactcode}-${contactNumber}`,
       country:country,
       pincode:pincode,
       city:city,
       custId:custId,
       address:address,
       photo:image,
       town:town,
       landmark:landmark
       })
       .then((response)=>{
        console.log(response)
        setSuccessPopup(true)
      }).catch(err=>setConError(true))

      
    }
      
   
    }

  
  
    const countryChange=(e)=>{
      setCountry(e.target.value)
      console.log(e.target.value)
      let country=e.target.value.toLowerCase()
      let result=countryset[country]
      console.log(result)
      setContactcode(result)
    }

    const customeridChange=(e)=>{
      //instead of on chnage can we have it in on submit? it will be easy than i know but i want on when user go next input...
      var regex=/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/
     
        if(!regex.test(e.target.value)){
        return alert('Customer ID should be Please enter only alphabets and numbers')
        }
          let id=e.target.value.toUpperCase()
          setCustId(id)
    }
    
    return (
        <>
      <div className="registeruser">


        {/* Header */}
  
      <div className="header">
        <div className="header-container">
        
          <div className="title">
            <h1>USER REGISTRATION</h1>
          </div>
          
        </div>
      </div>
  
  
      {/* form section */}
      <div className="container-big">
  
      <div className="container">
        {/* <div className="title">Registration</div> */}
        <form action="">
          <div className='user-details'>
          <div className="input-box">
            <span className="details">User Photo<sup>*</sup></span>
  
            <div className="photo-container">
              <div>
                <div className="webcam">
                    <Captureimg/>
                </div>
{/*               
              <canvas id='canvas' height='120px' width='120px'>
                
              </canvas> */}
            
               
  
              </div>
  
  
  
           
            </div>
            
            </div>
            <div className="input-box photo-text">
            <p><strong><img src={attention} alt="" /> </strong><br/>Please Keep Your Face Aligned Correctly with Position to Webcam. This Image will be used to Validate while exam by AI Proctored Process.</p>
            
            <span className="details" style={{marginTop:10}}>Customer ID<sup>*</sup></span>
            <input type="text" autoComplete='off' title="Please enter exactly 10 digits"  placeholder='Enter 10 Digit Alpha Numeric Customer ID' style={{textTransform:'uppercase'}} maxlength="10" pattern="" required onBlur={customeridChange} onChange={(e)=>{

            }} />

            </div>
  
              
            <div className="input-box">
            <span className="details">First Name <sup>*</sup></span>
            <input type="text" autoComplete='off' required onChange={(e)=>{
                  setFirstName(e.target.value)
            }} />
            </div>
  
  
            <div className="input-box">
            <span className="details">Country <sup>*</sup></span>
           
             <select name="country" id="countries" onChange={countryChange}>
            <option >Select Country</option>
            <option name="Afganistan" value="Afghanistan">Afghanistan</option>
   <option value="Albania">Albania</option>
   <option value="Algeria">Algeria</option>
   <option value="American Samoa">American Samoa</option>
   <option value="Andorra">Andorra</option>
   <option value="Angola">Angola</option>
   <option value="Anguilla">Anguilla</option>
   <option value="Antigua & Barbuda">Antigua & Barbuda</option>
   <option value="Argentina">Argentina</option>
   <option value="Armenia">Armenia</option>
   <option value="Aruba">Aruba</option>
   <option value="Australia">Australia</option>
   <option value="Austria">Austria</option>
   <option value="Azerbaijan">Azerbaijan</option>
   <option value="Bahamas">Bahamas</option>
   <option value="Bahrain">Bahrain</option>
   <option value="Bangladesh">Bangladesh</option>
   <option value="Barbados">Barbados</option>
   <option value="Belarus">Belarus</option>
   <option value="Belgium">Belgium</option>
   <option value="Belize">Belize</option>
   <option value="Benin">Benin</option>
   <option value="Bermuda">Bermuda</option>
   <option value="Bhutan">Bhutan</option>
   <option value="Bolivia">Bolivia</option>
   <option value="Bonaire">Bonaire</option>
   <option value="Bosnia & Herzegovina">Bosnia & Herzegovina</option>
   <option value="Botswana">Botswana</option>
   <option value="Brazil">Brazil</option>
   <option value="British Indian Ocean Ter">British Indian Ocean Ter</option>
   <option value="Brunei">Brunei</option>
   <option value="Bulgaria">Bulgaria</option>
   <option value="Burkina Faso">Burkina Faso</option>
   <option value="Burundi">Burundi</option>
   <option value="Cambodia">Cambodia</option>
   <option value="Cameroon">Cameroon</option>
   <option value="Canada">Canada</option>
   <option value="Canary Islands">Canary Islands</option>
   <option value="Cape Verde">Cape Verde</option>
   <option value="Cayman Islands">Cayman Islands</option>
   <option value="Central African Republic">Central African Republic</option>
   <option value="Chad">Chad</option>
   <option value="Channel Islands">Channel Islands</option>
   <option value="Chile">Chile</option>
   <option value="China">China</option>
   <option value="Christmas Island">Christmas Island</option>
   <option value="Cocos Island">Cocos Island</option>
   <option value="Colombia">Colombia</option>
   <option value="Comoros">Comoros</option>
   <option value="Congo">Congo</option>
   <option value="Cook Islands">Cook Islands</option>
   <option value="Costa Rica">Costa Rica</option>
   <option value="Cote DIvoire">Cote DIvoire</option>
   <option value="Croatia">Croatia</option>
   <option value="Cuba">Cuba</option>
   <option value="Curaco">Curacao</option>
   <option value="Cyprus">Cyprus</option>
   <option value="Czech Republic">Czech Republic</option>
   <option value="Denmark">Denmark</option>
   <option value="Djibouti">Djibouti</option>
   <option value="Dominica">Dominica</option>
   <option value="Dominican Republic">Dominican Republic</option>
   <option value="East Timor">East Timor</option>
   <option value="Ecuador">Ecuador</option>
   <option value="Egypt">Egypt</option>
   <option value="El Salvador">El Salvador</option>
   <option value="Equatorial Guinea">Equatorial Guinea</option>
   <option value="Eritrea">Eritrea</option>
   <option value="Estonia">Estonia</option>
   <option value="Ethiopia">Ethiopia</option>
   <option value="Falkland Islands">Falkland Islands</option>
   <option value="Faroe Islands">Faroe Islands</option>
   <option value="Fiji">Fiji</option>
   <option value="Finland">Finland</option>
   <option value="France">France</option>
   <option value="French Guiana">French Guiana</option>
   <option value="French Polynesia">French Polynesia</option>
   <option value="French Southern Ter">French Southern Ter</option>
   <option value="Gabon">Gabon</option>
   <option value="Gambia">Gambia</option>
   <option value="Georgia">Georgia</option>
   <option value="Germany">Germany</option>
   <option value="Ghana">Ghana</option>
   <option value="Gibraltar">Gibraltar</option>
   <option value="Great Britain">Great Britain</option>
   <option value="Greece">Greece</option>
   <option value="Greenland">Greenland</option>
   <option value="Grenada">Grenada</option>
   <option value="Guadeloupe">Guadeloupe</option>
   <option value="Guam">Guam</option>
   <option value="Guatemala">Guatemala</option>
   <option value="Guinea">Guinea</option>
   <option value="Guyana">Guyana</option>
   <option value="Haiti">Haiti</option>
   <option value="Hawaii">Hawaii</option>
   <option value="Honduras">Honduras</option>
   <option value="Hong Kong">Hong Kong</option>
   <option value="Hungary">Hungary</option>
   <option value="Iceland">Iceland</option>
   <option value="Indonesia">Indonesia</option>
   <option value="India">India</option>
   <option value="Iran">Iran</option>
   <option value="Iraq">Iraq</option>
   <option value="Ireland">Ireland</option>
   <option value="Isle of Man">Isle of Man</option>
   <option value="Israel">Israel</option>
   <option value="Italy">Italy</option>
   <option value="Jamaica">Jamaica</option>
   <option value="Japan">Japan</option>
   <option value="Jordan">Jordan</option>
   <option value="Kazakhstan">Kazakhstan</option>
   <option value="Kenya">Kenya</option>
   <option value="Kiribati">Kiribati</option>
   <option value="Korea North">Korea North</option>
   <option value="Korea Sout">Korea South</option>
   <option value="Kuwait">Kuwait</option>
   <option value="Kyrgyzstan">Kyrgyzstan</option>
   <option value="Laos">Laos</option>
   <option value="Latvia">Latvia</option>
   <option value="Lebanon">Lebanon</option>
   <option value="Lesotho">Lesotho</option>
   <option value="Liberia">Liberia</option>
   <option value="Libya">Libya</option>
   <option value="Liechtenstein">Liechtenstein</option>
   <option value="Lithuania">Lithuania</option>
   <option value="Luxembourg">Luxembourg</option>
   <option value="Macau">Macau</option>
   <option value="Macedonia">Macedonia</option>
   <option value="Madagascar">Madagascar</option>
   <option value="Malaysia">Malaysia</option>
   <option value="Malawi">Malawi</option>
   <option value="Maldives">Maldives</option>
   <option value="Mali">Mali</option>
   <option value="Malta">Malta</option>
   <option value="Marshall Islands">Marshall Islands</option>
   <option value="Martinique">Martinique</option>
   <option value="Mauritania">Mauritania</option>
   <option value="Mauritius">Mauritius</option>
   <option value="Mayotte">Mayotte</option>
   <option value="Mexico">Mexico</option>
   <option value="Midway Islands">Midway Islands</option>
   <option value="Moldova">Moldova</option>
   <option value="Monaco">Monaco</option>
   <option value="Mongolia">Mongolia</option>
   <option value="Montserrat">Montserrat</option>
   <option value="Morocco">Morocco</option>
   <option value="Mozambique">Mozambique</option>
   <option value="Myanmar">Myanmar</option>
   <option value="Nambia">Nambia</option>
   <option value="Nauru">Nauru</option>
   <option value="Nepal">Nepal</option>
   <option value="Netherland Antilles">Netherland Antilles</option>
   <option value="Netherlands">Netherlands (Holland, Europe)</option>
   <option value="Nevis">Nevis</option>
   <option value="New Caledonia">New Caledonia</option>
   <option value="New Zealand">New Zealand</option>
   <option value="Nicaragua">Nicaragua</option>
   <option value="Niger">Niger</option>
   <option value="Nigeria">Nigeria</option>
   <option value="Niue">Niue</option>
   <option value="Norfolk Island">Norfolk Island</option>
   <option value="Norway">Norway</option>
   <option value="Oman">Oman</option>
   <option value="Pakistan">Pakistan</option>
   <option value="Palau Island">Palau Island</option>
   <option value="Palestine">Palestine</option>
   <option value="Panama">Panama</option>
   <option value="Papua New Guinea">Papua New Guinea</option>
   <option value="Paraguay">Paraguay</option>
   <option value="Peru">Peru</option>
   <option value="Phillipines">Philippines</option>
   <option value="Pitcairn Island">Pitcairn Island</option>
   <option value="Poland">Poland</option>
   <option value="Portugal">Portugal</option>
   <option value="Puerto Rico">Puerto Rico</option>
   <option value="Qatar">Qatar</option>
   <option value="Republic of Montenegro">Republic of Montenegro</option>
   <option value="Republic of Serbia">Republic of Serbia</option>
   <option value="Reunion">Reunion</option>
   <option value="Romania">Romania</option>
   <option value="Russia">Russia</option>
   <option value="Rwanda">Rwanda</option>
   <option value="St Barthelemy">St Barthelemy</option>
   <option value="St Eustatius">St Eustatius</option>
   <option value="St Helena">St Helena</option>
   <option value="St Kitts-Nevis">St Kitts-Nevis</option>
   <option value="St Lucia">St Lucia</option>
   <option value="St Maarten">St Maarten</option>
   <option value="St Pierre & Miquelon">St Pierre & Miquelon</option>
   <option value="St Vincent & Grenadines">St Vincent & Grenadines</option>
   <option value="Saipan">Saipan</option>
   <option value="Samoa">Samoa</option>
   <option value="Samoa American">Samoa American</option>
   <option value="San Marino">San Marino</option>
   <option value="Sao Tome & Principe">Sao Tome & Principe</option>
   <option value="Saudi Arabia">Saudi Arabia</option>
   <option value="Senegal">Senegal</option>
   <option value="Seychelles">Seychelles</option>
   <option value="Sierra Leone">Sierra Leone</option>
   <option value="Singapore">Singapore</option>
   <option value="Slovakia">Slovakia</option>
   <option value="Slovenia">Slovenia</option>
   <option value="Solomon Islands">Solomon Islands</option>
   <option value="Somalia">Somalia</option>
   <option value="South Africa">South Africa</option>
   <option value="Spain">Spain</option>
   <option value="Sri Lanka">Sri Lanka</option>
   <option value="Sudan">Sudan</option>
   <option value="Suriname">Suriname</option>
   <option value="Swaziland">Swaziland</option>
   <option value="Sweden">Sweden</option>
   <option value="Switzerland">Switzerland</option>
   <option value="Syria">Syria</option>
   <option value="Tahiti">Tahiti</option>
   <option value="Taiwan">Taiwan</option>
   <option value="Tajikistan">Tajikistan</option>
   <option value="Tanzania">Tanzania</option>
   <option value="Thailand">Thailand</option>
   <option value="Togo">Togo</option>
   <option value="Tokelau">Tokelau</option>
   <option value="Tonga">Tonga</option>
   <option value="Trinidad & Tobago">Trinidad & Tobago</option>
   <option value="Tunisia">Tunisia</option>
   <option value="Turkey">Turkey</option>
   <option value="Turkmenistan">Turkmenistan</option>
   <option value="Turks & Caicos Is">Turks & Caicos Is</option>
   <option value="Tuvalu">Tuvalu</option>
   <option value="Uganda">Uganda</option>
   <option value="United Kingdom">United Kingdom</option>
   <option value="Ukraine">Ukraine</option>
   <option value="United Arab Erimates">United Arab Emirates</option>
   <option value="United States of America">United States of America</option>
   <option value="Uraguay">Uruguay</option>
   <option value="Uzbekistan">Uzbekistan</option>
   <option value="Vanuatu">Vanuatu</option>
   <option value="Vatican City State">Vatican City State</option>
   <option value="Venezuela">Venezuela</option>
   <option value="Vietnam">Vietnam</option>
   <option value="Virgin Islands (Brit)">Virgin Islands (Brit)</option>
   <option value="Virgin Islands (USA)">Virgin Islands (USA)</option>
   <option value="Wake Island">Wake Island</option>
   <option value="Wallis and Futana Is">Wallis and Futana Is</option>
   <option value="Yemen">Yemen</option>
   <option value="Zaire">Zaire</option>
   <option value="Zambia">Zambia</option>
   <option value="Zimbabwe">Zimbabwe</option>
   
            </select>
  
            </div>
            
            
  
           
  
            <div className="input-box">
            <span className="details">Last Name<sup>*</sup></span>
            <input type="text" id='fullname' onChange={(e)=>{
                  setLastName(e.target.value)
            }}  />
            </div>
  
            {/* pincode */}

            <div className="input-box">
            <span className="details">Pin Code<sup>*</sup></span>
            <input type="number"id='phonenumber'  onChange={(e)=>{
                  setPincode(e.target.value)
            }}  />
            </div>
  
           
  
  
            
            <div className="input-box">
            <span className="details">Business E-mail<sup>*</sup></span>
            <input type="text"  id='password' onChange={(e)=>{
                  setBusinessMail(e.target.value)
            }}  />
            </div>

            
  
              {/* city */}
            
              <div className="input-box">
            <span className="details">City / District<sup>*</sup></span>
            <input type="text" id='confirmpassword'  onChange={(e)=>{
                  setCity(e.target.value)
            }} />
            </div>
  
  
            <div className="input-box">
            <span className="details">Contact No. <sup>*</sup></span>
            <div className='country-code-fetch'>

            <select name="countryCode" value={contactcode} id="">
            <option data-countryCode="GB" value="47" > (+47)</option>
            <option data-countryCode="US" value="44"> (+44)</option>
            <optgroup label="Other countries">
                <option data-countryCode="DZ" value="213"> (+213)</option>
                <option data-countryCode="AD" value="376"> (+376)</option>
                <option data-countryCode="AO" value="244"> (+244)</option>
                <option data-countryCode="AI" value="1264"> (+1264)</option>
                <option data-countryCode="AG" value="1268"> (+1268)</option>
                <option data-countryCode="AR" value="54"> (+54)</option>
                <option data-countryCode="AM" value="374"> (+374)</option>
                <option data-countryCode="AW" value="297"> (+297)</option>
                <option data-countryCode="AU" value="61"> (+61)</option>
                <option data-countryCode="AT" value="43"> (+43)</option>
                <option data-countryCode="AZ" value="994"> (+994)</option>
                <option data-countryCode="BS" value="1242"> (+1242)</option>
                <option data-countryCode="BH" value="973"> (+973)</option>
                <option data-countryCode="BD" value="880"> (+880)</option>
                <option data-countryCode="BB" value="1246"> (+1246)</option>
                <option data-countryCode="BY" value="375"> (+375)</option>
                <option data-countryCode="BE" value="32"> (+32)</option>
                <option data-countryCode="BZ" value="501"> (+501)</option>
                <option data-countryCode="BJ" value="229"> (+229)</option>
                <option data-countryCode="BM" value="1441"> (+1441)</option>
                <option data-countryCode="BT" value="975"> (+975)</option>
                <option data-countryCode="BO" value="591"> (+591)</option>
                <option data-countryCode="BA" value="387"> (+387)</option>
                <option data-countryCode="BW" value="267"> (+267)</option>
                <option data-countryCode="BR" value="55"> (+55)</option>
                <option data-countryCode="BN" value="673"> (+673)</option>
                <option data-countryCode="BG" value="359"> (+359)</option>
                <option data-countryCode="BF" value="226"> (+226)</option>
                <option data-countryCode="BI" value="257"> (+257)</option>
                <option data-countryCode="KH" value="855"> (+855)</option>
                <option data-countryCode="CM" value="237"> (+237)</option>
                <option data-countryCode="CA" value="1"> (+1)</option>
                <option data-countryCode="CV" value="238"> (+238)</option>
                <option data-countryCode="KY" value="1345">(+1345)</option>
                <option data-countryCode="CF" value="236"> (+236)</option>
                <option data-countryCode="CL" value="56"> (+56)</option>
                <option data-countryCode="CN" value="86"> (+86)</option>
                <option data-countryCode="CO" value="57"> (+57)</option>
                <option data-countryCode="KM" value="269"> (+269)</option>
                <option data-countryCode="CG" value="242"> (+242)</option>
                <option data-countryCode="CK" value="682">(+682)</option>
                <option data-countryCode="CR" value="506"> (+506)</option>
                <option data-countryCode="HR" value="385"> (+385)</option>
                <option data-countryCode="CU" value="53"> (+53)</option>
                <option data-countryCode="CY" value="90392"> (+90392)</option>
                <option data-countryCode="CY" value="357"> (+357)</option>
                <option data-countryCode="CZ" value="42">  (+42)</option>
                <option data-countryCode="DK" value="45"> (+45)</option>
                <option data-countryCode="DJ" value="253"> (+253)</option>
                <option data-countryCode="DM" value="1809"> (+1809)</option>
                <option data-countryCode="DO" value="1809"> (+1809)</option>
                <option data-countryCode="EC" value="593"> (+593)</option>
                <option data-countryCode="EG" value="20"> (+20)</option>
                <option data-countryCode="SV" value="503"> (+503)</option>
                <option data-countryCode="GQ" value="240"> (+240)</option>
                <option data-countryCode="ER" value="291"> (+291)</option>
                <option data-countryCode="EE" value="372"> (+372)</option>
                <option data-countryCode="ET" value="251"> (+251)</option>
                <option data-countryCode="FK" value="500"> (+500)</option>
                <option data-countryCode="FO" value="298">  (+298)</option>
                <option data-countryCode="FJ" value="679"> (+679)</option>
                <option data-countryCode="FI" value="358"> (+358)</option>
                <option data-countryCode="FR" value="33"> (+33)</option>
                <option data-countryCode="GF" value="594"> (+594)</option>
                <option data-countryCode="PF" value="689"> (+689)</option>
                <option data-countryCode="GA" value="241"> (+241)</option>
                <option data-countryCode="GM" value="220"> (+220)</option>
                <option data-countryCode="GE" value="7880"> (+7880)</option>
                <option data-countryCode="DE" value="49"> (+49)</option>
                <option data-countryCode="GH" value="233"> (+233)</option>
                <option data-countryCode="GI" value="350"> (+350)</option>
                <option data-countryCode="GR" value="30"> (+30)</option>
                <option data-countryCode="GL" value="299"> (+299)</option>
                <option data-countryCode="GD" value="1473"> (+1473)</option>
                <option data-countryCode="GP" value="590"> (+590)</option>
                <option data-countryCode="GU" value="671"> (+671)</option>
                <option data-countryCode="GT" value="502"> (+502)</option>
                <option data-countryCode="GN" value="224"> (+224)</option>
                <option data-countryCode="GW" value="245"> (+245)</option>
                <option data-countryCode="GY" value="592"> (+592)</option>
                <option data-countryCode="HT" value="509"> (+509)</option>
                <option data-countryCode="HN" value="504"> (+504)</option>
                <option data-countryCode="HK" value="852"> (+852)</option>
                <option data-countryCode="HU" value="36"> (+36)</option>
                <option data-countryCode="IS" value="354"> (+354)</option>
                <option data-countryCode="IN" value="91"> (+91)</option>
                <option data-countryCode="ID" value="62"> (+62)</option>
                <option data-countryCode="IR" value="98"> (+98)</option>
                <option data-countryCode="IQ" value="964"> (+964)</option>
                <option data-countryCode="IE" value="353"> (+353)</option>
                <option data-countryCode="IL" value="972"> (+972)</option>
                <option data-countryCode="IT" value="39"> (+39)</option>
                <option data-countryCode="JM" value="1876"> (+1876)</option>
                <option data-countryCode="JP" value="81"> (+81)</option>
                <option data-countryCode="JO" value="962"> (+962)</option>
                <option data-countryCode="KZ" value="7"> (+7)</option>
                <option data-countryCode="KE" value="254"> (+254)</option>
                <option data-countryCode="KI" value="686"> (+686)</option>
                <option data-countryCode="KP" value="850"> (+850)</option>
                <option data-countryCode="KR" value="82"> (+82)</option>
                <option data-countryCode="KW" value="965"> (+965)</option>
                <option data-countryCode="KG" value="996"> (+996)</option>
                <option data-countryCode="LA" value="856"> (+856)</option>
                <option data-countryCode="LV" value="371"> (+371)</option>
                <option data-countryCode="LB" value="961"> (+961)</option>
                <option data-countryCode="LS" value="266"> (+266)</option>
                <option data-countryCode="LR" value="231"> (+231)</option>
                <option data-countryCode="LY" value="218"> (+218)</option>
                <option data-countryCode="LI" value="417"> (+417)</option>
                <option data-countryCode="LT" value="370"> (+370)</option>
                <option data-countryCode="LU" value="352"> (+352)</option>
                <option data-countryCode="MO" value="853"> (+853)</option>
                <option data-countryCode="MK" value="389"> (+389)</option>
                <option data-countryCode="MG" value="261"> (+261)</option>
                <option data-countryCode="MW" value="265"> (+265)</option>
                <option data-countryCode="MY" value="60"> (+60)</option>
                <option data-countryCode="MV" value="960"> (+960)</option>
                <option data-countryCode="ML" value="223"> (+223)</option>
                <option data-countryCode="MT" value="356"> (+356)</option>
                <option data-countryCode="MH" value="692"> (+692)</option>
                <option data-countryCode="MQ" value="596"> (+596)</option>
                <option data-countryCode="MR" value="222"> (+222)</option>
                <option data-countryCode="YT" value="269"> (+269)</option>
                <option data-countryCode="MX" value="52"> (+52)</option>
                <option data-countryCode="FM" value="691"> (+691)</option>
                <option data-countryCode="MD" value="373"> (+373)</option>
                <option data-countryCode="MC" value="377"> (+377)</option>
                <option data-countryCode="MN" value="976"> (+976)</option>
                <option data-countryCode="MS" value="1664"> (+1664)</option>
                <option data-countryCode="MA" value="212"> (+212)</option>
                <option data-countryCode="MZ" value="258"> (+258)</option>
                <option data-countryCode="MN" value="95"> (+95)</option>
                <option data-countryCode="NA" value="264"> (+264)</option>
                <option data-countryCode="NR" value="674"> (+674)</option>
                <option data-countryCode="NP" value="977"> (+977)</option>
                <option data-countryCode="NL" value="31"> (+31)</option>
                <option data-countryCode="NC" value="687"> (+687)</option>
                <option data-countryCode="NZ" value="64"> (+64)</option>
                <option data-countryCode="NI" value="505"> (+505)</option>
                <option data-countryCode="NE" value="227"> (+227)</option>
                <option data-countryCode="NG" value="234"> (+234)</option>
                <option data-countryCode="NU" value="683"> (+683)</option>
                <option data-countryCode="NF" value="672"> (+672)</option>
                <option data-countryCode="NP" value="670"> (+670)</option>
                <option data-countryCode="NO" value="47"> (+47)</option>
                <option data-countryCode="OM" value="968"> (+968)</option>
                <option data-countryCode="PW" value="680"> (+680)</option>
                <option data-countryCode="PA" value="507"> (+507)</option>
                <option data-countryCode="PG" value="675"> (+675)</option>
                <option data-countryCode="PY" value="595"> (+595)</option>
                <option data-countryCode="PE" value="51"> (+51)</option>
                <option data-countryCode="PH" value="63"> (+63)</option>
                <option data-countryCode="PL" value="48"> (+48)</option>
                <option data-countryCode="PT" value="351"> (+351)</option>
                <option data-countryCode="PR" value="1787"> (+1787)</option>
                <option data-countryCode="QA" value="974"> (+974)</option>
                <option data-countryCode="RE" value="262"> (+262)</option>
                <option data-countryCode="RO" value="40"> (+40)</option>
                <option data-countryCode="RU" value="7"> (+7)</option>
                <option data-countryCode="RW" value="250"> (+250)</option>
                <option data-countryCode="SM" value="378"> (+378)</option>
                <option data-countryCode="ST" value="239"> (+239)</option>
                <option data-countryCode="SA" value="966"> (+966)</option>
                <option data-countryCode="SN" value="221"> (+221)</option>
                <option data-countryCode="CS" value="381"> (+381)</option>
                <option data-countryCode="SC" value="248"> (+248)</option>
                <option data-countryCode="SL" value="232"> (+232)</option>
                <option data-countryCode="SG" value="65"> (+65)</option>
                <option data-countryCode="SK" value="421"> (+421)</option>
                <option data-countryCode="SI" value="386"> (+386)</option>
                <option data-countryCode="SB" value="677"> (+677)</option>
                <option data-countryCode="SO" value="252"> (+252)</option>
                <option data-countryCode="ZA" value="27"> (+27)</option>
                <option data-countryCode="ES" value="34"> (+34)</option>
                <option data-countryCode="LK" value="94"> (+94)</option>
                <option data-countryCode="SH" value="290"> (+290)</option>
                <option data-countryCode="KN" value="1869"> (+1869)</option>
                <option data-countryCode="SC" value="1758"> (+1758)</option>
                <option data-countryCode="SD" value="249"> (+249)</option>
                <option data-countryCode="SR" value="597"> (+597)</option>
                <option data-countryCode="SZ" value="268"> (+268)</option>
                <option data-countryCode="SE" value="46"> (+46)</option>
                <option data-countryCode="CH" value="41"> (+41)</option>
                <option data-countryCode="SI" value="963"> (+963)</option>
                <option data-countryCode="TW" value="886"> (+886)</option>
                <option data-countryCode="TJ" value="7"> (+7)</option>
                <option data-countryCode="TH" value="66"> (+66)</option>
                <option data-countryCode="TG" value="228"> (+228)</option>
                <option data-countryCode="TO" value="676"> (+676)</option>
                <option data-countryCode="TT" value="1868"> (+1868)</option>
                <option data-countryCode="TN" value="216"> (+216)</option>
                <option data-countryCode="TR" value="90"> (+90)</option>
                <option data-countryCode="TM" value="7"> (+7)</option>
                <option data-countryCode="TM" value="993"> (+993)</option>
                <option data-countryCode="TC" value="1649"> (+1649)</option>
                <option data-countryCode="TV" value="688"> (+688)</option>
                <option data-countryCode="UG" value="256"> (+256)</option>
                <option data-countryCode="GB" value="44"> (+44)</option> 
                <option data-countryCode="UA" value="380"> (+380)</option>
                <option data-countryCode="AE" value="971">(+971)</option>
                <option data-countryCode="UY" value="598"> (+598)</option>
                <option data-countryCode="US" value="1"> (+1)</option> 
                <option data-countryCode="UZ" value="7"> (+7)</option>
                <option data-countryCode="VU" value="678"> (+678)</option>
                <option data-countryCode="VA" value="379">  (+379)</option>
                <option data-countryCode="VE" value="58"> (+58)</option>
                <option data-countryCode="VN" value="84"> (+84)</option>
                <option data-countryCode="VG" value="84"> (+1284)</option>
                <option data-countryCode="VI" value="84"> (+1340)</option>
                <option data-countryCode="WF" value="681"> (+681)</option>
                <option data-countryCode="YE" value="969"> (+969)</option>
                <option data-countryCode="YE" value="967"> (+967)</option>
                <option data-countryCode="ZM" value="260"> (+260)</option>
                <option data-countryCode="ZW" value="263"> (+263)</option>
            </optgroup>
        </select> 
           
            <input type="number"  maxLength="10"  id='password' onChange={(e)=>{
                  setContactNumber(e.target.value)
            }}  />
            </div>
           
            </div>
  
            <div className="input-box">
            <span className="details"> Address(House No.,Building,Street) <sup>*</sup></span>
            <input type="text" onChange={(e)=>{
                  setAddress(e.target.value)
            }}  />
            
            </div>

            <div className="input-box">
            <span className="details">Locality, Town<sup>*</sup></span>
            <input type="text"  onChange={(e)=>{
                  setTown(e.target.value)
            }}  />
            
            </div>

            <div className="input-box">
            <span className="details">Landmark<sup>*</sup></span>
            <input type="text"  onChange={(e)=>{
                  setLandmark(e.target.value)
            }}  />
            
            </div>
         
          
           
          </div>
  
          <h3 className='warning1'><img src={handImg} alt="" /> <strong>PERSONAL INFORMATION (PII) DISCLOSURE CONCENT BY THE PERSON DOING REGISTRATION</strong> </h3>
         
          <h2>
  “My personal information shared here in this website is done willingly by me. This information is to be used by IRCBO Solutions Pvt. Ltd. only for registration purpose and subsequent correspondence pertaining to the subject matter only (for which registration is done)”.
            </h2>
          

         
      <h3 className='warning1'>
      <img src={handImg} alt="" />
   <strong>IRCBO ACKNOWLEDGEMENT ON ACCEPTANCE OF CONSENT AND COMMITMENT</strong> </h3>



  
   
  <h2>
  IRCBO Solutions Pvt. Ltd. as a company acknowledges and want to give confidence, to the person registering, that the personal information shared, is considered as “HIGHLY CONFIDENTIAL” and shall ensure to live  up to the objective and confidence of the person doing registration.</h2>
  

  
 
          <div className="button">
            <Link className='regBackBtn' to={'/'}>Back</Link>
            <input type="button" value="Submit" onClick={submitData} />
          </div>
          {successPopup && <DonePop closeDonePop={setSuccessPopup}/>}
          {errorPopup && <ErrorPop closeErrorPopup={setErrorPopup}/>}
          {conError && <ConError closeConErrorup={setConError}/>}
        </form>
        </div>
  
        </div>
  
  

        </div>
      </>
    );
}

export default Registeruser;
