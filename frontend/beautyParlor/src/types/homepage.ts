export interface HomepageStat {
  id: number;
  value: string;
  suffix: string;
  label: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface HomepageStatForm {
  value: string;
  suffix: string;
  label: string;
  displayOrder: string;
  isActive: boolean;
}