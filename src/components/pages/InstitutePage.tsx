import React from 'react';
import type { InstituteData } from '@/types/api';

type Props = {
  locale: string;
  data: InstituteData;
};

const InstitutePage: React.FC<Props> = ({ locale, data }) => {
  return (
    <main>
      <h1>Інститут ({locale})</h1>

      <section>
        <h2>Інститути</h2>
        <ul>
          {data.instituts.map(inst => (
            <li key={inst._id}>{inst.translates[locale].title}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Відділи</h2>
        <ul>
          {data.departments.map(dep => (
            <li key={dep._id}>{dep.translates[locale].title}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Персонал</h2>
        <ul>
          {data.staffs.map(staff => (
            <li key={staff._id}>{`${staff.translates[locale].surname} ${staff.translates[locale].name}`}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Рішення</h2>
        <ul>
          {data.decisions.map(decision => (
            <li key={decision._id}>{decision.translates[locale].title}</li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default InstitutePage;