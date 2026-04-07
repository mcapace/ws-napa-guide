import { RegionMagazineData } from '../region-structured.types';
import { yountvilleData } from './yountville';
import { oakvilleData } from './oakville';
import { rutherfordData } from './rutherford';

const regionMagazineDataMap: Record<string, RegionMagazineData> = {
  yountville: yountvilleData,
  oakville: oakvilleData,
  rutherford: rutherfordData,
};

export function getRegionMagazineData(slug: string): RegionMagazineData | undefined {
  return regionMagazineDataMap[slug];
}

export function hasRegionMagazineData(slug: string): boolean {
  return slug in regionMagazineDataMap;
}
