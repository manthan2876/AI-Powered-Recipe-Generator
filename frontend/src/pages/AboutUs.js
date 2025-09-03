import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const AboutUs = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  
  const getContent = () => {
    switch(language) {
      case 'hi':
        return {
          title: 'हमारे बारे में',
          intro: 'AI-पावर्ड रेसिपी जेनरेटर में आपका स्वागत है, जहां हम आपके रसोई के अनुभव को बदलने के लिए कृत्रिम बुद्धिमत्ता का उपयोग करते हैं।',
          mission: 'हमारा मिशन',
          missionText: 'हमारा मिशन आपके फ्रिज में मौजूद सामग्री के आधार पर स्वादिष्ट, पौष्टिक और अनुकूलित व्यंजनों का सुझाव देकर घर पर खाना पकाने को आसान और अधिक आनंददायक बनाना है।',
          howItWorks: 'यह कैसे काम करता है',
          howItWorksText: 'हमारा AI इंजन आपके द्वारा प्रदान की गई सामग्री, आहार संबंधी प्राथमिकताओं और स्वाद प्राथमिकताओं के आधार पर व्यंजनों का सुझाव देता है। हमारा एल्गोरिदम लगातार सीखता और अनुकूलित होता है ताकि आपको बेहतर और अधिक व्यक्तिगत सिफारिशें मिल सकें।',
          team: 'हमारी टीम',
          teamText: 'हमारी विविध टीम में शेफ, डेवलपर्स, AI विशेषज्ञ और खाद्य उत्साही शामिल हैं जो आपके लिए सर्वोत्तम अनुभव बनाने के लिए प्रतिबद्ध हैं।',
          contact: 'संपर्क करें',
          contactText: 'प्रतिक्रिया या प्रश्नों के लिए, हमें support@airecipegenerator.com पर ईमेल करें।'
        };
      case 'gu':
        return {
          title: 'અમારા વિશે',
          intro: 'AI-પાવર્ડ રેસિપી જનરેટરમાં આપનું સ્વાગત છે, જ્યાં અમે તમારા રસોડાના અનુભવને બદલવા માટે કૃત્રિમ બુદ્ધિનો ઉપયોગ કરીએ છીએ.',
          mission: 'અમારું મિશન',
          missionText: 'અમારું મિશન તમારા ફ્રિજમાં હાજર સામગ્રીના આધારે સ્વાદિષ્ટ, પૌષ્ટિક અને અનુકૂલિત વ્યંજનોનું સૂચન કરીને ઘરે રાંધવાનું સરળ અને વધુ આનંદદાયક બનાવવાનું છે.',
          howItWorks: 'આ કેવી રીતે કામ કરે છે',
          howItWorksText: 'અમારું AI એન્જિન તમે પ્રદાન કરેલી સામગ્રી, આહાર સંબંધિત પસંદગીઓ અને સ્વાદ પસંદગીઓના આધારે વ્યંજનોનું સૂચન કરે છે. અમારો એલ્ગોરિધમ સતત શીખે છે અને અનુકૂલિત થાય છે જેથી તમને વધુ સારી અને વધુ વ્યક્તિગત ભલામણો મળી શકે.',
          team: 'અમારી ટીમ',
          teamText: 'અમારી વિવિધ ટીમમાં શેફ, ડેવલપર્સ, AI નિષ્ણાતો અને ફૂડ એન્થ્યુસિયાસ્ટ્સ શામિલ છે જેઓ તમારા માટે શ્રેષ્ઠ અનુભવ બનાવવા માટે પ્રતિબદ્ધ છે.',
          contact: 'સંપર્ક કરો',
          contactText: 'પ્રતિક્રિયા અથવા પ્રશ્નો માટે, અમને support@airecipegenerator.com પર ઇમેઇલ કરો.'
        };
      default: // English
        return {
          title: 'About Us',
          intro: 'Welcome to AI-Powered Recipe Generator, where we use artificial intelligence to transform your kitchen experience.',
          mission: 'Our Mission',
          missionText: 'Our mission is to make home cooking easier and more enjoyable by suggesting delicious, nutritious, and personalized recipes based on the ingredients you have in your fridge.',
          howItWorks: 'How It Works',
          howItWorksText: 'Our AI engine suggests recipes based on the ingredients you provide, dietary preferences, and taste preferences. Our algorithm continuously learns and adapts to provide you with better and more personalized recommendations.',
          team: 'Our Team',
          teamText: 'Our diverse team includes chefs, developers, AI specialists, and food enthusiasts committed to creating the best experience for you.',
          contact: 'Contact Us',
          contactText: 'For feedback or questions, email us at support@airecipegenerator.com.'
        };
    }
  };
  
  const content = getContent();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className={`text-3xl md:text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-dark'}`}>
        {content.title}
      </h1>
      
      <div className={`mb-12 text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
        <p>{content.intro}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className={`bg-white rounded-xl shadow-md p-6 ${theme === 'dark' ? 'bg-gray-800 text-white' : ''}`}>
          <h2 className="text-2xl font-semibold mb-4">{content.mission}</h2>
          <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>{content.missionText}</p>
        </div>
        
        <div className={`bg-white rounded-xl shadow-md p-6 ${theme === 'dark' ? 'bg-gray-800 text-white' : ''}`}>
          <h2 className="text-2xl font-semibold mb-4">{content.howItWorks}</h2>
          <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>{content.howItWorksText}</p>
        </div>
      </div>
      
      <div className={`bg-white rounded-xl shadow-md p-6 mb-8 ${theme === 'dark' ? 'bg-gray-800 text-white' : ''}`}>
        <h2 className="text-2xl font-semibold mb-4">{content.team}</h2>
        <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>{content.teamText}</p>
      </div>
      
      <div className={`bg-white rounded-xl shadow-md p-6 ${theme === 'dark' ? 'bg-gray-800 text-white' : ''}`}>
        <h2 className="text-2xl font-semibold mb-4">{content.contact}</h2>
        <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>{content.contactText}</p>
      </div>
    </div>
  );
};

export default AboutUs;