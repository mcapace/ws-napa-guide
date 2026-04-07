import { RegionMagazineData } from '../region-structured.types';
import { yountvilleData } from './yountville';
import { oakvilleData } from './oakville';
import { rutherfordData } from './rutherford';
import { calistogaData } from './calistoga';
import { pritchardHillData } from './pritchard-hill';
import { stHelenaData } from './st-helena';
import { downtownNapaData } from './downtown-napa';

const regionMagazineDataMap: Record<string, RegionMagazineData> = {
  yountville: yountvilleData,
  oakville: oakvilleData,
  rutherford: rutherfordData,
  calistoga: calistogaData,
  'pritchard-hill': pritchardHillData,
  'st-helena': stHelenaData,
  'downtown-napa': downtownNapaData,
};

export function getRegionMagazineData(slug: string): RegionMagazineData | undefined {
  return regionMagazineDataMap[slug];
}

export function hasRegionMagazineData(slug: string): boolean {
  return slug in regionMagazineDataMap;
}
