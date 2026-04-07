import { RegionMagazineData } from '../region-structured.types';
import { yountvilleData } from './yountville';

const regionMagazineDataMap: Record<string, RegionMagazineData> = {
  yountville: yountvilleData,
};

export function getRegionMagazineData(slug: string): RegionMagazineData | undefined {
  return regionMagazineDataMap[slug];
}

export function hasRegionMagazineData(slug: string): boolean {
  return slug in regionMagazineDataMap;
}
