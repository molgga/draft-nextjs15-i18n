declare global {
  interface Navigator {
    msMaxTouchPoints?: number;
  }
}

interface AgentMatch {
  is: boolean;
  versionName: string;
  versionCode: number;
}

/**
 * 터치 디바이스인지 여부.
 * @param maxTouchPoints 터치 포인트. 지정안하면 navigator 값으로 판단.
 */
export function isTouchDevice(navigator?: Navigator) {
  const { maxTouchPoints = 0, userAgent = '' } = navigator || {};
  const msMaxTouchPoints = navigator?.msMaxTouchPoints || 0;
  return (
    parsePlatformAOS(userAgent).is ||
    parsePlatformIOS(userAgent).is ||
    (typeof window !== 'undefined' ? 'ontouchstart' in window : false) ||
    maxTouchPoints > 0 ||
    msMaxTouchPoints > 0
  );
}

/**
 * 위메프앱 인지
 * @param agent User-Agent
 */
export function parseApp(agent: string) {
  return toVersionMatch(agent, /hello-myapp\/(\d+.\d+.\d+)/i);
}

/**
 * AOS 인지
 * @param agent User-Agent
 */
export function parsePlatformAOS(agent: string) {
  return toVersionMatch(agent, /Android ([._\d]+)/i);
}

/**
 * iOS 인지
 * @param agent User-Agent
 */
export function parsePlatformIOS(agent: string) {
  if (/iP(hone|od|ad)/i.test(agent)) {
    return toVersionMatch(agent, /OS\s(\d+_\d+_?\d?)/i, '_');
  } else {
    return toVersionEmpty();
  }
}

/**
 * 정규식으로 매칭 여부, 버전 판단
 */
function toVersionMatch(
  agent: string,
  reg: RegExp,
  versionSplit = '.'
): AgentMatch {
  const matched = agent.match(reg);
  if (matched) {
    const { versionName, versionCode } = toVersionNameCode(
      matched[1].split(versionSplit) || []
    );
    return { is: true, versionName, versionCode };
  } else {
    return toVersionEmpty();
  }
}

/**
 * 매칭 안될때 기본값
 */
function toVersionEmpty(): AgentMatch {
  return { is: false, versionName: '', versionCode: 0 };
}

/**
 * 버전 name, code 분리
 * versionName: 버전 문자열 major.minor.patch
 * versionCode: 버전 코드 (major * 10000) + (minor * 1000) + path
 * 예)
 * 만약 7.1.0 보다 하위/상위 버전 판단하려면 70100 = (7 * 10000) + (1 * 100) + 0
 * A = { versionName: '6.1.3', versionCode: 60103 }
 * B = { versionName: '7.2.0', versionCode: 70200 }
 * 70100 <= A.versionCode // A는 하위 버전
 * 70100 <= B.versionCode // B는 상위 버전
 */
function toVersionNameCode(codes: string[]) {
  const ver1 = parseInt(codes[0] || '0');
  const ver2 = parseInt(codes[1] || '0');
  const ver3 = parseInt(codes[2] || '0');
  return {
    versionName: `${ver1}.${ver2}.${ver3}`,
    versionCode: ver1 * 10000 + ver2 * 100 + ver3,
  };
}
