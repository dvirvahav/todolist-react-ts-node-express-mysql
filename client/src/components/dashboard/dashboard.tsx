import { FC } from 'react';
import { DashboardOptions } from './dashboardOptions';

export const Dashboard: FC = () => {
  return (
    <div className='dashboard loading-medium '>
      <DashboardOptions />

      <text className='headline-dashboard'>Dashboard</text>
    </div>
  );
};
