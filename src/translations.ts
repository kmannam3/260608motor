import { TranslationSet } from './types';

export const translations: Record<'KO' | 'EN', TranslationSet> = {
  KO: {
    header: {
      products: 'Products',
      types: 'Motor Types',
      strengths: 'Strengths',
      applications: 'Applications',
      contact: 'Contact'
    },
    hero: {
      tag: 'INDUSTRIAL GRADE PRECISION',
      titleLine1: '1mm의 오차도 없는\n완벽한 구동,',
      titleHighlight: '산업용 모터 주문 생산',
      titleLine2: '전문 기업 motor',
      subtitle: '설계부터 제작, 테스트까지 - 귀사의 장비에 딱 맞춘 맞춤형 고효율 모터 솔루션을 제공합니다. 전 세계 산업 현장의 심장을 만듭니다.',
      ctaPrimary: '무료 견적 및 설계 상담 신청하기',
      ctaSecondary: '적용사례'
    },
    advantages: {
      tag: 'ADVANTAGES',
      title: 'Why choose motor?',
      subtitle: '글로벌 규격 준수와 독보적인 기술력으로 산업용 솔루션의 기준을 제시합니다.',
      list: {
        customization: {
          title: 'Customization',
          desc: '100% 맞춤 설계 - 특수 규격, 고출력 완벽 제작. 표준 모델로 해결되지 않는 극한의 환경까지 고려합니다.'
        },
        energy: {
          title: 'Energy Efficiency',
          desc: '최고 등급 에너지 효율 - RE100/ESG 충족. 운영 비용 절감과 탄소 배출 감소를 위한 최적의 설계를 제안합니다.'
        },
        reliability: {
          title: 'Reliability',
          desc: '철저한 품질 검증 - 가혹 환경 테스트 및 성적서 발행. 진동, 열, 내구성에 대한 무결성을 보장합니다.'
        }
      }
    },
    products: {
      tag: 'PRECISION LINEUP',
      title: 'Our Products',
      list: {
        lvhv: {
          title: 'LV/HV Motors',
          tag: 'SERIES-X',
          desc: '고압 및 저압 환경에 최적화된 고출력 산업용 구동계의 표준 모델입니다.'
        },
        explosion: {
          title: 'Explosion Proof',
          tag: 'ATEX_CERT',
          desc: '화학, 가스 등 가혹하고 위험한 환경에서도 절대적 안전을 보장하는 방폭형 모터입니다.'
        },
        pm: {
          title: 'Permanent Magnet',
          tag: 'ULTRA_EFF',
          desc: '최신 영구자석 기술을 적용하여 소형화와 극강의 효율을 동시에 달성한 모터입니다.'
        }
      },
      specsLink: 'SPECIFICATIONS'
    },
    impact: {
      tag: 'USE CASES',
      title: 'Beyond Motion:\nReal World Impact',
      list: {
        pumps: {
          title: 'Pumps & Fans',
          desc: '플랜트 및 산업용 송풍 시스템의 안정적 구동'
        },
        automation: {
          title: 'Automation Lines',
          desc: '정밀 제어가 필요한 자동화 생산 공정'
        },
        renewable: {
          title: 'Renewable Energy',
          desc: '풍력 및 수력 발전 시스템의 핵심 발전 엔진'
        }
      },
      smartFactory: 'SMART FACTORY',
      infrastructure: 'INFRASTRUCTURE'
    },
    consulting: {
      tag: 'RESOURCES & CONSULTING',
      title: '기성 모터 적용 실패 사례 분석 및 맞춤형 모터 설계 가이드북 무료 신청',
      desc: '수천 건의 프로젝트 데이터를 바탕으로 한 실패 방지 체크리스트와 최신 모터 설계 트렌드를 보내드립니다. 전문가와의 1:1 상담도 함께 신청 가능합니다.',
      bullet1: '모터 부적합 설치로 인한 고장 사례 50선 포함',
      bullet2: '에너지 효율 IE4 달성을 위한 구조 개선 가이드',
      form: {
        name: '성함',
        namePlaceholder: '홍길동',
        contact: '연락처/이메일',
        contactPlaceholder: '010-0000-0000 / info@domain',
        specs: '필요 사양 (전압, 출력, 용도 등)',
        specsPlaceholder: '예: 380V, 750kW, 펌프 구동용 맞춤 제작 문의',
        consent: '개인정보 수집 및 이용에 동의합니다.',
        submitBtn: '무료 진단 및 가이드북 받기',
        successMsg: '감사합니다. 신청이 정상적으로 완료되었습니다.',
        errorMsg: '오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
        consentError: '개인정보 수집 및 이용에 동의해야 합니다.'
      }
    },
    location: {
      tag: 'LOCATION',
      title: '찾아오시는 길',
      addressLabel: '주소',
      addressVal: '서울특별시 강남구 테헤란로 123, 모터 타워 15층',
      phoneLabel: '전화번호',
      phoneVal: '02-123-4567',
      emailLabel: '이메일',
      emailVal: 'contact@motor-industrial.com'
    }
  },
  EN: {
    header: {
      products: 'Products',
      types: 'Motor Types',
      strengths: 'Strengths',
      applications: 'Applications',
      contact: 'Contact'
    },
    hero: {
      tag: 'INDUSTRIAL GRADE PRECISION',
      titleLine1: 'Flawless Operations\nwith 1mm Precision,',
      titleHighlight: 'Custom Motor Manufacturing',
      titleLine2: 'Partner: motor',
      subtitle: 'From design to manufacturing and rigorous testing - we deliver bespoke, high-efficiency motor solutions tailored perfectly to your industrial equipment. Powering the heart of global factories.',
      ctaPrimary: 'Request Free Consulting & Estimate',
      ctaSecondary: 'Case Studies'
    },
    advantages: {
      tag: 'ADVANTAGES',
      title: 'Why choose motor?',
      subtitle: 'Setting the international benchmark through strict global standards and authoritative engineering expertise.',
      list: {
        customization: {
          title: 'Customization',
          desc: '100% bespoke engineering. We excel in custom specifications and high-power fabrication designed specifically for environments exceeding standard limits.'
        },
        energy: {
          title: 'Energy Efficiency',
          desc: 'Peak efficiency architectures meeting RE100 and ESG demands. We propose custom layouts to reduce operational costs and minimize carbon emissions.'
        },
        reliability: {
          title: 'Reliability',
          desc: 'Meticulous verification including extreme stress tests and accredited testing certificates. Absolute structural integrity against heat, vibration, and friction.'
        }
      }
    },
    products: {
      tag: 'PRECISION LINEUP',
      title: 'Our Products',
      list: {
        lvhv: {
          title: 'LV/HV Motors',
          tag: 'SERIES-X',
          desc: 'Our standard high-capacity motor designed for premium performance in high and low voltage systems alike.'
        },
        explosion: {
          title: 'Explosion Proof',
          tag: 'ATEX_CERT',
          desc: 'Intrinsically safe explosion-proof series engineered specifically for hazardous gas, vapor, and chemical installations.'
        },
        pm: {
          title: 'Permanent Magnet',
          tag: 'ULTRA_EFF',
          desc: 'Leverages cutting-edge permanent magnet technology to achieve ultra-compact, high-density power with maximum efficiency.'
        }
      },
      specsLink: 'SPECIFICATIONS'
    },
    impact: {
      tag: 'USE CASES',
      title: 'Beyond Motion:\nReal World Impact',
      list: {
        pumps: {
          title: 'Pumps & Fans',
          desc: 'Perfect steady-state control systems for heavy ventilation and plant pipelines.'
        },
        automation: {
          title: 'Automation Lines',
          desc: 'Microprecision controls tailored for modern physical assembly lines.'
        },
        renewable: {
          title: 'Renewable Energy',
          desc: 'High-fidelity generator models at the heart of wind and hydro power plants.'
        }
      },
      smartFactory: 'SMART FACTORY',
      infrastructure: 'INFRASTRUCTURE'
    },
    consulting: {
      tag: 'RESOURCES & CONSULTING',
      title: 'Request a Free Guide on Custom Motor Specification Pitfalls & Avoid Layout Disasters',
      desc: 'Avoid catastrophic physical layout mistakes. Receive our checklist of 50 common structural motor errors and modern high-efficiency design templates compiled from thousands of customized orders.',
      bullet1: 'Includes 50 real-life motor breakdown and placement cases',
      bullet2: 'IE4/IE5 efficiency layout optimization roadmap',
      form: {
        name: 'Full Name',
        namePlaceholder: 'John Doe',
        contact: 'Phone / Email',
        contactPlaceholder: '+1-555-0199 / email@domain.com',
        specs: 'Desired Specifications (Voltage, Output, Application)',
        specsPlaceholder: 'e.g., 380V, 750kW, custom specifications for pump system',
        consent: 'I agree to the collection and use of my contact information.',
        submitBtn: 'Get Free Diagnostic & Guidebook',
        successMsg: 'Thank you! Your inquiries were submitted successfully.',
        errorMsg: 'An unexpected system error occurred. Please try again soon.',
        consentError: 'You must check and agree to data collection policy.'
      }
    },
    location: {
      tag: 'LOCATION',
      title: 'Find Our Office',
      addressLabel: 'Address',
      addressVal: '15F, Motor Tower, 123 Teheran-ro, Gangnam-gu, Seoul, Republic of Korea',
      phoneLabel: 'Tel',
      phoneVal: '+82-2-123-4567',
      emailLabel: 'Email',
      emailVal: 'contact@motor-industrial.com'
    }
  }
};
