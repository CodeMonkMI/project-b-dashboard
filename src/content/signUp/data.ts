import { BLOOD_GROUPS } from './SignSchema';
export interface BloodListProps {
  id: string;
  value: BLOOD_GROUPS;
  label: String;
}
export const BLOOD_GROUP_LIST = Object.values(BLOOD_GROUPS).filter(
  (a) => typeof a == 'string'
);
