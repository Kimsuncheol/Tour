import { useEffect, useState } from 'react';

declare global {
  interface Window {
    Kakao: any;
  }
}

export function useKakaoSDK(appKey: string) {
  const [kakaoInitialized, setKakaoInitialized] = useState(false);

  useEffect(() => {
    // Load Kakao SDK
    const script = document.createElement('script');
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js';
    script.integrity = 'sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4';
    script.crossOrigin = 'anonymous';
    script.async = true;

    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(appKey);
        setKakaoInitialized(true);
        console.log('Kakao SDK initialized:', window.Kakao.isInitialized());
      }
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [appKey]);

  const shareViaKakao = (options: {
    title: string;
    description: string;
    imageUrl: string;
    url: string;
  }) => {
    if (!kakaoInitialized || !window.Kakao) {
      alert('Kakao SDK is not loaded yet. Please try again.');
      return;
    }

    try {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: options.title,
          description: options.description,
          imageUrl: options.imageUrl,
          link: {
            mobileWebUrl: options.url,
            webUrl: options.url,
          },
        },
        buttons: [
          {
            title: 'View Contact',
            link: {
              mobileWebUrl: options.url,
              webUrl: options.url,
            },
          },
        ],
      });
    } catch (error) {
      console.error('Kakao share error:', error);
      alert('Failed to share via KakaoTalk. Please check the console for details.');
    }
  };

  return { kakaoInitialized, shareViaKakao };
}
