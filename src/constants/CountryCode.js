let country_list = [
  {
    label: "Select Country",
    value: " "
  },
  {
    name: "Afghanistan",
    flag: "🇦🇫",
    countryIsoCode: "AF",
    dial_code: "+93"
  },
  {
    name: "Åland Islands",
    flag: "🇦🇽",
    countryIsoCode: "AX",
    dial_code: "+358"
  },
  {
    name: "Albania",
    flag: "🇦🇱",
    countryIsoCode: "AL",
    dial_code: "+355"
  },
  {
    name: "Algeria",
    flag: "🇩🇿",
    countryIsoCode: "DZ",
    dial_code: "+213"
  },
  {
    name: "American Samoa",
    flag: "🇦🇸",
    countryIsoCode: "AS",
    dial_code: "+1684"
  },
  {
    name: "Andorra",
    flag: "🇦🇩",
    countryIsoCode: "AD",
    dial_code: "+376"
  },
  {
    name: "Angola",
    flag: "🇦🇴",
    countryIsoCode: "AO",
    dial_code: "+244"
  },
  {
    name: "Anguilla",
    flag: "🇦🇮",
    countryIsoCode: "AI",
    dial_code: "+1264"
  },
  {
    name: "Antarctica",
    flag: "🇦🇶",
    countryIsoCode: "AQ",
    dial_code: "+672"
  },
  {
    name: "Antigua and Barbuda",
    flag: "🇦🇬",
    countryIsoCode: "AG",
    dial_code: "+1268"
  },
  {
    name: "Argentina",
    flag: "🇦🇷",
    countryIsoCode: "AR",
    dial_code: "+54"
  },
  {
    name: "Armenia",
    flag: "🇦🇲",
    countryIsoCode: "AM",
    dial_code: "+374"
  },
  {
    name: "Aruba",
    flag: "🇦🇼",
    countryIsoCode: "AW",
    dial_code: "+297"
  },
  {
    name: "Australia",
    flag: "🇦🇺",
    countryIsoCode: "AU",
    dial_code: "+61"
  },
  {
    name: "Austria",
    flag: "🇦🇹",
    countryIsoCode: "AT",
    dial_code: "+43"
  },
  {
    name: "Azerbaijan",
    flag: "🇦🇿",
    countryIsoCode: "AZ",
    dial_code: "+994"
  },
  {
    name: "Bahamas",
    flag: "🇧🇸",
    countryIsoCode: "BS",
    dial_code: "+1242"
  },
  {
    name: "Bahrain",
    flag: "🇧🇭",
    countryIsoCode: "BH",
    dial_code: "+973"
  },
  {
    name: "Bangladesh",
    flag: "🇧🇩",
    countryIsoCode: "BD",
    dial_code: "+880"
  },
  {
    name: "Barbados",
    flag: "🇧🇧",
    countryIsoCode: "BB",
    dial_code: "+1246"
  },
  {
    name: "Belarus",
    flag: "🇧🇾",
    countryIsoCode: "BY",
    dial_code: "+375"
  },
  {
    name: "Belgium",
    flag: "🇧🇪",
    countryIsoCode: "BE",
    dial_code: "+32"
  },
  {
    name: "Belize",
    flag: "🇧🇿",
    countryIsoCode: "BZ",
    dial_code: "+501"
  },
  {
    name: "Benin",
    flag: "🇧🇯",
    countryIsoCode: "BJ",
    dial_code: "+229"
  },
  {
    name: "Bermuda",
    flag: "🇧🇲",
    countryIsoCode: "BM",
    dial_code: "+1441"
  },
  {
    name: "Bhutan",
    flag: "🇧🇹",
    countryIsoCode: "BT",
    dial_code: "+975"
  },
  {
    name: "Bolivia, Plurinational State of bolivia",
    flag: "🇧🇴",
    countryIsoCode: "BO",
    dial_code: "+591"
  },
  {
    name: "Bosnia and Herzegovina",
    flag: "🇧🇦",
    countryIsoCode: "BA",
    dial_code: "+387"
  },
  {
    name: "Botswana",
    flag: "🇧🇼",
    countryIsoCode: "BW",
    dial_code: "+267"
  },
  {
    name: "Bouvet Island",
    flag: "🇧🇻",
    countryIsoCode: "BV",
    dial_code: "+47"
  },
  {
    name: "Brazil",
    flag: "🇧🇷",
    countryIsoCode: "BR",
    dial_code: "+55"
  },
  {
    name: "British Indian Ocean Territory",
    flag: "🇮🇴",
    countryIsoCode: "IO",
    dial_code: "+246"
  },
  {
    name: "Brunei Darussalam",
    flag: "🇧🇳",
    countryIsoCode: "BN",
    dial_code: "+673"
  },
  {
    name: "Bulgaria",
    flag: "🇧🇬",
    countryIsoCode: "BG",
    dial_code: "+359"
  },
  {
    name: "Burkina Faso",
    flag: "🇧🇫",
    countryIsoCode: "BF",
    dial_code: "+226"
  },
  {
    name: "Burundi",
    flag: "🇧🇮",
    countryIsoCode: "BI",
    dial_code: "+257"
  },
  {
    name: "Cambodia",
    flag: "🇰🇭",
    countryIsoCode: "KH",
    dial_code: "+855"
  },
  {
    name: "Cameroon",
    flag: "🇨🇲",
    countryIsoCode: "CM",
    dial_code: "+237"
  },
  {
    name: "Canada",
    flag: "🇨🇦",
    countryIsoCode: "CA",
    dial_code: "+1"
  },
  {
    name: "Cape Verde",
    flag: "🇨🇻",
    countryIsoCode: "CV",
    dial_code: "+238"
  },
  {
    name: "Cayman Islands",
    flag: "🇰🇾",
    countryIsoCode: "KY",
    dial_code: "+345"
  },
  {
    name: "Central African Republic",
    flag: "🇨🇫",
    countryIsoCode: "CF",
    dial_code: "+236"
  },
  {
    name: "Chad",
    flag: "🇹🇩",
    countryIsoCode: "TD",
    dial_code: "+235"
  },
  {
    name: "Chile",
    flag: "🇨🇱",
    countryIsoCode: "CL",
    dial_code: "+56"
  },
  {
    name: "China",
    flag: "🇨🇳",
    countryIsoCode: "CN",
    dial_code: "+86"
  },
  {
    name: "Christmas Island",
    flag: "🇨🇽",
    countryIsoCode: "CX",
    dial_code: "+61"
  },
  {
    name: "Cocos (Keeling) Islands",
    flag: "🇨🇨",
    countryIsoCode: "CC",
    dial_code: "+61"
  },
  {
    name: "Colombia",
    flag: "🇨🇴",
    countryIsoCode: "CO",
    dial_code: "+57"
  },
  {
    name: "Comoros",
    flag: "🇰🇲",
    countryIsoCode: "KM",
    dial_code: "+269"
  },
  {
    name: "Congo",
    flag: "🇨🇬",
    countryIsoCode: "CG",
    dial_code: "+242"
  },
  {
    name: "Congo, The Democratic Republic of the Congo",
    flag: "🇨🇩",
    countryIsoCode: "CD",
    dial_code: "+243"
  },
  {
    name: "Cook Islands",
    flag: "🇨🇰",
    countryIsoCode: "CK",
    dial_code: "+682"
  },
  {
    name: "Costa Rica",
    flag: "🇨🇷",
    countryIsoCode: "CR",
    dial_code: "+506"
  },
  {
    name: "Cote d'Ivoire",
    flag: "🇨🇮",
    countryIsoCode: "CI",
    dial_code: "+225"
  },
  {
    name: "Croatia",
    flag: "🇭🇷",
    countryIsoCode: "HR",
    dial_code: "+385"
  },
  {
    name: "Cuba",
    flag: "🇨🇺",
    countryIsoCode: "CU",
    dial_code: "+53"
  },
  {
    name: "Cyprus",
    flag: "🇨🇾",
    countryIsoCode: "CY",
    dial_code: "+357"
  },
  {
    name: "Czech Republic",
    flag: "🇨🇿",
    countryIsoCode: "CZ",
    dial_code: "+420"
  },
  {
    name: "Denmark",
    flag: "🇩🇰",
    countryIsoCode: "DK",
    dial_code: "+45"
  },
  {
    name: "Djibouti",
    flag: "🇩🇯",
    countryIsoCode: "DJ",
    dial_code: "+253"
  },
  {
    name: "Dominica",
    flag: "🇩🇲",
    countryIsoCode: "DM",
    dial_code: "+1767"
  },
  {
    name: "Dominican Republic",
    flag: "🇩🇴",
    countryIsoCode: "DO",
    dial_code: "+1849"
  },
  {
    name: "Ecuador",
    flag: "🇪🇨",
    countryIsoCode: "EC",
    dial_code: "+593"
  },
  {
    name: "Egypt",
    flag: "🇪🇬",
    countryIsoCode: "EG",
    dial_code: "+20"
  },
  {
    name: "El Salvador",
    flag: "🇸🇻",
    countryIsoCode: "SV",
    dial_code: "+503"
  },
  {
    name: "Equatorial Guinea",
    flag: "🇬🇶",
    countryIsoCode: "GQ",
    dial_code: "+240"
  },
  {
    name: "Eritrea",
    flag: "🇪🇷",
    countryIsoCode: "ER",
    dial_code: "+291"
  },
  {
    name: "Estonia",
    flag: "🇪🇪",
    countryIsoCode: "EE",
    dial_code: "+372"
  },
  {
    name: "Ethiopia",
    flag: "🇪🇹",
    countryIsoCode: "ET",
    dial_code: "+251"
  },
  {
    name: "Falkland Islands (Malvinas)",
    flag: "🇫🇰",
    countryIsoCode: "FK",
    dial_code: "+500"
  },
  {
    name: "Faroe Islands",
    flag: "🇫🇴",
    countryIsoCode: "FO",
    dial_code: "+298"
  },
  {
    name: "Fiji",
    flag: "🇫🇯",
    countryIsoCode: "FJ",
    dial_code: "+679"
  },
  {
    name: "Finland",
    flag: "🇫🇮",
    countryIsoCode: "FI",
    dial_code: "+358"
  },
  {
    name: "France",
    flag: "🇫🇷",
    countryIsoCode: "FR",
    dial_code: "+33"
  },
  {
    name: "French Guiana",
    flag: "🇬🇫",
    countryIsoCode: "GF",
    dial_code: "+594"
  },
  {
    name: "French Polynesia",
    flag: "🇵🇫",
    countryIsoCode: "PF",
    dial_code: "+689"
  },
  {
    name: "French Southern Territories",
    flag: "🇹🇫",
    countryIsoCode: "TF",
    dial_code: "+262"
  },
  {
    name: "Gabon",
    flag: "🇬🇦",
    countryIsoCode: "GA",
    dial_code: "+241"
  },
  {
    name: "Gambia",
    flag: "🇬🇲",
    countryIsoCode: "GM",
    dial_code: "+220"
  },
  {
    name: "Georgia",
    flag: "🇬🇪",
    countryIsoCode: "GE",
    dial_code: "+995"
  },
  {
    name: "Germany",
    flag: "🇩🇪",
    countryIsoCode: "DE",
    dial_code: "+49"
  },
  {
    name: "Ghana",
    flag: "🇬🇭",
    countryIsoCode: "GH",
    dial_code: "+233"
  },
  {
    name: "Gibraltar",
    flag: "🇬🇮",
    countryIsoCode: "GI",
    dial_code: "+350"
  },
  {
    name: "Greece",
    flag: "🇬🇷",
    countryIsoCode: "GR",
    dial_code: "+30"
  },
  {
    name: "Greenland",
    flag: "🇬🇱",
    countryIsoCode: "GL",
    dial_code: "+299"
  },
  {
    name: "Grenada",
    flag: "🇬🇩",
    countryIsoCode: "GD",
    dial_code: "+1473"
  },
  {
    name: "Guadeloupe",
    flag: "🇬🇵",
    countryIsoCode: "GP",
    dial_code: "+590"
  },
  {
    name: "Guam",
    flag: "🇬🇺",
    countryIsoCode: "GU",
    dial_code: "+1671"
  },
  {
    name: "Guatemala",
    flag: "🇬🇹",
    countryIsoCode: "GT",
    dial_code: "+502"
  },
  {
    name: "Guernsey",
    flag: "🇬🇬",
    countryIsoCode: "GG",
    dial_code: "+44"
  },
  {
    name: "Guinea",
    flag: "🇬🇳",
    countryIsoCode: "GN",
    dial_code: "+224"
  },
  {
    name: "Guinea-Bissau",
    flag: "🇬🇼",
    countryIsoCode: "GW",
    dial_code: "+245"
  },
  {
    name: "Guyana",
    flag: "🇬🇾",
    countryIsoCode: "GY",
    dial_code: "+592"
  },
  {
    name: "Haiti",
    flag: "🇭🇹",
    countryIsoCode: "HT",
    dial_code: "+509"
  },
  {
    name: "Heard Island and Mcdonald Islands",
    flag: "🇭🇲",
    countryIsoCode: "HM",
    dial_code: "+672"
  },
  {
    name: "Holy See (Vatican City State)",
    flag: "🇻🇦",
    countryIsoCode: "VA",
    dial_code: "+379"
  },
  {
    name: "Honduras",
    flag: "🇭🇳",
    countryIsoCode: "HN",
    dial_code: "+504"
  },
  {
    name: "Hong Kong",
    flag: "🇭🇰",
    countryIsoCode: "HK",
    dial_code: "+852"
  },
  {
    name: "Hungary",
    flag: "🇭🇺",
    countryIsoCode: "HU",
    dial_code: "+36"
  },
  {
    name: "Iceland",
    flag: "🇮🇸",
    countryIsoCode: "IS",
    dial_code: "+354"
  },
  {
    name: "India",
    flag: "🇮🇳",
    countryIsoCode: "IN",
    dial_code: "+91"
  },
  {
    name: "Indonesia",
    flag: "🇮🇩",
    countryIsoCode: "ID",
    dial_code: "+62"
  },
  {
    name: "Iran, Islamic Republic of Persian Gulf",
    flag: "🇮🇷",
    countryIsoCode: "IR",
    dial_code: "+98"
  },
  {
    name: "Iraq",
    flag: "🇮🇶",
    countryIsoCode: "IQ",
    dial_code: "+964"
  },
  {
    name: "Ireland",
    flag: "🇮🇪",
    countryIsoCode: "IE",
    dial_code: "+353"
  },
  {
    name: "Isle of Man",
    flag: "🇮🇲",
    countryIsoCode: "IM",
    dial_code: "+44"
  },
  {
    name: "Israel",
    flag: "🇮🇱",
    countryIsoCode: "IL",
    dial_code: "+972"
  },
  {
    name: "Italy",
    flag: "🇮🇹",
    countryIsoCode: "IT",
    dial_code: "+39"
  },
  {
    name: "Jamaica",
    flag: "🇯🇲",
    countryIsoCode: "JM",
    dial_code: "+1876"
  },
  {
    name: "Japan",
    flag: "🇯🇵",
    countryIsoCode: "JP",
    dial_code: "+81"
  },
  {
    name: "Jersey",
    flag: "🇯🇪",
    countryIsoCode: "JE",
    dial_code: "+44"
  },
  {
    name: "Jordan",
    flag: "🇯🇴",
    countryIsoCode: "JO",
    dial_code: "+962"
  },
  {
    name: "Kazakhstan",
    flag: "🇰🇿",
    countryIsoCode: "KZ",
    dial_code: "+7"
  },
  {
    name: "Kenya",
    flag: "🇰🇪",
    countryIsoCode: "KE",
    dial_code: "+254"
  },
  {
    name: "Kiribati",
    flag: "🇰🇮",
    countryIsoCode: "KI",
    dial_code: "+686"
  },
  {
    name: "Korea, Democratic People's Republic of Korea",
    flag: "🇰🇵",
    countryIsoCode: "KP",
    dial_code: "+850"
  },
  {
    name: "Korea, Republic of South Korea",
    flag: "🇰🇷",
    countryIsoCode: "KR",
    dial_code: "+82"
  },
  {
    name: "Kosovo",
    flag: "🇽🇰",
    countryIsoCode: "XK",
    dial_code: "+383"
  },
  {
    name: "Kuwait",
    flag: "🇰🇼",
    countryIsoCode: "KW",
    dial_code: "+965"
  },
  {
    name: "Kyrgyzstan",
    flag: "🇰🇬",
    countryIsoCode: "KG",
    dial_code: "+996"
  },
  {
    name: "Laos",
    flag: "🇱🇦",
    countryIsoCode: "LA",
    dial_code: "+856"
  },
  {
    name: "Latvia",
    flag: "🇱🇻",
    countryIsoCode: "LV",
    dial_code: "+371"
  },
  {
    name: "Lebanon",
    flag: "🇱🇧",
    countryIsoCode: "LB",
    dial_code: "+961"
  },
  {
    name: "Lesotho",
    flag: "🇱🇸",
    countryIsoCode: "LS",
    dial_code: "+266"
  },
  {
    name: "Liberia",
    flag: "🇱🇷",
    countryIsoCode: "LR",
    dial_code: "+231"
  },
  {
    name: "Libyan Arab Jamahiriya",
    flag: "🇱🇾",
    countryIsoCode: "LY",
    dial_code: "+218"
  },
  {
    name: "Liechtenstein",
    flag: "🇱🇮",
    countryIsoCode: "LI",
    dial_code: "+423"
  },
  {
    name: "Lithuania",
    flag: "🇱🇹",
    countryIsoCode: "LT",
    dial_code: "+370"
  },
  {
    name: "Luxembourg",
    flag: "🇱🇺",
    countryIsoCode: "LU",
    dial_code: "+352"
  },
  {
    name: "Macao",
    flag: "🇲🇴",
    countryIsoCode: "MO",
    dial_code: "+853"
  },
  {
    name: "Macedonia",
    flag: "🇲🇰",
    countryIsoCode: "MK",
    dial_code: "+389"
  },
  {
    name: "Madagascar",
    flag: "🇲🇬",
    countryIsoCode: "MG",
    dial_code: "+261"
  },
  {
    name: "Malawi",
    flag: "🇲🇼",
    countryIsoCode: "MW",
    dial_code: "+265"
  },
  {
    name: "Malaysia",
    flag: "🇲🇾",
    countryIsoCode: "MY",
    dial_code: "+60"
  },
  {
    name: "Maldives",
    flag: "🇲🇻",
    countryIsoCode: "MV",
    dial_code: "+960"
  },
  {
    name: "Mali",
    flag: "🇲🇱",
    countryIsoCode: "ML",
    dial_code: "+223"
  },
  {
    name: "Malta",
    flag: "🇲🇹",
    countryIsoCode: "MT",
    dial_code: "+356"
  },
  {
    name: "Marshall Islands",
    flag: "🇲🇭",
    countryIsoCode: "MH",
    dial_code: "+692"
  },
  {
    name: "Martinique",
    flag: "🇲🇶",
    countryIsoCode: "MQ",
    dial_code: "+596"
  },
  {
    name: "Mauritania",
    flag: "🇲🇷",
    countryIsoCode: "MR",
    dial_code: "+222"
  },
  {
    name: "Mauritius",
    flag: "🇲🇺",
    countryIsoCode: "MU",
    dial_code: "+230"
  },
  {
    name: "Mayotte",
    flag: "🇾🇹",
    countryIsoCode: "YT",
    dial_code: "+262"
  },
  {
    name: "Mexico",
    flag: "🇲🇽",
    countryIsoCode: "MX",
    dial_code: "+52"
  },
  {
    name: "Micronesia, Federated States of Micronesia",
    flag: "🇫🇲",
    countryIsoCode: "FM",
    dial_code: "+691"
  },
  {
    name: "Moldova",
    flag: "🇲🇩",
    countryIsoCode: "MD",
    dial_code: "+373"
  },
  {
    name: "Monaco",
    flag: "🇲🇨",
    countryIsoCode: "MC",
    dial_code: "+377"
  },
  {
    name: "Mongolia",
    flag: "🇲🇳",
    countryIsoCode: "MN",
    dial_code: "+976"
  },
  {
    name: "Montenegro",
    flag: "🇲🇪",
    countryIsoCode: "ME",
    dial_code: "+382"
  },
  {
    name: "Montserrat",
    flag: "🇲🇸",
    countryIsoCode: "MS",
    dial_code: "+1664"
  },
  {
    name: "Morocco",
    flag: "🇲🇦",
    countryIsoCode: "MA",
    dial_code: "+212"
  },
  {
    name: "Mozambique",
    flag: "🇲🇿",
    countryIsoCode: "MZ",
    dial_code: "+258"
  },
  {
    name: "Myanmar",
    flag: "🇲🇲",
    countryIsoCode: "MM",
    dial_code: "+95"
  },
  {
    name: "Namibia",
    flag: "🇳🇦",
    countryIsoCode: "NA",
    dial_code: "+264"
  },
  {
    name: "Nauru",
    flag: "🇳🇷",
    countryIsoCode: "NR",
    dial_code: "+674"
  },
  {
    name: "Nepal",
    flag: "🇳🇵",
    countryIsoCode: "NP",
    dial_code: "+977"
  },
  {
    name: "Netherlands",
    flag: "🇳🇱",
    countryIsoCode: "NL",
    dial_code: "+31"
  },
  {
    name: "Netherlands Antilles",
    flag: "",
    countryIsoCode: "AN",
    dial_code: "+599"
  },
  {
    name: "New Caledonia",
    flag: "🇳🇨",
    countryIsoCode: "NC",
    dial_code: "+687"
  },
  {
    name: "New Zealand",
    flag: "🇳🇿",
    countryIsoCode: "NZ",
    dial_code: "+64"
  },
  {
    name: "Nicaragua",
    flag: "🇳🇮",
    countryIsoCode: "NI",
    dial_code: "+505"
  },
  {
    name: "Niger",
    flag: "🇳🇪",
    countryIsoCode: "NE",
    dial_code: "+227"
  },
  {
    name: "Nigeria",
    flag: "🇳🇬",
    countryIsoCode: "NG",
    dial_code: "+234"
  },
  {
    name: "Niue",
    flag: "🇳🇺",
    countryIsoCode: "NU",
    dial_code: "+683"
  },
  {
    name: "Norfolk Island",
    flag: "🇳🇫",
    countryIsoCode: "NF",
    dial_code: "+672"
  },
  {
    name: "Northern Mariana Islands",
    flag: "🇲🇵",
    countryIsoCode: "MP",
    dial_code: "+1670"
  },
  {
    name: "Norway",
    flag: "🇳🇴",
    countryIsoCode: "NO",
    dial_code: "+47"
  },
  {
    name: "Oman",
    flag: "🇴🇲",
    countryIsoCode: "OM",
    dial_code: "+968"
  },
  {
    name: "Pakistan",
    flag: "🇵🇰",
    countryIsoCode: "PK",
    dial_code: "+92"
  },
  {
    name: "Palau",
    flag: "🇵🇼",
    countryIsoCode: "PW",
    dial_code: "+680"
  },
  {
    name: "Palestinian Territory, Occupied",
    flag: "🇵🇸",
    countryIsoCode: "PS",
    dial_code: "+970"
  },
  {
    name: "Panama",
    flag: "🇵🇦",
    countryIsoCode: "PA",
    dial_code: "+507"
  },
  {
    name: "Papua New Guinea",
    flag: "🇵🇬",
    countryIsoCode: "PG",
    dial_code: "+675"
  },
  {
    name: "Paraguay",
    flag: "🇵🇾",
    countryIsoCode: "PY",
    dial_code: "+595"
  },
  {
    name: "Peru",
    flag: "🇵🇪",
    countryIsoCode: "PE",
    dial_code: "+51"
  },
  {
    name: "Philippines",
    flag: "🇵🇭",
    countryIsoCode: "PH",
    dial_code: "+63"
  },
  {
    name: "Pitcairn",
    flag: "🇵🇳",
    countryIsoCode: "PN",
    dial_code: "+64"
  },
  {
    name: "Poland",
    flag: "🇵🇱",
    countryIsoCode: "PL",
    dial_code: "+48"
  },
  {
    name: "Portugal",
    flag: "🇵🇹",
    countryIsoCode: "PT",
    dial_code: "+351"
  },
  {
    name: "Puerto Rico",
    flag: "🇵🇷",
    countryIsoCode: "PR",
    dial_code: "+1939"
  },
  {
    name: "Qatar",
    flag: "🇶🇦",
    countryIsoCode: "QA",
    dial_code: "+974"
  },
  {
    name: "Romania",
    flag: "🇷🇴",
    countryIsoCode: "RO",
    dial_code: "+40"
  },
  {
    name: "Russia",
    flag: "🇷🇺",
    countryIsoCode: "RU",
    dial_code: "+7"
  },
  {
    name: "Rwanda",
    flag: "🇷🇼",
    countryIsoCode: "RW",
    dial_code: "+250"
  },
  {
    name: "Reunion",
    flag: "🇷🇪",
    countryIsoCode: "RE",
    dial_code: "+262"
  },
  {
    name: "Saint Barthelemy",
    flag: "🇧🇱",
    countryIsoCode: "BL",
    dial_code: "+590"
  },
  {
    name: "Saint Helena, Ascension and Tristan Da Cunha",
    flag: "🇸🇭",
    countryIsoCode: "SH",
    dial_code: "+290"
  },
  {
    name: "Saint Kitts and Nevis",
    flag: "🇰🇳",
    countryIsoCode: "KN",
    dial_code: "+1869"
  },
  {
    name: "Saint Lucia",
    flag: "🇱🇨",
    countryIsoCode: "LC",
    dial_code: "+1758"
  },
  {
    name: "Saint Martin",
    flag: "🇲🇫",
    countryIsoCode: "MF",
    dial_code: "+590"
  },
  {
    name: "Saint Pierre and Miquelon",
    flag: "🇵🇲",
    countryIsoCode: "PM",
    dial_code: "+508"
  },
  {
    name: "Saint Vincent and the Grenadines",
    flag: "🇻🇨",
    countryIsoCode: "VC",
    dial_code: "+1784"
  },
  {
    name: "Samoa",
    flag: "🇼🇸",
    countryIsoCode: "WS",
    dial_code: "+685"
  },
  {
    name: "San Marino",
    flag: "🇸🇲",
    countryIsoCode: "SM",
    dial_code: "+378"
  },
  {
    name: "Sao Tome and Principe",
    flag: "🇸🇹",
    countryIsoCode: "ST",
    dial_code: "+239"
  },
  {
    name: "Saudi Arabia",
    flag: "🇸🇦",
    countryIsoCode: "SA",
    dial_code: "+966"
  },
  {
    name: "Senegal",
    flag: "🇸🇳",
    countryIsoCode: "SN",
    dial_code: "+221"
  },
  {
    name: "Serbia",
    flag: "🇷🇸",
    countryIsoCode: "RS",
    dial_code: "+381"
  },
  {
    name: "Seychelles",
    flag: "🇸🇨",
    countryIsoCode: "SC",
    dial_code: "+248"
  },
  {
    name: "Sierra Leone",
    flag: "🇸🇱",
    countryIsoCode: "SL",
    dial_code: "+232"
  },
  {
    name: "Singapore",
    flag: "🇸🇬",
    countryIsoCode: "SG",
    dial_code: "+65"
  },
  {
    name: "Slovakia",
    flag: "🇸🇰",
    countryIsoCode: "SK",
    dial_code: "+421"
  },
  {
    name: "Slovenia",
    flag: "🇸🇮",
    countryIsoCode: "SI",
    dial_code: "+386"
  },
  {
    name: "Solomon Islands",
    flag: "🇸🇧",
    countryIsoCode: "SB",
    dial_code: "+677"
  },
  {
    name: "Somalia",
    flag: "🇸🇴",
    countryIsoCode: "SO",
    dial_code: "+252"
  },
  {
    name: "South Africa",
    flag: "🇿🇦",
    countryIsoCode: "ZA",
    dial_code: "+27"
  },
  {
    name: "South Sudan",
    flag: "🇸🇸",
    countryIsoCode: "SS",
    dial_code: "+211"
  },
  {
    name: "South Georgia and the South Sandwich Islands",
    flag: "🇬🇸",
    countryIsoCode: "GS",
    dial_code: "+500"
  },
  {
    name: "Spain",
    flag: "🇪🇸",
    countryIsoCode: "ES",
    dial_code: "+34"
  },
  {
    name: "Sri Lanka",
    flag: "🇱🇰",
    countryIsoCode: "LK",
    dial_code: "+94"
  },
  {
    name: "Sudan",
    flag: "🇸🇩",
    countryIsoCode: "SD",
    dial_code: "+249"
  },
  {
    name: "Suriname",
    flag: "🇸🇷",
    countryIsoCode: "SR",
    dial_code: "+597"
  },
  {
    name: "Svalbard and Jan Mayen",
    flag: "🇸🇯",
    countryIsoCode: "SJ",
    dial_code: "+47"
  },
  {
    name: "Swaziland",
    flag: "🇸🇿",
    countryIsoCode: "SZ",
    dial_code: "+268"
  },
  {
    name: "Sweden",
    flag: "🇸🇪",
    countryIsoCode: "SE",
    dial_code: "+46"
  },
  {
    name: "Switzerland",
    flag: "🇨🇭",
    countryIsoCode: "CH",
    dial_code: "+41"
  },
  {
    name: "Syrian Arab Republic",
    flag: "🇸🇾",
    countryIsoCode: "SY",
    dial_code: "+963"
  },
  {
    name: "Taiwan",
    flag: "🇹🇼",
    countryIsoCode: "TW",
    dial_code: "+886"
  },
  {
    name: "Tajikistan",
    flag: "🇹🇯",
    countryIsoCode: "TJ",
    dial_code: "+992"
  },
  {
    name: "Tanzania, United Republic of Tanzania",
    flag: "🇹🇿",
    countryIsoCode: "TZ",
    dial_code: "+255"
  },
  {
    name: "Thailand",
    flag: "🇹🇭",
    countryIsoCode: "TH",
    dial_code: "+66"
  },
  {
    name: "Timor-Leste",
    flag: "🇹🇱",
    countryIsoCode: "TL",
    dial_code: "+670"
  },
  {
    name: "Togo",
    flag: "🇹🇬",
    countryIsoCode: "TG",
    dial_code: "+228"
  },
  {
    name: "Tokelau",
    flag: "🇹🇰",
    countryIsoCode: "TK",
    dial_code: "+690"
  },
  {
    name: "Tonga",
    flag: "🇹🇴",
    countryIsoCode: "TO",
    dial_code: "+676"
  },
  {
    name: "Trinidad and Tobago",
    flag: "🇹🇹",
    countryIsoCode: "TT",
    dial_code: "+1868"
  },
  {
    name: "Tunisia",
    flag: "🇹🇳",
    countryIsoCode: "TN",
    dial_code: "+216"
  },
  {
    name: "Turkey",
    flag: "🇹🇷",
    countryIsoCode: "TR",
    dial_code: "+90"
  },
  {
    name: "Turkmenistan",
    flag: "🇹🇲",
    countryIsoCode: "TM",
    dial_code: "+993"
  },
  {
    name: "Turks and Caicos Islands",
    flag: "🇹🇨",
    countryIsoCode: "TC",
    dial_code: "+1649"
  },
  {
    name: "Tuvalu",
    flag: "🇹🇻",
    countryIsoCode: "TV",
    dial_code: "+688"
  },
  {
    name: "Uganda",
    flag: "🇺🇬",
    countryIsoCode: "UG",
    dial_code: "+256"
  },
  {
    name: "Ukraine",
    flag: "🇺🇦",
    countryIsoCode: "UA",
    dial_code: "+380"
  },
  {
    name: "United Arab Emirates",
    flag: "🇦🇪",
    countryIsoCode: "AE",
    dial_code: "+971"
  },
  {
    name: "United Kingdom",
    flag: "🇬🇧",
    countryIsoCode: "GB",
    dial_code: "+44"
  },
  {
    name: "United States",
    flag: "🇺🇸",
    countryIsoCode: "US",
    dial_code: "+1"
  },
  {
    name: "Uruguay",
    flag: "🇺🇾",
    countryIsoCode: "UY",
    dial_code: "+598"
  },
  {
    name: "Uzbekistan",
    flag: "🇺🇿",
    countryIsoCode: "UZ",
    dial_code: "+998"
  },
  {
    name: "Vanuatu",
    flag: "🇻🇺",
    countryIsoCode: "VU",
    dial_code: "+678"
  },
  {
    name: "Venezuela, Bolivarian Republic of Venezuela",
    flag: "🇻🇪",
    countryIsoCode: "VE",
    dial_code: "+58"
  },
  {
    name: "Vietnam",
    flag: "🇻🇳",
    countryIsoCode: "VN",
    dial_code: "+84"
  },
  {
    name: "Virgin Islands, British",
    flag: "🇻🇬",
    countryIsoCode: "VG",
    dial_code: "+1284"
  },
  {
    name: "Virgin Islands, U.S.",
    flag: "🇻🇮",
    countryIsoCode: "VI",
    dial_code: "+1340"
  },
  {
    name: "Wallis and Futuna",
    flag: "🇼🇫",
    countryIsoCode: "WF",
    dial_code: "+681"
  },
  {
    name: "Yemen",
    flag: "🇾🇪",
    countryIsoCode: "YE",
    dial_code: "+967"
  },
  {
    name: "Zambia",
    flag: "🇿🇲",
    countryIsoCode: "ZM",
    dial_code: "+260"
  },
  {
    name: "Zimbabwe",
    flag: "🇿🇼",
    countryIsoCode: "ZW",
    dial_code: "+263"
  }
];

country_list.map((ele, i) => {
  if (i > 0) {
    ele.label = `${ele.flag} ${ele.name} (${ele.dial_code})`;
    ele.value = `${ele.dial_code}`;
  }
  return true;
});

export default country_list;
