import { FC } from 'react';
import { CARD_ICON_MAP } from './constants';
import { lusitana } from '@/app/ui/fonts';

interface ICardProps {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected';
}

export const Card: FC<ICardProps> = ({ title, value, type }) => {
  const Icon = CARD_ICON_MAP[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
};
