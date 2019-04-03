// ==UserScript==
// @name        Testlio Cycle to calendar
// @namespace   SAMS
// @include     https://platform.testlio.com/c/*
// @version     1.1.1
// @grant       none
// @run-at      document-idle
// ==/UserScript==




if (document.readyState === 'complete') {
	putCalendar();
} else {
	document.onreadystatechange = function () {
  	if (document.readyState === 'complete') {
    	putCalendar();
		}
	}
}

function putCalendar()
{
  var ProjectInfos = document.getElementsByClassName('project-header-name');
  if (ProjectInfos.length == 1)
  {
    var UserId = document.getElementById('profile-icon-link').getElementsByTagName('img')[0].getAttribute('src').split('/')[4];
    var ProjectInfo = ProjectInfos[0];
    var ProjectName = encodeURIComponent(ProjectInfo.innerText);
    var ProjectURL = encodeURIComponent (ProjectInfo.href);
    var Cycles = document.getElementById('test-cycles').getElementsByClassName('report-row');

    for (var Cycle of Cycles)
    {
      var CycleInfo = Cycle.getElementsByClassName('report-row__container')[0].getElementsByTagName('div')[1];
      var CycleInfoData = CycleInfo.innerText;
      var CycleNumber = encodeURIComponent (CycleInfoData.split(' ')[0]);
      var CycleDates = CycleInfoData.replace(/\./g,':').slice(CycleInfoData.indexOf(' ')).split('-');
      var startdate=thatsugly(CycleDates[0]);
      var enddate=thatsugly(CycleDates[1]);
      var currentYear=(new Date()).getFullYear();

      startdate=new Date((startdate.includes(','))?
      startdate.replace(',',' '+((enddate.includes(','))?currentYear:enddate.split(' ')[2])):
      startdate);
      enddate=new Date((enddate.includes(','))?
      enddate.replace(',',' '+currentYear):
      enddate);


      var TestlionCycleInfo = '?';
      var CycleDuration = '?';
      var Avatars = Cycle.getElementsByClassName('report-row__avatar');
      for (var Avatar of Avatars)
      {
        if (Avatar.getAttribute('data-uid')==UserId)
        {
          TestlionCycleInfo = Avatar.getAttribute('data-original-title').match(/\((.*)\)/)[1];
          CycleDuration = encodeURIComponent(TestlionCycleInfo.split(',')[0]);
          Cycle.getElementsByClassName('cycle-row__number')[0].innerHTML += '<a href="'+'https://calendar.google.com/calendar/r/eventedit?&text=T'+CycleNumber+'%20('+CycleDuration+')%20'+ProjectName+'&dates='+startdate.toISOString().replace(/-|:|(\.000)/g,'')+'/'+enddate.toISOString().replace(/-|:|(\.000)/g,'')+'&details='+ProjectURL+'%0A'+TestlionCycleInfo+'" target="_blank">\
        <svg width="13px" height="13px" viewBox="0 0 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid"> \t\t  <g>\t\t\t <path d="M67.8521,9.3669 C69.7871,9.0529 71.8821,9.0209 73.6951,9.8769 C76.3791,10.9589 78.2781,13.5289 78.9281,16.2989 C79.1491,18.2689 79.0851,20.3569 78.1531,22.1559 C76.4611,25.8749 71.9601,28.0199 68.0091,26.9889 C63.9551,26.0819 60.9381,22.1809 60.9771,18.0369 C60.8991,14.0039 63.9861,10.3199 67.8521,9.3669" fill="#FFFFFF"></path>\t\t\t <path d="M183.8081,9.3527 C185.7681,9.0457 187.8811,9.0417 189.7011,9.9417 C192.7141,11.2697 194.7551,14.4137 194.9731,17.6727 C194.9701,20.1817 194.1311,22.8017 192.2711,24.5577 C190.6901,26.2247 188.4121,27.1457 186.1391,27.2487 C182.6201,27.2987 179.0721,25.1967 177.6941,21.9137 C176.8021,20.1607 176.9121,18.1407 177.0271,16.2417 C177.6941,12.8937 180.4991,10.1267 183.8081,9.3527" fill="#FFFFFF"></path>\t\t\t <path d="M172.1724,146.4318 C176.7584,146.4108 181.3454,146.4068 185.9284,146.4318 C185.8714,164.6608 185.9184,182.8928 185.9074,201.1208 C181.3384,201.1208 176.7694,201.1248 172.1974,201.1178 C172.1864,182.8888 172.2364,164.6608 172.1724,146.4318" fill="#FFFFFF"></path>\t\t\t <path d="M183.8081,9.3527 C180.4991,10.1267 177.6941,12.8937 177.0271,16.2417 C176.9121,18.1407 176.8021,20.1607 177.6941,21.9137 C179.0721,25.1967 182.6201,27.2987 186.1391,27.2487 C188.4121,27.1457 190.6901,26.2247 192.2711,24.5577 C194.1311,22.8017 194.9701,20.1817 194.9731,17.6727 C194.7551,14.4137 192.7141,11.2697 189.7011,9.9417 C187.8811,9.0417 185.7681,9.0457 183.8081,9.3527 M67.8521,9.3667 C63.9861,10.3197 60.8991,14.0037 60.9771,18.0367 C60.9381,22.1807 63.9541,26.0817 68.0091,26.9887 C71.9601,28.0197 76.4611,25.8747 78.1531,22.1557 C79.0851,20.3567 79.1491,18.2687 78.9281,16.2987 C78.2781,13.5287 76.3791,10.9587 73.6951,9.8767 C71.8821,9.0207 69.7871,9.0527 67.8521,9.3667 M23.4851,1.3967 C26.3771,0.1297 29.5751,-0.0633 32.6911,0.0157 C96.9421,0.0227 161.1931,0.0157 225.4441,0.0117 C232.4541,-0.1053 239.2831,4.2277 242.1171,10.6477 C243.3121,13.1787 243.8191,15.9877 243.7691,18.7787 C243.7411,25.0257 243.8331,31.2717 243.7331,37.5147 C241.6601,36.7257 239.4251,36.5157 237.2231,36.5007 C164.5231,36.5157 91.8241,36.5077 19.1241,36.5117 C16.8221,36.5727 14.4661,36.6717 12.2921,37.5187 C12.1991,31.0287 12.2491,24.5407 12.2281,18.0547 C12.1851,10.9017 16.8431,4.0347 23.4851,1.3967" fill="#C7C7C7"></path>\t\t\t <path d="M182.7305,91.7146 C183.7585,91.2896 184.8785,91.3116 185.9675,91.3966 C185.9035,109.6866 185.9755,127.9786 185.9325,146.2676 L185.9285,146.4316 C181.3455,146.4066 176.7585,146.4106 172.1725,146.4316 L172.1725,146.2716 C172.1655,133.6256 172.1615,120.9836 172.1755,108.3366 C163.0315,111.3776 153.9045,114.4686 144.7565,117.4916 C144.7285,113.3626 144.7775,109.2326 144.7315,105.1036 C157.3815,100.5946 170.0735,96.1976 182.7305,91.7146" fill="#C7C7C7"></path>\t\t\t <path d="M70.8325,98.2858 C76.5615,93.9208 83.7315,91.6648 90.8925,91.3968 C97.9955,91.1468 105.3475,92.2958 111.5615,95.9048 C116.4775,98.7208 120.3675,103.2288 122.4875,108.4758 C124.6005,113.7158 125.2715,119.5088 124.6295,125.1088 C123.2545,134.0788 116.3275,141.3248 108.2315,144.9078 C109.3885,145.2578 110.5165,145.6968 111.5945,146.2428 C110.8835,146.3788 110.1665,146.4568 109.4455,146.4358 C99.8945,146.3678 90.3425,146.4998 80.7975,146.3708 C80.7625,144.2978 80.7125,142.2208 80.8445,140.1498 C87.7295,139.9858 94.9935,140.8278 101.4355,137.8088 C106.7285,135.5748 110.6655,130.5128 111.4125,124.7988 C112.0545,119.3548 111.5045,113.4018 108.2785,108.7938 C105.7405,105.1458 101.4395,103.1258 97.1385,102.4868 C91.3345,101.6768 84.9705,102.2548 80.0985,105.7778 C75.3015,109.1508 72.7635,115.1038 72.8845,120.8828 C68.4655,121.0008 64.0435,120.9108 59.6215,120.9258 C59.7075,118.4988 59.8925,116.0568 60.5245,113.7048 C62.0445,107.5768 65.7965,102.0688 70.8325,98.2858" fill="#C7C7C7"></path>\t\t\t <path d="M12.292,37.5183 C14.466,36.6723 16.822,36.5723 19.124,36.5113 C91.824,36.5083 164.523,36.5153 237.223,36.5003 C239.425,36.5153 241.66,36.7263 243.733,37.5143 C250.016,39.7813 255.105,45.5993 255.762,52.3383 C254.484,47.7193 251.722,43.4213 247.592,40.8763 C244.601,39.0103 241.11,37.9323 237.577,37.9643 C164.645,38.0143 91.709,38.0143 18.774,38.0143 C13.281,37.9143 7.745,40.2843 4.244,44.5603 C2.544,46.3773 1.656,48.7223 0.467,50.8603 C1.645,44.7143 6.453,39.5923 12.292,37.5183" fill="#4483EF"></path>\t\t\t <path d="M171.9155,146.2927 L172.1725,146.2717 L172.1725,146.4317 C172.2365,164.6607 172.1865,182.8887 172.1975,201.1177 C176.7695,201.1247 181.3385,201.1217 185.9075,201.1217 C185.9175,182.8927 185.8715,164.6607 185.9285,146.4317 L185.9325,146.2677 L186.1535,146.2857 C188.1695,146.5287 190.2045,146.3817 192.2315,146.4037 C209.4115,146.3927 226.5935,146.3717 243.7725,146.4037 C245.7575,175.1327 247.6235,203.8697 249.5875,232.5987 C249.7795,235.8827 250.1975,239.2557 249.2875,242.4757 L249.2055,242.5787 C248.3625,243.5247 247.8775,244.7027 247.2745,245.8017 C244.0515,251.0627 238.0615,254.6037 231.8515,254.5437 C163.3165,254.5037 94.7865,254.5747 26.2555,254.5497 C24.1065,254.5497 21.9155,254.6607 19.8195,254.0967 C15.0835,252.8047 10.7895,249.7027 8.4055,245.3667 C7.9055,244.4167 7.4415,243.4427 6.7735,242.5997 L6.6885,242.4817 C5.5425,238.1777 6.4745,233.7157 6.6175,229.3547 C8.5015,201.7207 10.2965,174.0767 12.2065,146.4427 C35.0465,146.3857 57.8905,146.4107 80.7295,146.4287 C80.7515,147.7417 80.7625,149.0557 80.7445,150.3687 C87.9825,150.5077 95.5575,149.6407 102.4135,152.5067 C107.0425,154.3137 110.8445,158.1827 112.3085,162.9617 C113.9215,168.2507 113.7355,174.1047 111.8405,179.2987 C110.0735,184.1667 105.8405,187.9287 100.8965,189.3817 C94.8935,191.1587 88.2075,191.0057 82.4255,188.5247 C77.9245,186.6017 74.2515,182.7247 72.8635,177.9997 C72.2035,175.9177 71.9465,173.7297 71.9065,171.5567 C67.5305,171.5847 63.1545,171.5747 58.7785,171.5607 C58.8605,177.0957 60.2035,182.7177 63.2935,187.3647 C66.5885,192.4477 71.6995,196.1597 77.3005,198.3367 C84.3995,201.1067 92.2445,201.7247 99.7505,200.5747 C107.0505,199.4187 114.1995,196.1487 119.1575,190.5557 C123.7115,185.5017 126.0675,178.7417 126.3775,171.9997 C126.7955,165.5637 125.3145,158.8037 121.2275,153.6917 C118.9295,150.6657 115.7695,148.4807 112.5435,146.5607 C114.1135,146.3647 115.6985,146.4067 117.2795,146.4147 C133.4635,146.3997 149.6465,146.4177 165.8295,146.4067 C167.8565,146.3647 169.8945,146.5317 171.9155,146.2927" fill="#4483EF"></path>\t\t\t <path d="M4.2437,44.5603 C7.7447,40.2843 13.2807,37.9143 18.7737,38.0143 C91.7097,38.0143 164.6447,38.0143 237.5767,37.9643 C241.1097,37.9323 244.6007,39.0103 247.5917,40.8763 C251.7217,43.4213 254.4847,47.7193 255.7627,52.3383 C256.1157,53.9693 256.0187,55.6613 255.8337,57.3103 C251.8717,86.9893 247.7637,116.6493 243.8547,146.3353 C227.3687,146.3073 210.8817,146.3503 194.3987,146.3323 C191.6497,146.3103 188.8977,146.4353 186.1537,146.2863 L185.9317,146.2683 C185.9747,127.9783 185.9037,109.6863 185.9677,91.3963 C184.8787,91.3113 183.7587,91.2893 182.7307,91.7143 C170.0737,96.1973 157.3817,100.5953 144.7317,105.1033 C144.7777,109.2323 144.7277,113.3623 144.7567,117.4923 C153.9047,114.4693 163.0317,111.3773 172.1757,108.3363 C172.1617,120.9833 172.1647,133.6253 172.1727,146.2713 L171.9157,146.2923 C152.7587,146.4353 133.5957,146.2963 114.4387,146.3683 C113.4927,146.3463 112.4937,146.6393 111.5947,146.2433 C110.5157,145.6973 109.3887,145.2583 108.2317,144.9083 C116.3267,141.3243 123.2547,134.0793 124.6297,125.1093 C125.2717,119.5093 124.6007,113.7163 122.4877,108.4763 C120.3677,103.2293 116.4767,98.7213 111.5617,95.9053 C105.3477,92.2963 97.9947,91.1473 90.8917,91.3963 C83.7317,91.6643 76.5607,93.9203 70.8327,98.2863 C65.7967,102.0693 62.0447,107.5763 60.5247,113.7053 C59.8927,116.0573 59.7067,118.4983 59.6207,120.9263 C64.0437,120.9113 68.4657,121.0003 72.8847,120.8833 C72.7637,115.1043 75.3017,109.1503 80.0987,105.7773 C84.9707,102.2543 91.3347,101.6763 97.1387,102.4863 C101.4397,103.1253 105.7407,105.1453 108.2787,108.7933 C111.5047,113.4013 112.0547,119.3553 111.4117,124.7983 C110.6657,130.5133 106.7287,135.5743 101.4357,137.8093 C94.9937,140.8283 87.7297,139.9863 80.8447,140.1503 L80.6737,140.1533 C80.7447,142.2273 80.6627,144.3053 80.7197,146.3823 C57.8687,146.3463 35.0147,146.3393 12.1607,146.3853 C8.2627,117.3063 4.3047,88.2343 0.3857,59.1593 C-0.0653,56.4173 -0.2183,53.5733 0.4677,50.8603 C1.6557,48.7223 2.5447,46.3773 4.2437,44.5603" fill="#3664D0"></path>\t\t\t <path d="M6.7739,242.5998 C7.4409,243.4428 7.9059,244.4168 8.4049,245.3668 C10.7899,249.7028 15.0839,252.8048 19.8199,254.0968 C21.9149,254.6608 24.1069,254.5498 26.2549,254.5498 C94.7859,254.5748 163.3169,254.5038 231.8509,254.5428 C238.0619,254.6038 244.0509,251.0628 247.2739,245.8018 C247.8779,244.7028 248.3629,243.5248 249.2049,242.5788 C247.6919,248.4358 242.9809,253.2968 237.2199,255.1028 C234.0069,256.2248 230.5629,255.9418 227.2259,255.9778 C160.4759,255.9778 93.7259,255.9748 26.9769,255.9748 C24.3139,255.9958 21.5899,256.0208 19.0269,255.1888 C13.1519,253.4468 8.3229,248.5388 6.7739,242.5998" fill="#3664D0"></path>\t\t  </g>     </svg>\
        ';
        }
      }
    }
  }
}
function thatsugly(uglything)
{
	return uglything.trim().replace('am',(uglything.includes(':'))?' am':':00 am').replace('pm',(uglything.includes(':'))?' pm':':00 pm');
}
