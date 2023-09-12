export interface ILaunch {
  flightNumber: number;
  launchDate: Date;
  mission: string;
  rocket: string;
  target: string;
  customers: string[];
  upcoming: boolean;
  success: boolean;
}
