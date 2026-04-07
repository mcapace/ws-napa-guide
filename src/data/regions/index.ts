import { RegionMagazineData } from '../region-structured.types';
import { yountvilleData } from './yountville';
import { oakvilleData } from './oakville';
import { rutherfordData } from './rutherford';
import { calistogaData } from './calistoga';
import { pritchardHillData } from './pritchard-hill';

const regionMagazineDataMap: Record<string, RegionMagazineData> = {
  yountville: yountvilleData,
  oakville: oakvilleData,
  rutherford: rutherfordData,
  calistoga: calistogaData,
  'pritchard-hill': pritchardHillData,
};

export function getRegionMagazineData(slug: string): RegionMagazineData | undefined {
  return regionMagazineDataMap[slug];
}

export function hasRegionMagazineData(slug: string): boolean {
  return slug in regionMagazineDataMap;
}
